<template>
  <div id="Navbar" class="nav">
    <div class="logo" v-on:click="homeNav"></div>
    <div v-on:click="navToggle" class="navButton">
      <center><div v-bind:class="navbutton" class="navButtonIcon"></div></center>
    </div>
    <div v-bind:class="navpane" class="navpane">
      <center>
        <div v-on:click="loginNav" v-bind:class="login">Login</div>
        <div v-on:click="registerNav" v-bind:class="login">Register</div>
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
        this.$router.push('/call')
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
    background-color: #1D3246;
    display: grid;
    grid-template-columns: 10px repeat(5, 1fr) 10px;
    z-index: 2;
    box-shadow: 0px 6px 2px #d1d1d1;
  }

  .logo {
    background-image: url('../../assets/totalResponseLogoMobile.png');
    background-repeat: no-repeat;
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row: 1;
    height: auto;
    width: 270px;
    transform: scale(.70,.70)
  }

  .navButton {
    grid-column: 6;
    width: 100px;
    height: 100px;
    transform: scale(.75,.75);
    -webkit-tap-highlight-color: rgba(0,0,0,0);
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
    width: 90%;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    margin: 10px 0;
    padding: 4px;
    background: #0c2069;
      background-image: -webkit-linear-gradient(top, @darkTR, @lightTR);
      background-image: -moz-linear-gradient(top, @darkTR, @lightTR);
      background-image: -ms-linear-gradient(top, @darkTR, @lightTR);
      background-image: -o-linear-gradient(top, @darkTR, @lightTR);
      background-image: linear-gradient(to bottom, @darkTR, @lightTR);
    text-align: center;
    font-family: @boldText;
    font-size: @baseFontSize + 1em;
    text-decoration: none;
    color: #FFF;
    border: 2px solid #fff;
    z-index: 3;
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
    40% {margin: 22px 0;}
    80% {margin: 12px 0;}
    100% {margin: 12px 0;}
  }

  @keyframes deactivateNav {
    0% {top: 80px;}
    99% {top: 2000px;}
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
    animation-duration: .8s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    display: inline;
  }

  .navtileAnimation {
    animation-name: activateNavtiles;
    animation-duration: 1.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .navpaneAnimationExit {
    animation-name: deactivateNav;
    animation-duration: 1.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .navtileAnimationExit {
    animation-name: deactivateNavtiles;
    animation-duration: 1.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .navButtonAnimation {
    animation: navButtonAnimation .4s steps(18);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .navButtonAnimationExit {
    animation: navButtonAnimationReverse .5s steps(18);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  a {
    text-decoration: none;
  }

</style>
