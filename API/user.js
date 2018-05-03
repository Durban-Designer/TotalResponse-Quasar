var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salutation: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  addressOne: {
    type: String,
    required: true
  },
  addressTwo: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  cardNumber: {
    type: Number,
    required: true
  },
  cardDate: {
    type: Number,
    required: true
  },
  cvv: {
    type: Number,
    required: true
  },
  subscription: {
    type: String,
    required: true
  },
  bloodType: {
    type: String,
    required: true
  },
  allergies: {
    type: String,
    required: false
  },
  additionalInfo: {
    type: String,
    required: false
  }
})

UserSchema.pre('save', function(next) {
    var users = this;

    // only hash the password if it has been modified (or is new)
    if (!users.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(users.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            users.password = hash;
            next();
        });
    });
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
