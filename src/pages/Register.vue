<template>
  <div class="main">
    <div class="registerBox">
      <div v-bind:class="accountState">
        <h1>Account Info</h1>
        <select class="salutation" v-model="user.salutation">
          <option value="mr">Mr.</option>
          <option value="mrs">Mrs.</option>
          <option value="ms">Ms.</option>
        </select>
        <input type="text" class="firstName" v-model="user.firstName" placeholder="First Name" required/>
        <input type="text" class="middleName" v-model="user.middleName" placeholder="Mi" required/>
        <input type="text" class="lastName" v-model="user.lastName" placeholder="Last Name" required/><br/>
        <input type="text" class="userName" v-model="user.userName" placeholder="Email Address" required/>
        <input type="password" class="password" v-model="user.password" placeholder="Password" required/>
        <input type="number" class="phone" v-model="user.phone" placeholder="Phone Number" required/><br/>
        <button class="next" v-on:click="paymentTabClick">Next</button>
      </div>
      <div v-bind:class="paymentState" >
        <h1>Payment Info</h1>
        <input type="number" class="card" v-model="user.card" placeholder="Credit Card #" required/><br/>
        <input type="number" class="expiration" v-model="user.expiration" placeholder="Expiration" required/><br/>
        <input type="number" class="cvv" v-model="user.cvv" placeholder="CVV" required/><br/>
        <input type="text" class="addressOne" v-model="user.addressOne" placeholder="1st Address Line" required/><br/>
        <input type="text" class="addressTwo" v-model="user.addressTwo" placeholder="2nd Address Line"/><br/>
        <input type="text" class="city" v-model="user.city" placeholder="City Name" required/>
        <select class="state" v-model="user.state">
          <option value="AZ">Arizona</option>
        </select>
        <input type="number" class="zip" v-model="user.zipCode" placeholder="Zip Code" min="5" max="5" required/><br/>
        <select class="plan" v-model="user.subscription">
          <option value="individual">Individual</option>
          <option value="family">Family</option>
        </select><br>
        <h2 v-bind:class="planStateI"> $25 per year</h2>
        <h2 v-bind:class="planStateF"> $40 per year</h2>
        <button class="nextPayment" v-on:click="medicalTabClick">Next</button>
      </div>
      <div v-bind:class="medicalState" >
        <h1>Medical Info</h1>
        <div class="blood">Blood Type:</div>
        <select class="bloodType" v-model="user.blood">
          <option value="A-">A-</option>
          <option value="A+">A+</option>
          <option value="B-">B-</option>
          <option value="B+">B+</option>
          <option value="O-">O-</option>
          <option value="O+">O+</option>
          <option value="AB-">AB-</option>
          <option value="AB+">AB+</option>
        </select><br/>
        <textarea rows="3" cols="50" class="allergies" v-model="user.allergies" placeholder="Allergies"></textarea><br/>
        <textarea rows="3" cols="50" class="medical" v-model="user.medical" placeholder="Additional medical info"></textarea><br/>
        <div class="conditions">
          <div class="conditionsBox" v-on:click="conditions"></div>
          <div v-bind:class="conditionsBox" v-on:click="conditionsUncheck" v-lazy:background-image='conditionsIcon'></div>
          <h3>I agree to the Total Response <div v-on:click="toggleTerms" class="termsLink">Terms and Conditions</div></h3>
        </div><br/>
        <button v-bind:class="registerConditions" v-on:click="submit">Register</button>
        <div v-bind:class="conditionsRequired">Please Accept the Terms</div>
      </div>
      <div v-bind:class="termsVisibility">
        <terms v-on:back="untoggleTerms"></terms>
      </div>
      <div class="tabs">
        <div v-bind:class="accountTab" v-on:click="accountTabClick">Account</div>
          <div v-bind:class="accountIcon"></div>
        <div v-bind:class="paymentTab" v-on:click="paymentTabClick">Payment</div>
          <div v-bind:class="paymentIcon"></div>
        <div v-bind:class="medicalTab" v-on:click="medicalTabClick">Medical</div>
          <div v-bind:class="medicalIcon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Terms from './elements/Terms'
