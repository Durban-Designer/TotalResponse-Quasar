<template>
  <div id="Navbar" class="nav">
    <div class="logo" v-on:click="homeNav"></div>
    <div v-bind:class="navpane" class="navpane">
      <center>
        <div v-on:click="loginNav" v-bind:class="login">Login</div>
        <div v-on:click="registerNav" v-bind:class="login">Register</div>
        <div v-on:click="homeNav" v-bind:class="logged">Home</div>
        <div v-on:click="accountNav" v-bind:class="logged">Account</div>
        <div v-on:click="callNav" v-bind:class="logged">Call</div>
        <div v-on:click="logOut" v-bind:class="logged">Log Out</div>
      </center>
    </div>
  </div>
</template>

<script>
var x = false
export default {
  name: 'Navbar',
  data: function () {
    return {
      isToggled: false,
      first: true
    }
  },
  props: ['loggedNav'],
  computed: {
    navbutton: function () {
      return {
        navButtonAnimation: this.isToggled,
        navButtonAnimationExit: !this.isToggled && !this.first
      }
    },
    navpane: function () {
      return {
        navpaneAnimation: this.isToggled,
        navpaneAnimationExit: !this.isToggled && !this.first
      }
    },
    about: function () {
      return {
        navtileAnimation: this.isToggled,
        navtileAnimationExit: !this.isToggled && !this.first,
        navtile: true
      }
    },
    login: function () {
      return {
        hidden: this.loggedNav,
        navtileAnimation: this.isToggled,
        navtileAnimationExit: !this.isToggled && !this.first,
        navtile: !this.loggedNav
      }
    },
    logged: function () {
      return {
        hidden: !this.loggedNav,
        navtileAnimation: this.isToggled,
        navtileAnimationExit: !this.isToggled && !this.first,
        navtile: this.loggedNav
      }
    }
  },
  methods: {
    navToggle: function () {
      // Nav button functionality
      if (x === false) {
        x = true
        this.isToggled = true
        this.first = false
      } else if (x === true) {
        x = false
        this.isToggled = false
      }
    },
    homeNav: function () {
      if (this.loggedNav === false) {
        this.$router.push('/login')
      } else {
        this.$router.push('/')
      }
      this.isToggled = false
      x = false
    },
    loginNav: function () {
      this.$router.push('/login')
      this.isToggled = false
      x = false
    },
    registerNav: function () {
      this.$router.push('/register')
      this.isToggled = false
      x = false
    },
    accountNav: function () {
      this.$router.push('/account')
      this.isToggled = false
      x = false
    },
    callNav: function () {
      this.$router.push('/call')
      this.isToggled = false
      x = false
    },
    logOut: function () {
      this.isToggled = false
      x = false
      this.$emit('logOut')
    }
  }
}
// prevents safari greying linking divs on tap
document.addEventListener('touchstart', function () {}, true)
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

  .nav {
    height: 80px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    z-index: 11;
    background-image: url('../../assets/noise.png');
    box-shadow: 0px 2px 5px black;
  }

  .logo {
    background-image: url('../../assets/trwhite.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    height: 100%;
    width: 100%;
    transform: scale(.70,.70);
  }

  h3 {
    position: fixed;
    z-index: 10;
    color: white;
    margin-left: 5%;
    font-size: 2em;
    font-weight: bold;
  }
  .navButton {
    grid-column: 6;
    width: 100px;
    height: 100px;
    transform: scale(.75,.75);
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    z-index: 10;
  }

  .navButtonIcon {
    width: 80px;
    height: 80px;
    background: url("../../assets/navbuttonAnimationWhite.svg");
    background-repeat: no-repeat;
  }

  .navpane {
    position: absolute;
    top: -2000px;
    width: 100%;
    z-index: 3;
  }

  .navtile {
    color: #354463;
    opacity: .8;
    font-weight: bold;
    font-size: 1.3em;
    box-shadow: 0px 3px 10px black;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.9);
    width: 100%;
    height: 40px;
    line-height: 30px;
    margin: 10px 0;
    padding: 4px;
    text-align: center;
    text-decoration: none;
    border: 2px solid #fff;
    z-index: 3;
  }
  .navtile:active {
    opacity: 1.0;
  }

  .hidden {
    display: none;
  }

  @keyframes activateNav {
    from {top: -2000px;}
    to {top: 90px;}
  }

  @keyframes activateNavtiles {
    0% {margin: 10px 0;}
    95% {margin: 20px 0;}
    100% {margin: 12px 0;}
  }

  @keyframes deactivateNav {
    0% {top: 80px;}
    99% {top: -2000px;}
    100% {display: none;}
  }

  @keyframes deactivateNavtiles {
    0% {margin: 12px 0;}
    50% {margin: 18px 0;}
    100% {margin: 26px 0;}
  }

  @keyframes navButtonAnimation {
    100% {background-position: -1440px;}
  }

  @keyframes navButtonAnimationReverse {
    0% {background-position: -1440px;}
    100% {background-position: 0px;}
  }

  .navpaneAnimation {
    animation-name: activateNav;
    animation-duration: .5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    display: inline;
  }

  .navtileAnimation {
    animation-name: activateNavtiles;
    animation-duration: .5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .navpaneAnimationExit {
    animation-name: deactivateNav;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .navtileAnimationExit {
    animation-name: deactivateNavtiles;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .navButtonAnimation {
    animation: navButtonAnimation .3s steps(18);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .navButtonAnimationExit {
    animation: navButtonAnimationReverse .3s steps(18);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  a {
    text-decoration: none;
  }

</style>
