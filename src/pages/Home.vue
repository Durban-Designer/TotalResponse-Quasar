<template>
  <div class="main">
    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: 'home',
  created () {
    if (this.logged === true) {
      this.$router.push('/home')
    } else {
      this.$router.push('/login')
    }
  },
  data: function () {
    return {
      logged: false
    }
  }
}
</script>

<style scoped lang="less">
  .main {
    height: 100%;
      width: 100%;
      position:fixed;
      background-color: #2b2b2b;
  }

</style>
