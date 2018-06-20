<template>
  <div id="Foot" class="main">
    <button v-on:click="homeNav" v-bind:class="logged, home">Home</button>
    <button v-on:click="callNav" v-bind:class="logged, call">Call</button>
    <button v-on:click="accountNav" v-bind:class="logged, acct">Account</button>
  </div>
</template>

<script>
var x = false
export default {
  name: 'Foot',
  data: function () {
    return {
      isToggled: false,
      first: true
    }
  },
  props: ['loggedNav'],
  computed: {
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
@secondaryColor: #23374c;
@textColor: #fff;
  .main {
    background-color: transparent;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 60px;
    right: 0;
    z-index: 2;
    border-top: 6px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 40px 20px;
  }
button {
  color: white;
  font-size: 1.2em;
}
  .copyright {
    color: white;
    text-align: center;
  }
  .logged {
    text-align: center;
    clor: white;
  }
</style>
