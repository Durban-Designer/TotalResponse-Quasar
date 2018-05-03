<template>
  <div class="box">
    <h1 v-on:click="back">Back</h1>
    <h1>Terms And Conditions</h1>
  </div>
</template>
<script>
export default {
  name: 'Terms',
  methods: {
    back: function () {
      this.$emit('back')
    }
  }
}
</script>
<style scoped lang="less">
  .box {
    font-size: 5em;
    color: #fff;
    z-index: 2;
    grid-template-columns:  repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }

</style>
