<template>
  <div id="Foot" class="main">
    <div class="copyright">copyright © Total Response 2017</div>
    <div class="icons">
      <a href="www.facebook.com" class="fb"></a>
      <a href="www.twitter.com" class="tw"></a>
      <a href="www.github.com" class="gh"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Foot',
  data: function () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
// prevents safari greying linking divs on tap
document.addEventListener('touchstart', function () {}, true)
</script>
<style scoped lang="less">
@backgroundColor: #355477;
@secondaryColor: #23374c;
@textColor: #fff;
@baseFontSize: 1em;
  .main {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 20px;
    right: 0;
    z-index: 2;
    border-top: 6px;
  }

  .copyright {
    color: #919191;
  }

</style>
