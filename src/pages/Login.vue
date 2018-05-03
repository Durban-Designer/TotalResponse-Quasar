<template>
  <div class="main">
    <div class="loginBox">
      <div class="loginMain">
        <h1>Log - In</h1>
        <input class="topLogin" v-model="user.email" placeholder="example@address.net" type="email" required>
        <input class="bottomLogin" v-model="user.password" placeholder="*********" type="password" required>
      </div>
      <div v-bind:class="wrongInput">Wrong Username/Password</div>
      <button class="signIn" v-on:click="submit()">Sign - in</button>
      <div class="links">
        <h6>New User? <span v-on:click="$router.push('/register')" class="link">Create a new account</span></h6>
        <h5 class="link" v-on:click="$router.push('/legal')">©2017 Total Response</h5>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      // initialize the component with all properties
      user: {
        email: '',
        password: '',
        id: '',
        token: ''
      },
      wrong: false
    }
  },
  computed: {
    wrongInput: function () {
      return {
        hidden: this.wrong === false,
        wrongInput: this.wrong === true
      }
    }
  },
  props: ['logged'],
  created () {
    if (this.logged === true) {
      this.$router.push('/account')
    }
  },
  methods: {
    submit () {
      axios.post('http://54.191.145.227:81/users/login', {
        email: this.user.email.toLowerCase(),
        password: this.user.password
      })
        .then(response => {
          if (response.status !== 401) {
            this.user.token = response.data.token
            this.user.id = response.data.userId
            this.$emit('login', this.user)
          }
        })
        .catch(response => {
          console.log(response)
          this.wrong = true
        })
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

  .hidden {
    display: none;
  }

  .main {
    background-size: cover;
    width: 100%;
    height: 100%;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 40px;
    padding-left: 0px;
    padding-right:0px;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 20px 500px 10px 20px;
  }

  .loginBox {
    grid-column: 1;
    grid-row: 2;
    text-align: center;
    box-shadow: 2px 6px #d1d1d1;
    border-radius: 24px;
    background: @backgroundColor;
    background-image: -webkit-linear-gradient(top, @lightTR, @darkTR);
    background-image: -moz-linear-gradient(top, @lightTR, @darkTR);
    background-image: -ms-linear-gradient(top, @lightTR, @darkTR);
    background-image: -o-linear-gradient(top, @lightTR, @darkTR);
    background-image: linear-gradient(to bottom, @lightTR, @darkTR);
    display: grid;
    grid-template-columns: 1fr 20px repeat(2, 1fr) 20px 1fr;
    grid-template-rows: 10px 180px repeat(4, 1fr);
  }

  h1 {
    font-family: @boldText;
    color: #fff;
    text-shadow: 2px 1px 2px #515151;
    -webkit-background-clip: text;
       -moz-background-clip: text;
            background-clip: text;
    font-size: @baseFontSize + 1.2em;
    padding-left: 12px;
  }

  .loginMain {
    width: 100%;
    grid-row: 2;
    grid-column-start: 2;
    grid-column-end: 5;
  }

  input {
    background-color: transparent;
    border: none;
    color: @textColor;
    padding-top: 12px;
    padding-left: 14px;
  }

  .topLogin {
    border-style: solid;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px;
    border-color: @textColor;
    width: 100%;
    height: 2em;
    font-size: 1em;
  }

  strong {
    color: black;
    font-family: @sideText;
  }

  .bottomLogin {
    border-style: solid;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-color: @textColor;
    width: 100%;
    height: 2em;
    margin-bottom: 10px;
    font-size: 1em;
  }

  .wrongInput {
    grid-row: 3;
    grid-column-start: 2;
    grid-column-end: 6;
    text-align: center;
    color: @medicalColor;
    font-size: 18px;
    font-family: @sideText;
    margin-top: 20px;
  }

  .signIn {
    grid-row: 4;
    grid-column-start: 2;
    grid-column-end: 6;
    margin-bottom: 10px;
  }

  .links {
    grid-row: 5;
    grid-column-start: 1;
    grid-column-end: 7;
    font-size: 1.4em;
    color: @textColor;
    padding-bottom: 10px;
  }

  .links a {
    font-size: 1.4em;
    color: @textColor;
  }

  .links h6 {
    margin: 10px 0;
    padding-top: 0;
    padding-bottom: 10px;
  }

  .links h5 {
    margin-top: 0px;
    padding-top: 0;
    padding-bottom: 10px;
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
    font-size: 1.6em;
    padding: 10px 30px 10px 30px;
    border: 2px solid #9fb0d6;
    text-decoration: none;
  }

  button:hover {
    background: #3f62ad;
    text-decoration: none;
  }
</style>
