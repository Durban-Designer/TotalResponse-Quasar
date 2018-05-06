<template>
  <div id="app">
    <header>
    </header>
    <main>
      <navbar v-on:logOut="logOut" :loggedNav="user.isLoggedIn"></navbar>
      <router-view v-on:login="login" v-on:register="register" :userId="user.id" :token="user.token" :logged="user.isLoggedIn"></router-view>
      <foot></foot>
    </main>
  </div>
</template>

<script>
import Navbar from './pages/elements/Navbar'
import Foot from './pages/elements/Foot'

export default {
  name: 'app',
  components: {
    'navbar': Navbar,
    'foot': Foot
  },
  data: function () {
    return {
      user: {
        token: '',
        id: '',
        isLoggedIn: false
      }
    }
  },
  methods: {
    login (user) {
      this.user.token = user.token
      this.user.id = user.id
      this.user.isLoggedIn = true
      this.$router.push('/home')
    },
    register (user) {
      this.user.token = user.token
      this.user.id = user.userId
      this.user.isLoggedIn = true
      this.$router.push('/account')
    },
    logOut () {
      this.user.token = ''
      this.user.id = ''
      this.user.isLoggedIn = false
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
/* ----------- iPhone 4 and 4S ----------- */

/* Portrait and Landscape */
@media only screen
and (min-device-width: 320px)
and (max-device-width: 480px)
and (-webkit-min-device-pixel-ratio: 2) {

}

/* Portrait */
@media only screen
and (min-device-width: 320px)
and (max-device-width: 480px)
and (-webkit-min-device-pixel-ratio: 2)
and (orientation: portrait) {
}

/* Landscape */
@media only screen
and (min-device-width: 320px)
and (max-device-width: 480px)
and (-webkit-min-device-pixel-ratio: 2)
and (orientation: landscape) {

}
/* ----------- iPhone 6, 6S, 7 and 8 ----------- */

/* Portrait and Landscape */
@media only screen
  and (min-device-width: 375px)
  and (max-device-width: 667px)
  and (-webkit-min-device-pixel-ratio: 2) {

}

/* Portrait */
@media only screen
  and (min-device-width: 375px)
  and (max-device-width: 667px)
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: portrait) {

}

/* Landscape */
@media only screen
  and (min-device-width: 375px)
  and (max-device-width: 667px)
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: landscape) {

}

  main {
    width: 100%;
  }

  body {
    margin: none;
  }
</style>
