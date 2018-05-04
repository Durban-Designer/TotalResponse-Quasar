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
        <button class="nextAccount" v-on:click="paymentTabClick">Next</button>
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
        <h2 v-bind:class="planStateI">$25 per year</h2>
        <h2 v-bind:class="planStateF">$40 per year</h2>
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
        <div v-bind:class="paymentTab" v-on:click="paymentTabClick">Payment</div>
        <div v-bind:class="medicalTab" v-on:click="medicalTabClick">Medical</div>
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
    background-image: url('../assets/TRlog.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 0 510px 10px;
    overflow: hidden;
    position: fixed;
  }

  .hidden {
    display: none;
  }

  ::placeholder {
    color: #222;
  }

  .registerBox {
    margin-top: 100px;
    grid-column: 1;
    grid-row: 2;
    text-align: center;
    border-radius: 5px;
    overflow: hidden;
  }
  .nextAccount {
    grid-row: 8;
    grid-column-start: 6;
    grid-column-end: 8;
    font-size: 1.5em;
    z-index: 10;
    margin-top: 10%;
    text-align: right;
  }
  .accountInfo {
    grid-column: 2;
    grid-row: 3;
    display: grid;
    grid-gap: 2%;
    grid-template-columns: 20px repeat(6, 1fr) 20px;
    grid-template-rows: 10px 40px repeat(7, 60px);
  }

  .accountInfo input {
    padding-left: 3%;
    color: white;
    height: 30px;
    border: 1px solid #fff !important;
    background: transparent;
    margin-top: 36px;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .accountInfo h1 {
    color: #fff;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 9;
    font-size: 2em;
    font-weight: 400;
  }

  .salutation {
    color: white;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row: 3;
    margin-top: 35px;
    font-size: @baseFontSize;
    background: transparent;
    height: 30px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .firstName {
    grid-column-start: 3;
    grid-column-end: 8;
    grid-row: 3;
    font-size: @baseFontSize ;
  }

  .middleName {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row: 4;
    font-size: @baseFontSize ;
  }

  .lastName {
    grid-column-start: 3;
    grid-column-end: 8;
    grid-row: 4;
    font-size: @baseFontSize;
  }

  .userName {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 5;
    font-size: @baseFontSize;
  }

  .password {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 6;
    font-size: @baseFontSize ;
  }

  .phone {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 7;
    font-size: @baseFontSize;
  }

  .paymentInfo {
    grid-column: 2;
    grid-row: 3;
    display: grid;
    grid-gap: 2%;
    grid-template-columns: 20px repeat(6, 1fr) 20px;
    grid-template-rows: 10px 40px repeat(5, 60px) 20px 60px 10px;
  }

  .paymentInfo input {
    padding-left: 3%;
    color: white;
    height: 30px;
    border: 1px solid #fff !important;
    background: transparent;
    margin-top: 36px;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .paymentInfo h1 {
    color: #fff;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 9;
    font-size: 2em;
    font-weight: 400;
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
    margin-top: 35px;
    font-size: @baseFontSize;
    background: transparent;
    height: 30px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.3);
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
    margin-top: 35px;
    font-size: @baseFontSize;
    background: transparent;
    height: 30px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .paymentInfo h2 {
    grid-column-start: 4;
    grid-column-end: 6;
    grid-row-start: 7;
    grid-row-end: 9;
    background: transparent;
    border: none;
    padding-top: 12px;
    margin-left: 12px;
    margin-top: 23px;
    color: #fff;
    font-size: 1.3em;
    width: 100%;
    text-decoration: underline;
  }

  .nextPayment {
    grid-row: 8;
    grid-column-start: 6;
    grid-column-end: 8;
    font-size: 1.5em;
    z-index: 10;
    margin-top: 10%;
    text-align: right;
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
    background: transparent;
    margin-top: 50px;
    border: 1px solid #fff !important;
    background: transparent;
    margin-top: 36px;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 2%;
  }

  .medicalInfo h1 {
    color: #fff;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 9;
    font-size: 2em;
    font-weight: 400;
  }

  .blood {
    height: 30px;
    text-align: left;
    color: white;
    grid-row: 4;
    grid-column-start: 2;
    grid-column-end: 4;
    font-size: 1.3em;
    margin-bottom: 16px;
    padding-left: 3%;
    color: white;
  }

  .bloodType {
    width: 60px;
    height: 30px;
    grid-column: 4;
    grid-row: 4;
    font-size: @baseFontSize;
    background: transparent;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.3);
    padding-left: 10%;
  }

  .allergies {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row-start: 4;
    grid-row-end: 7;
    font-size: @baseFontSize;
    margin-bottom: 5%;
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
    grid-template-columns: 40px 1fr ;
    text-align: center;
    height: 100px;
  }

  .conditionsBox {
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 2;
    border: 2px white solid;
    width: 30px;
    height: 30px;
    margin-top: 80px;
  }

  .conditionsBoxChecked {
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 2;
    width: 50px;
    height: 50px;
    margin-top: 80px;
  }

  .conditions h3 {
    color: white;
    padding-top: 28px;
    font-size: 1.2em;
    grid-row: 1;
    grid-column-start: 2;
    grid-column-end: 3;
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
    z-index: 10;
    position: fixed;
    margin-top: 20px;
    grid-column: 1;
    grid-row: 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    width: 100%;
    font-size: 2.2em;
  }

  .accountTab {
    text-align: center;
    background: transparent;
    color: white;
  }
  .paymentTab {
    text-align: center;
    background: transparent;
    color: white;

  }

  .medicalTab {
    text-align: center;
    background: transparent;
    color: white;
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
    border: none;
    background: transparent;
    color: #fff;
    font-size: 1.5em;
    text-decoration: none;
    height: 40px;
  }
  button:hover {
    text-decoration: none;
  }
  button:active {
    font-size: 1.2em;
  }

</style>
