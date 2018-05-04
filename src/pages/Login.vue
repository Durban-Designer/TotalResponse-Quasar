<template>
  <div class="main">
    <div class="loginBox">
      <h2>Peace of Mind.<br/> Wherever you go.</h2>
      <h3>Total Response</h3>
      <div class="loginMain">
        <h1>Log In</h1>
        <input class="topLogin" v-model="user.email" placeholder="example@address.net" type="email" required>
        <input class="bottomLogin" v-model="user.password" placeholder="*********" type="password" required>
      </div>
      <div v-bind:class="wrongInput">Wrong Username or Password.</div>
      <button class="signIn" v-on:click="submit()">Submit</button>
      <div class="links">
        <h6>New User? <span v-on:click="$router.push('/register')" class="link">Create A New Account</span></h6>
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
    background-image: url('../assets/TRlog.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    margin-bottom: 40px;
    padding-left: 0px;
    padding-right:0px;
    display: grid;
    position: fixed;
  }

  .loginBox {
    overflow-y: hidden;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 30px repeat(2, 1fr) 30px 1fr;
    grid-template-rows: repeat(6, 1fr);
  }

  h1 {
    color: #fff;
    -webkit-background-clip: text;
       -moz-background-clip: text;
            background-clip: text;
    font-size: @baseFontSize + 1.2em;
    padding-left: 12px;
    font-weight: 400;
  }
  h2 {
    color: white;
    width:100%;
    grid-row: 2;
    grid-column-start: 1;
    grid-column-end: 7;
    line-height: 30px;
  }
  h3 {
    grid-row: 1;
    text-align: left;
    grid-column-start: 1;
    grid-column-end: 7;
    color: white;
    font-size: 2em;
    margin-left: 5%;
    line-height: 20px;
  }
  .loginMain {
    width: 100%;
    grid-row: 4;
    grid-column-start: 2;
    grid-column-end: 6;
    margin-top: -10%;
  }

  input {
    background-color: transparent;
    border: none;
    color: white;
    padding-left: 5%;
  }
  ::placeholder {
    color: white;
  }
  .topLogin {
    border:  2px solid white;
    margin-bottom: 5px;
    width: 100%;
    height: 2em;
    font-size: 1em;
    background-color: rgba(255, 255, 255, 0.3);
  }

  strong {
    color: black;
    font-family: @sideText;
  }

  .bottomLogin {
    border:  2px solid white;
    width: 100%;
    height: 2em;
    margin-bottom: 10px;
    font-size: 1em;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .wrongInput {
    grid-row: 2;
    grid-column-start: 1;
    grid-column-end: 7;
    text-align: center;
    color: @medicalColor;
    font-size: 1.2em;
    text-shadow: 0px 4px 8px black;
  }

  .signIn {
    grid-row: 5;
    grid-column-start: 2;
    grid-column-end: 6;
    margin-bottom: 10px;
  }

  .links {
    grid-row: 6;
    grid-column-start: 1;
    grid-column-end: 7;
    font-size: 1.5em;
    color: white;
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
    font-size: .6em;
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
