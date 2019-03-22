<template>
  <div class="star-wrapper">
    <div class="title">谢谢观赏！</div>
    <div class="desc">本漫画还在试阅阶段,请花费一点时间为这本漫画打个分,这将影响这本漫画后续更新计划.</div>
    <div class="star"></div>
    <div class="text">
      <area />
    </div>
    <div class="submit">提交评分</div>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/common.scss';
.star-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5a5a5a;
  padding: 0 rem(128px);
  box-sizing: border-box;

  .title {
    font-size: rem(48px);
    font-weight: bold;
  }
  .desc {
    font-size: rem(36px);
    margin: rem(50px) 0 rem(100px);
  }
  .star {
  }
  .text {
    width: 100%;
    height: rem(278px);
    // border: 1px solid #b2b2b2;
    background: #e8e8e8;
  }
  .submit {
    width: rem(336px);
    height: rem(110px);
    line-height: rem(110px);
    color: #fff;
    font-size: rem(36px);
    background: #ff6666;
    border-radius: rem(110px);
    text-align: center;
    margin-top: rem(42px);

  }
}
</style>
