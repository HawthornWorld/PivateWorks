<template>
  <div class="navbar-wrapper">
    <span class="back" @click="back"></span>
    <span class="chapter-name">Chapter {{chapterNum}}</span>
    <div class="share">
      <span class="i-share"></span>
      <span>share</span>
    </div>
  </div>
</template>

<script>
import util from '../vendors/util.js';

export default {
  name: 'navbar',
  data() {
    return {
      // chapterNum: util.getQuery('chapternum'),
    };
  },
  props: ['chapterNum'],
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/common.scss';
.navbar-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  height: rem(160px);
  background: #f4f4f4;
  color: #7e7e7e;
  padding: 0 rem(40px);
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  .back {
    display: inline-block;
    width: rem(64px);
    height: rem(64px);
    background: url(#{$base}/ic_reader_navigation_back.png) center center
      no-repeat/100%;
  }
  .chapter-name {
    font-size: rem(48px);
    font-weight: bold;
    margin-left: rem(34px);
  }
  .share {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    .i-share {
      display: inline-block;
      width: rem(64px);
      height: rem(64px);
      font-size: rem(24px);
      background: url(#{$base}/ic_reader_navigation_share.png) center center
        no-repeat/100%;
    }
  }
}
</style>
