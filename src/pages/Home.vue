<template>
  <div class="main">
  </div>
</template>

<script>
export default {
  name: '/',
  created () {
    if (this.logged === true) {
      this.$router.push('/')
    } else {
      this.$router.push('/login')
    }
  },
  data: function () {
    return {
      logged: true
    }
  }
}
</script>

<style scoped lang="less">
  .main {
    height: 100%;
      width: 100%;
      position:fixed;
      background-image: url('../assets/noise.png');
  }
h1 {
  color: white;
}
</style>
