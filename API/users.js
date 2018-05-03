var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require('bcryptjs');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
jwtOptions.secretOrKey = 'LokisBreath-420';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findOne({"_id": jwt_payload.id}, function(err, user) {
    if (err) {
          return next(err, false);
      }
      if (user) {
          return next(null, user);
      } else {
          return next(null, false);
      }
  });
});

app.use(passport.initialize());
passport.use(strategy);
app.use(bodyParser.json());

router.post("/login", (req, res) => {
  User.findOne({"email": req.body.email}, function (err, users) {
    if (err) throw err;
    if (users !== null) {
      bcrypt.compare(req.body.password, users.password, function(err, isMatch) {
        if (err) return (err);
        if (isMatch === true) {
          var payload = {"id": users.id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({userId: users.id, token: token});
        } else {
          res.status(401).send(false);
        }
      })
    } else {
      res.status(401).send(false);
    }
  })
})

router.post("/", (req,res) => {
  var newUser = new User({
  email: req.body.email,
  password: req.body.password,
  salutation: req.body.salutation,
  firstName: req.body.firstName,
  middleName: req.body.middleName,
  lastName: req.body.lastName,
  phoneNumber: req.body.phoneNumber,
  addressOne: req.body.addressOne,
  addressTwo: req.body.addressTwo,
  city: req.body.city,
  state: req.body.state,
  zipCode: req.body.zipCode,
  cardNumber: req.body.cardNumber,
  cardDate: req.body.cardDate,
  cvv: req.body.cvv,
  subscription: req.body.subscription,
  bloodType: req.body.bloodType,
  allergies: req.body.allergies,
  additionalInfo: req.body.additionalInfo
  })

  newUser.save((err, result) => {
    if(err) {
      res.send(err);
    } else {
      User.findOne({"email": req.body.email}, function (err, users) {
        var payload = {"id": users.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(201).json({userId: payload.id, token: token});
      })
    }
  })
})

router.get("/:id", passport.authenticate('jwt', { session: false }),(req, res) => {
  var userid = new mongodb.ObjectID(req.params["id"]);
  User.findOne({"_id": userid},function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  })
})

router.put("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  var userid = new mongodb.ObjectID(req.params["id"]);
  User.find({"_id": userid},function (err, user) {
    if (err) {
        res.status(500).send(err);
    } else {
        var user = user[0];
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.salutation = req.body.salutation || user.salutation;
        user.firstName = req.body.firstName || user.firstName;
        user.middleName = req.body.middleName || user.middleName;
        user.lastName = req.body.lastName || user.lastName;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.addressOne = req.body.addressOne || user.addressOne;
        user.addressTwo = req.body.addressTwo || user.addressTwo;
        user.city = req.body.city || user.city;
        user.state = req.body.state || user.state;
        user.zipCode = req.body.zipCode || user.zipCode;
        user.cardNumber = req.body.cardNumber || user.cardNumber;
        user.cardDate = req.body.cardDate || user.cardDate;
        user.cvv = req.body.cvv || user.cvv;
        user.subscription = req.body.subscription || user.subscription;
        user.bloodType = req.body.bloodType || user.bloodType;
        user.allergies = req.body.allergies || user.allergies;
        user.additionalInfo = req.body.additionalInfo || user.additionalInfo;

        user.save(function (err, user) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(user);
        });
      }
  });
})

router.delete("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  var userid = req.body._id;
  User.find({_id: userid}).remove().then(() => {
    res.send("success");
  })
})

module.exports = router;