import axios from 'axios'
export default {
  name: 'register',
  components: {
    'terms': Terms
  },
  data: function () {
    return {
      user: {
        userName: '',
        password: '',
        salutation: 'mr',
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        addressOne: '',
        addressTwo: '',
        city: '',
        state: 'AZ',
        zipCode: '',
        card: '',
        expiration: '',
        cvv: '',
        subscription: 'individual',
        blood: 'A+',
        allergies: '',
        medical: '',
        checkbox: false
      },
      conditionsIcon: {
        src: '../static/lazyImages/checkbox.webp',
        error: '../static/lazyImages/checkbox.png'
      },
      error: false,
      tabSelected: 0,
      checked: 0,
      terms: false
    }
  },
  computed: {
    accountState: function () {
      return {
        hidden: this.tabSelected !== 0,
        accountInfo: this.tabSelected === 0
      }
    },
    paymentState: function () {
      return {
        hidden: this.tabSelected !== 1,
        paymentInfo: this.tabSelected === 1
      }
    },
    medicalState: function () {
      return {
        hidden: this.tabSelected !== 2,
        medicalInfo: this.tabSelected === 2
      }
    },
    accountTab: function () {
      return {
        hidden: this.tabSelected === 0,
        accountTab: this.tabSelected !== 0
      }
    },
    paymentTab: function () {
      return {
        hidden: this.tabSelected === 1,
        paymentTab: this.tabSelected !== 1
      }
    },
    medicalTab: function () {
      return {
        hidden: this.tabSelected === 2,
        medicalTab: this.tabSelected !== 2
      }
    },
    accountIcon: function () {
      return {
        hidden: this.tabSelected === 0,
        accountIcon: this.tabSelected !== 0,
        lineRight: this.tabSelected === 1 || this.tabSelected === 2
      }
    },
    paymentIcon: function () {
      return {
        hidden: this.tabSelected === 1,
        paymentIcon: this.tabSelected !== 1,
        lineRight: this.tabSelected === 0
      }
    },
    medicalIcon: function () {
      return {
        hidden: this.tabSelected === 2,
        medicalIcon: this.tabSelected !== 2
      }
    },
    planStateI: function () {
      return {
        hidden: this.user.subscription !== 'individual'
      }
    },
    planStateF: function () {
      return {
        hidden: this.user.subscription !== 'family'
      }
    },
    conditionsBox: function () {
      return {
        hidden: this.user.checkbox === false,
        conditionsBoxChecked: this.user.checkbox !== false
      }
    },
    conditionsRequired: function () {
      return {
        hidden: this.user.checkbox === true,
        conditionsRequiredButton: this.user.checkbox !== true
      }
    },
    termsVisibility: function () {
      return {
        hidden: this.terms === false,
        termsView: this.terms === true
      }
    },
    registerConditions: function () {
      return {
        hidden: this.user.checkbox !== true || this.user === null,
        registerButton: this.user.checkbox === true
      }
    }
  },
  methods: {
    conditions () {
      this.user.checkbox = true
    },
    conditionsUncheck () {
      this.user.checkbox = false
    },
    accountTabClick () {
      this.tabSelected = 0
    },
    paymentTabClick () {
      this.tabSelected = 1
    },
    medicalTabClick () {
      this.tabSelected = 2
    },
    submit () {
      var vue = this
      axios.post('http://54.191.145.227:81/users', {
        email: this.user.userName.toLowerCase(),
        password: this.user.password,
        salutation: this.user.salutation,
        firstName: this.user.firstName.toLowerCase(),
        middleName: this.user.middleName.toLowerCase(),
        lastName: this.user.lastName.toLowerCase(),
        phoneNumber: this.user.phone,
        addressOne: this.user.addressOne,
        addressTwo: this.user.addressTwo,
        city: this.user.city.toLowerCase(),
        state: this.user.state,
        zipCode: this.user.zipCode,
        cardNumber: this.user.card,
        cardDate: this.user.expiration,
        cvv: this.user.cvv,
        subscription: this.user.subscription,
        bloodType: this.user.blood,
        allergies: this.user.allergies,
        additionalInfo: this.user.medical
      })
        .then(response => {
          if (response.status === 201) {
            this.$emit('register', response.data)
          }
        })
        .catch(function () {
          vue.tabSelected = 3
          vue.error = true
        })
    },
    toggleTerms () {
      this.terms = true
      this.tabSelected = 6
    },
    untoggleTerms () {
      this.terms = false
      this.tabSelected = 2
    }
  }
}
</script>

