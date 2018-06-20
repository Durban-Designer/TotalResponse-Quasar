<template>
  <div class="main">
    <div class="accountBox">
      <div v-bind:class="accountState">
        <h1>Account Settings</h1>
        <div class="userName">Email Address: {{this.user.email}}</div>
        <div class="salutation">Salutation: {{this.user.salutation}}</div>
        <div class="firstName">First Name: {{this.user.firstName}}</div>
        <div class="middleName">M.I. : {{this.user.middleName}}</div>
        <div class="lastName">Last Name: {{this.user.lastName}}</div>
        <div class="phone">Phone Number: {{this.user.phoneNumber}}</div>
        <button class="edit" v-on:click="toggleEdit">Edit</button>
      </div>
      <div v-bind:class="paymentState">
        <h1>Payment Settings</h1>
        <div class="card">Card Number: {{this.user.cardNumber}}</div>
        <div class="expiration">Expiration: {{this.user.cardDate}}</div>
        <div class="cvv">CVV: {{this.user.cvv}}</div>
        <div class="addressOne">Address 1: {{this.user.addressOne}}</div>
        <div class="addressTwo">Address 2: {{this.user.addressTwo}}</div>
        <div class="city">City: {{this.user.city}}</div>
        <div class="state">State:{{this.user.state}}</div>
        <div class="zipCode">Zipcode:{{this.user.zipCode}}</div>
        <button class="editPayment" v-on:click="toggleEdit">Edit</button>
      </div>
      <div v-bind:class="medicalState">
        <h1>Medical Settings</h1>
        <div class="blood">Blood Type: {{this.user.bloodType}}</div>
        <div class="allergies">Allergies: {{this.user.allergies}}</div>
        <div class="medical">Medical Info: {{this.user.additionalInfo}}</div>
        <button class="editMedical" v-on:click="toggleEdit">Edit</button>
      </div>
      <div v-bind:class="accountEditState" >
        <h1>Please Enter Account Info</h1>
        <input type="text" class="userNameEdit" v-model="user.email" placeholder="Email Address" required/>
        <select class="salutationEdit" v-model="user.salutation">
          <option value="mr">Mr.</option>
          <option value="mrs">Mrs.</option>
          <option value="ms">Ms.</option>
        </select>
        <input type="text" class="firstNameEdit" v-model="user.firstName" placeholder="First Name" required/>
        <input type="text" class="middleNameEdit" v-model="user.middleName" placeholder="Mi" required/>
        <input type="text" class="lastNameEdit" v-model="user.lastName" placeholder="Last Name" required/><br/>
        <input type="number" class="phoneEdit" v-model="user.phoneNumber" placeholder="Phone Number" required/><br/>
        <button class="nextEdit" v-on:click="paymentTabClick">Next</button>
      </div>
      <div v-bind:class="paymentEditState" >
        <h1>Please Enter Payment Info</h1>
        <input type="number" class="cardEdit" v-model="user.cardNumber" placeholder="Credit Card Number" required/><br/>
        <input type="number" class="expirationEdit" v-model="user.cardDate" placeholder="Expiration Date" required/><br/>
        <input type="number" class="cvvEdit" v-model="user.cvv" placeholder="CVV" required/><br/>
        <input type="text" class="addressOneEdit" v-model="user.addressOne" placeholder="1st Address Line" required/><br/>
        <input type="text" class="addressTwoEdit" v-model="user.addressTwo" placeholder="2nd Address Line"/><br/>
        <input type="text" class="cityEdit" v-model="user.city" placeholder="City Name" required/>
        <select class="stateEdit" placeholder="state" v-model="user.state">
          <option value="AZ">AZ</option>
        </select>
        <input type="number" class="zipEdit" v-model="user.zipCode" placeholder="Zip Code" min="5" max="5" required/><br/>
        <select class="planEdit" v-model="user.subscription">
          <option value="individual">Individual</option>
          <option value="family">Family</option>
        </select><br>
        <h2 v-bind:class="planStateI"> $25 per year</h2>
        <h2 v-bind:class="planStateF"> $40 per year</h2>
        <button class="paymentNextEdit" v-on:click="medicalTabClick">Next</button>
      </div>
      <div v-bind:class="medicalEditState" >
        <h1>Please enter Medical Info</h1>
        <div class="bloodEdit">Blood Type:</div>
        <select class="bloodTypeEdit" v-model="user.bloodType">
          <option value="A-">A-</option>
          <option value="A+">A+</option>
          <option value="B-">B-</option>
          <option value="B+">B+</option>
          <option value="O-">O-</option>
          <option value="O+">O+</option>
          <option value="AB-">AB-</option>
          <option value="AB+">AB+</option>
        </select><br/>
        <textarea type="text" class="allergiesEdit" v-model="user.allergies" placeholder="Allergies"></textarea><br/>
        <textarea type="text" class="medicalEdit" v-model="user.additionalInfo" placeholder="Additional medical info"></textarea><br/>
        <button class="confirmButton" v-on:click="submit">Confirm Changes</button>
      </div>
      <div class="tabs">
        <div v-bind:class="accountTab" v-on:click="accountTabClick">Account<span v-bind:class="accountIcon"></span></div>
        <div v-bind:class="paymentTab" v-on:click="paymentTabClick">Payment<span v-bind:class="paymentIcon"></span></div>
        <div v-bind:class="medicalTab" v-on:click="medicalTabClick">Medical<span v-bind:class="medicalIcon"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Account',
  data: function () {
    return {
      user: {
        email: '',
        password: '',
        salutation: '',
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        addressOne: '',
        addressTwo: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        cardDate: '',
        cvv: '',
        subscription: '',
        bloodType: '',
        allergies: '',
        additionalInfo: ''
      },
      error: '',
      tabSelected: 0,
      edit: false
    }
  },
  props: ['userId', 'token', 'logged'],
  methods: {
    accountTabClick () {
      this.tabSelected = 0
    },
    paymentTabClick () {
      this.tabSelected = 1
    },
    medicalTabClick () {
      this.tabSelected = 2
    },
    toggleEdit () {
      this.edit = true
    },
    submit () {
      var vue = this
      axios.put('http://54.191.145.227:81/users/' + vue.userId, {
        email: this.user.email.toLowerCase(),
        password: this.user.password,
        salutation: this.user.salutation,
        firstName: this.user.firstName.toLowerCase(),
        middleName: this.user.middleName.toLowerCase(),
        lastName: this.user.lastName.toLowerCase(),
        phoneNumber: this.user.phoneNumber,
        addressOne: this.user.addressOne,
        addressTwo: this.user.addressTwo,
        city: this.user.city.toLowerCase(),
        state: this.user.state,
        zipCode: this.user.zipCode,
        cardNumber: this.user.cardNumber,
        cardDate: this.user.cardDate,
        cvv: this.user.cvv,
        subscription: this.user.subscription,
        bloodType: this.user.bloodType,
        allergies: this.user.allergies,
        additionalInfo: this.user.additionalInfo
      }, {headers: { 'Authorization': 'JWT ' + vue.token }})
        .then(function () {
          vue.edit = false
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    var vue = this
    if (this.logged === false) {
      this.$router.push('/login')
    } else {
      axios.get('http://54.191.145.227:81/users/' + vue.userId, {headers: { 'Authorization': 'JWT ' + vue.token }})
        .then(function (response) {
          vue.user = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  computed: {
    accountState: function () {
      return {
        hidden: this.tabSelected !== 0 || this.edit === true,
        accountInfo: this.tabSelected === 0 && this.edit === false
      }
    },
    paymentState: function () {
      return {
        hidden: this.tabSelected !== 1 || this.edit === true,
        paymentInfo: this.tabSelected === 1 && this.edit === false
      }
    },
    medicalState: function () {
      return {
        hidden: this.tabSelected !== 2 || this.edit === true,
        medicalInfo: this.tabSelected === 2 && this.edit === false
      }
    },
    accountEditState: function () {
      return {
        hidden: this.tabSelected !== 0 || this.edit === false,
        accountInfoEdit: this.tabSelected === 0 && this.edit === true
      }
    },
    paymentEditState: function () {
      return {
        hidden: this.tabSelected !== 1 || this.edit === false,
        paymentInfoEdit: this.tabSelected === 1 && this.edit === true
      }
    },
    medicalEditState: function () {
      return {
        hidden: this.tabSelected !== 2 || this.edit === false,
        medicalInfoEdit: this.tabSelected === 2 && this.edit === true
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
    accountTab: function () {
      return {
        hidden: this.tabSelected === 0,
        accountTab: this.tabSelected !== 0,
        leftTab: this.tabSelected !== 0
      }
    },
    paymentTab: function () {
      return {
        hidden: this.tabSelected === 1,
        paymentTab: this.tabSelected !== 1,
        leftTab: this.tabSelected === 0,
        rightTab: this.tabSelected === 2
      }
    },
    medicalTab: function () {
      return {
        hidden: this.tabSelected === 2,
        medicalTab: this.tabSelected !== 2,
        rightTab: this.tabSelected !== 2
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
    width: 100%;
    position:fixed;
    background-image: url('../assets/noise.png');
  }

  .hidden {
    display: none;
  }

  .accountBox {
    padding-top: 100px;
    text-align: center;
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: grid;
    position: fixed;
    background-image: url('../assets/noise.png');
  }

  .accountInfo {
    grid-row: 1;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: 20px repeat(8, 1fr) 20px;
    grid-template-rows: repeat(9, 40px);
  }

  .accountInfo h1 {
    color: #fff;
    grid-row: 1;
    grid-column-start: 2;
    grid-column-end: 10;
    font-size: 2em;
    font-weight: 400;
  }

  .accountInfo div {
    color: white;
    text-align: left;
    background: transparent;
    line-height: 30px;
    padding-left: 3%;
    height: 30px;
    border: none;
    border: 1px solid #fff;
  }

  .salutation {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 3;
  }

  .firstName {
    grid-column-start: 5;
    grid-column-end: 10;
    grid-row: 3;
  }

  .middleName {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 4;
  }

  .lastName {
    grid-column-start: 4;
    grid-column-end: 10;
    grid-row: 4;
  }

  .userName {
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row: 5;
  }

  .phone {
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row: 6;
  }

  .edit {
    grid-column-start: 9;
    grid-column-end: 10;
    grid-row: 7;
    font-size: 1.5em;
    height: 30px;
    text-align: center;
  }

  .paymentInfo {
    grid-row: 1;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: 20px repeat(6, 1fr) 20px;
    grid-template-rows: repeat(9, 40px);
  }

  .paymentInfo h1 {
    font-size: 2em;
    font-weight: 400;
    color: #fff;
    grid-row: 1;
    grid-column-start: 2;
    grid-column-end: 8;
  }

  .paymentInfo div {
    color: white;
    text-align: left;
    background: transparent;
    line-height: 30px;
    padding-left: 3%;
    height: 30px;
    border: none;
    border: 1px solid #fff;
  }

  .card {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 3;
    font-size: 1em;
  }

  .expiration {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 4;
    font-size: 1em;
  }

  .cvv {
    grid-column-start: 6;
    grid-column-end: 8;
    grid-row: 4;
    font-size: 1em;
  }

  .addressOne {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 5;
    font-size: 1em;
  }

  .addressTwo {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 6;
    font-size: 1em;
  }

  .city {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 7;
    font-size: 1em;
  }

  .state {
    grid-column-start: 6;
    grid-column-end: 8;
    grid-row: 7;
    font-size: 1em;
  }

  .zipCode {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 8;
    font-size: 1em;
  }

  .editPayment {
    grid-column-start: 7;
    grid-column-end: 8;
    grid-row: 8;
    height: 30px;
    font-size: 1.5em;
  }

  .medicalInfo {
    grid-row: 1;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: 20px repeat(6, 1fr) 20px;
    grid-template-rows: repeat(9, 40px);
  }

  .medicalInfo h1 {
    font-weight: 400;
    color: #fff;
    grid-row: 1;
    grid-column-start: 2;
    grid-column-end: 8;
    font-size: 2em;
  }

  .medicalInfo div{
    color: white;
    text-align: left;
    background: transparent;
    line-height: 30px;
    padding-left: 3%;
    border: none;
    border: 1px solid #fff;
  }

  .blood {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 3;
    font-size: 1em;
  }

  .allergies {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 4;
    font-size: 1em;
  }

  .medical {
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row-start: 5;
    grid-row-end: 7;
    font-size: 1em;
    height: 100px;
  }

  .editMedical {
    grid-column-start: 7;
    grid-column-end: 8;
    grid-row: 7;
    height: 30px;
    margin-top: 20px;
    font-size: 1.5em;
  }

  .accountInfoEdit {
    grid-row: 1;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(9, 40px);
  }

  .accountInfoEdit input {
    color: grey;
    border: none !important;
    border: 1px solid @textColor !important;
    background: white;
    margin-top: 36px;
    height: 30px;
  }

  .accountInfoEdit h1 {
    color: #fff;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 11;
    font-size: 2em;
    font-weight: 400;
  }

  .userNameEdit {
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row: 5;
  }

  .salutationEdit {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 3;
    color: grey;
    background: white;
    margin-top: 36px;
    border: 1px solid white;
    height: 30px;
  }

  .firstNameEdit {
    grid-column-start: 4;
    grid-column-end: 8;
    grid-row: 3;
  }

  .middleNameEdit {
    grid-column-start: 8;
    grid-column-end: 10;
    grid-row: 3;
  }

  .lastNameEdit {
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row: 4;
  }

  .phoneEdit {
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row: 6;
  }

  .nextEdit {
    grid-column-start: 8;
    grid-column-end: 10;
    grid-row: 7;
    margin-top: 20px;
    font-size: 1.5em;
  }

  .paymentInfoEdit {
    grid-row: 1;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(9, 40px);
  }

  .paymentInfoEdit input {
    color: grey;
    border: none !important;
    border: 1px solid @textColor !important;
    background: white;
    margin-top: 36px;
    height: 30px;
  }

  .paymentInfoEdit h1 {
    color: #fff;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 11;
    font-size: 2em;
    font-weight: 400;
  }

  .cardEdit {
    grid-column-start: 2;
    grid-column-end: 6;
    grid-row: 3;
  }

  .expirationEdit {
    grid-column-start: 6;
    grid-column-end: 8;
    grid-row: 3;
  }

  .cvvEdit {
    grid-row: 3;
    grid-column-start: 8;
    grid-column-end: 10;
  }

  .addressOneEdit {
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row: 4;
  }

  .addressTwoEdit {
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row: 5;
  }

  .cityEdit {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 6;
  }

  .stateEdit {
    grid-column-start: 5;
    grid-column-end: 7;
    grid-row: 6;
    background: white;
    height: 30px;
    margin-top: 36px;
    border: 1px solid @textColor;
    color: @textColor;
  }

  .zipEdit {
    grid-column-start: 7;
    grid-column-end: 10;
    grid-row: 6;
  }

  .planEdit {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 7;
    height: 30px;
    margin-top: 34px;
    background: white;
    border: 1px solid white;
    color: grey;
  }

  .paymentInfoEdit h2 {
    grid-column-start: 7;
    grid-column-end: 10;
    grid-row: 7;
    margin-top: 40px;
    height: 30px;
    color: white;
    font-size: 1.2em;
  }

  .paymentNextEdit {
    grid-column-start: 8;
    grid-column-end: 10;
    grid-row: 9;
    font-size: 1.5em;
  }

  .medicalInfoEdit {
    grid-row: 1;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(9, 40px);
  }

  .medicalInfoEdit h1 {
    color: #fff;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 11;
    font-size: 2em;
    font-weight: 400;
  }

  .bloodEdit {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 3;
    font-size: 1em;
    color: white;
    line-height: 30px;
  }

  .medicalInfoEdit textarea {
    color: grey;
    background: white;
  }

  ::placeholder {
    color: @textColor;
  }

  .bloodTypeEdit {
    grid-column-start: 5;
    grid-column-end: 7;
    grid-row: 3;
    color: grey;
    background: white;
    height: 30px;
    border: 1px solid white;
  }

  .allergiesEdit {
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row-start: 4;
    grid-row-end: 6;
  }

  .medicalEdit {
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row-start: 6;
    grid-row-end: 8;
  }

  .confirmButton {
    grid-column-start: 4;
    grid-column-end: 10;
    grid-row: 8;
    font-size: 1.5em;
    text-align: right;
  }

  .tabs {
    text-align: center;
    width: 100%;
    font-size: 2em;
    display: grid;
    height: 80px;
    grid-template-columns: 1fr 1fr;
  }

  .leftTab {
      grid-column: 1;
  }

  .rightTab {
      grid-column: 2;
  }

  .accountTab {
    background: transparent;
    color: white;
    width: 100%;
    text-align: center;
  }

  .paymentTab {
    background: transparent;
    color: white;
    width: 100%;
  }
  .medicalTab {
    background: transparent;
    color: white;
    width: 100%;
  }
  .termsLink {
    color: #4c32cf;
    text-decoration: underline;
  }

  .termsView {
    grid-column: 2;
    grid-row: 3;
    height: 1400px;
  }

  button {
    color: #fff;
    font-size: 1em;
    text-decoration: none;
    background: transparent;
    border: none;
}

button:active {
  text-decoration: none;
}

</style>