<style scoped lang="less">
  @backgroundColor: #355477;
  @secondaryColor: #1a222e;
  @paymentColor: #519d10;
  @medicalColor: #ee1f34;
  @darkTR: #1a222e;
  @lightTR: #3f62ad;
  @textColor: #9fb0d6;
  @baseFontSize: 1em;
  @boldText: "Candara";
  @sideText: "AdventPro";
  @bodyText: "LiberationSans";

  .main {
    margin-top: 20px;
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 0 510px 10px;
    overflow: hidden;
  }

  .hidden {
    display: none;
  }

  ::-webkit-input-placeholder {
    color: @textColor;
  }

  :-moz-placeholder {
    color: @textColor;
    opacity: 1;
  }

  ::-moz-placeholder {
    color: @textColor;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: @textColor;
  }

  .registerBox {
    grid-column: 1;
    grid-row: 2;
    text-align: center;
    box-shadow: 2px 6px #d1d1d1;
    border-radius: 24px;
    overflow: hidden;
    background: @backgroundColor;
    background-image: -webkit-linear-gradient(top, @lightTR, @darkTR);
    background-image: -moz-linear-gradient(top, @lightTR, @darkTR);
    background-image: -ms-linear-gradient(top, @lightTR, @darkTR);
    background-image: -o-linear-gradient(top, @lightTR, @darkTR);
    background-image: linear-gradient(to bottom, @lightTR, @darkTR);
  }

  .accountInfo {
    grid-column: 2;
    grid-row: 3;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: 20px repeat(6, 1fr) 20px;
    grid-template-rows: 10px 40px repeat(5, 60px) 20px 60px 10px;
  }

  .accountInfo input {
    color: @textColor;
    border: none !important;
    border-bottom: 1px solid #fff !important;
    background: transparent;
    margin-top: 36px;
  }

  .accountInfo h1 {
    font-family: @boldText;
    color: #fff;
    text-shadow: 2px 1px 2px #515151;
    -webkit-background-clip: text;
       -moz-background-clip: text;
            background-clip: text;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 9;
    font-size: @baseFontSize + 1.2em;
  }

  .salutation {
    font-family: @bodyText;
    color: @textColor;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row: 3;
    font-size: @baseFontSize;
    background: transparent;
    margin-top: 30px;
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .firstName {
    font-family: @bodyText;
    grid-column-start: 3;
    grid-column-end: 8;
    grid-row: 3;
    font-size: @baseFontSize ;
  }

  .middleName {
    font-family: @bodyText;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row: 4;
    font-size: @baseFontSize ;
  }

  .lastName {
    font-family: @bodyText;
    grid-column-start: 3;
    grid-column-end: 8;
    grid-row: 4;
    font-size: @baseFontSize;
  }

  .userName {
    font-family: @bodyText;
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 5;
    font-size: @baseFontSize;
  }

  .password {
    font-family: @bodyText;
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 6;
    font-size: @baseFontSize ;
  }

  .phone {
    font-family: @bodyText;
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 7;
    font-size: @baseFontSize;
  }

  .next {
    font-family: @boldText;
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 9;
    font-size: @baseFontSize + 1em;
  }

  .paymentInfo {
    grid-column: 2;
    grid-row: 3;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: 20px repeat(6, 1fr) 20px;
    grid-template-rows: 10px 40px repeat(5, 60px) 20px 60px 10px;
  }

  .paymentInfo input {
    color: @textColor;
    border: none !important;
    border-bottom: 1px solid #fff !important;
    background: transparent;
    margin-top: 36px;
  }

  .paymentInfo h1 {
    font-family: @boldText;
    color: #fff;
    text-shadow: 2px 1px 2px #515151;
    -webkit-background-clip: text;
       -moz-background-clip: text;
            background-clip: text;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 9;
    font-size: @baseFontSize + 1em;
  }

  .card {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 3;
    font-size: @baseFontSize;
    width: 100%;
    background: transparent;
    margin-top: 30px;
    border: none;
  }

  .expiration {
    grid-column-start: 5;
    grid-column-end: 7;
    grid-row: 3;
    font-size: @baseFontSize;
    width: 100%;
    background: transparent;
    margin-top: 30px;
    border: none;
  }

  .cvv {
    grid-column-start: 7;
    grid-row: 3;
    font-size: @baseFontSize;
    width: 100%;
    background: transparent;
    margin-top: 36px;
    margin-left: 6px;
    border: none;
  }

  .addressOne {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 4;
    font-size: @baseFontSize;
    width: 100%;
  }

  .addressTwo {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 5;
    font-size: @baseFontSize;
    width: 100%;
  }

  .city {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 6;
    font-size: @baseFontSize;
    width: 100%;
  }

  .state {
    grid-column-start: 4;
    grid-column-end: 6;
    grid-row: 6;
    color: @textColor;
    font-size: @baseFontSize;
    width: 100%;
    background: transparent;
    margin-top: 30px;
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .zip {
    grid-column-start: 6;
    grid-column-end: 8;
    grid-row: 6;
    font-size: @baseFontSize;
    width: 100%;
    margin-left: 3px;
    background: transparent;
    margin-top: 30px;
    border: none;
  }

  .plan {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 7;
    color: @textColor;
    font-size: @baseFontSize;
    width: 100%;
    background: transparent;
    margin-top: 30px;
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .paymentInfo h2 {
    grid-column-start: 4;
    grid-column-end: 6;
    grid-row-start: 7;
    grid-row-end: 9;
    font-family: @sideText;
    background: @backgroundColor;
    border-radius: 10px;
    border-color: #fff;
    border: 2px;
    padding-top: 12px;
    margin-left: 12px;
    margin-top: 18px;
    border-style: ridge;
    color: #fff;
    font-size: @baseFontSize;
    width: 100%;
  }

  .nextPayment {
    font-family: @boldText;
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 9;
    //height: 100px;
    font-size: @baseFontSize + 1em;
  }

  .medicalInfo {
    grid-column: 2;
    grid-row: 3;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: 20px repeat(6, 1fr) 20px;
    grid-template-rows: 10px 30px 10px repeat(7, 40px) 20px 60px 12px;
  }

  .medicalInfo textarea {
    color: @textColor;
    border: 1px solid #fff !important;
    border-radius: 10px !important;
    font-family: @bodyText;
    background: transparent;
    margin-top: 50px;
  }

  .medicalInfo h1 {
    font-family: @boldText;
    color: #fff;
    text-shadow: 2px 1px 2px #515151;
    -webkit-background-clip: text;
       -moz-background-clip: text;
            background-clip: text;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 9;
    font-size: @baseFontSize + 1em;
  }

  .blood {
    text-align: left;
    font-family: @bodyText;
    color: @textColor;
    grid-row: 4;
    grid-column-start: 2;
    grid-column-end: 5;
    font-size: @baseFontSize;
    margin-top: 16px;
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .bloodType {
    grid-column: 4;
    grid-row: 4;
    font-size: @baseFontSize;
    color: @textColor;
    background: transparent;
    margin-top: 10px;
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .allergies {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row-start: 4;
    grid-row-end: 7;
    font-size: @baseFontSize;
  }

  .medical {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row-start: 6;
    grid-row-end: 9;
    font-size: @baseFontSize;
  }

  .conditions {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 8;
    margin-top: 16px;
    display: grid;
    grid-template-columns: .1fr 1fr 2fr 1fr .1fr;
    text-align: center;
    height: 140px;
  }

  .conditionsBox {
    grid-row: 2;
    grid-column-start: 2;
    grid-column-end: 3;
    background-color: @textColor;
    width: 50px;
    height: 50px;
    margin-top: 40px;
    margin-left: 20px;
  }

  .conditionsBoxChecked {
    grid-row: 2;
    grid-column-start: 2;
    grid-column-end: 3;
    width: 50px;
    height: 50px;
    margin-top: 40px;
    margin-left: 20px;
  }

  .conditions h3 {
    font-family: @bodyText;
    color: @textColor;
    padding-top: 28px;
    font-size: @baseFontSize;
    grid-row: 2;
    grid-column-start: 3;
    grid-column-end: 5;
  }

  .registerButton {
    font-family: @boldText;
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 12;
    font-size: @baseFontSize + .5em;
    padding-top: 14px;
  }

  .conditionsRequiredButton {
    font-family: @boldText;
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 12;
    background-color: #777;
    border-radius: 10px;
    color: @textColor;
    font-size: @baseFontSize + .5em;
    padding-top: 14px;
  }

  .tabs {
    font-family: @sideText;
    margin-top: 20px;
    grid-column: 1;
    grid-row: 3;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 1fr;
    text-align: left;
    text-shadow: 2px 3px #000;
    width: 100%;
    line-height: 76px;
    font-size: 2.2em;
  }

  .accountTab {
    background: transparent;
    color: #6f89c2;
  }

  .accountIcon {
    background-image: url("../assets/Person.svg");
    background-repeat: no-repeat;
  }

  .paymentTab {
    background: transparent;
    color: #7db64c;
  }

  .paymentIcon {
    background-image: url("../assets/$$$.svg");
    background-repeat: no-repeat;

  }

  .medicalTab {
    background: transparent;
    color: #f25767;
  }

  .medicalIcon {
    background-image: url("../assets/Stethescope.svg");
    background-repeat: no-repeat;
  }

  .termsLink {
    color: @medicalColor;
    text-decoration: underline;
  }

  .termsView {
    grid-column: 2;
    grid-row: 3;
    height: 1400px;
  }

  button {
    background: #0c2069;
    background-image: -webkit-linear-gradient(top, @darkTR, @lightTR);
    background-image: -moz-linear-gradient(top, @darkTR, @lightTR);
    background-image: -ms-linear-gradient(top, @darkTR, @lightTR);
    background-image: -o-linear-gradient(top, @darkTR, @lightTR);
    background-image: linear-gradient(to bottom, @darkTR, @lightTR);
    -webkit-border-radius: 10;
    -moz-border-radius: 10;
    border-radius: 10px;
    font-family: "Candara";
    font-weight: bold;
    color: #ffffff;
    font-size: 32px;
    padding: 10px 30px 10px 30px;
    border: 2px solid #9fb0d6;
    text-decoration: none;
}

button:hover {
  background: #3f62ad;
  text-decoration: none;
}

</style>
