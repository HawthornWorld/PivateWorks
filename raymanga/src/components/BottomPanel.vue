<template>
  <div class="panel-wrapper">
    <span class="ad">AD</span>
    <span class="cnt">打开APP,免费看超多精彩漫画</span>
    <span class="down" @click="jumpToDown">DOWNLOAD</span>
  </div>
</template>

<script>
export default {
  name: 'panel',
  methods: {
    jumpToDown(){
      location.href = 'http://baidu.com'
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../assets/scss/common.scss';
.panel-wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: rem(140px);
  background: #f4f4f4;
  border-top: 1px solid #b2b2b2;
  font-size: rem(36px);
  padding: 0 rem(36px);
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    display: inline-block;
  }
}
.ad {
  color: #fff;
  background: #ff9600;
  padding: rem(12px) rem(30px);
  border-radius: 2px;
  box-sizing: border-box;
  margin-right: rem(14px);
}
.cnt {
  color: #4d4d4d;
}
.down {
  color: #fff;
  background: #ff6666;
  padding: rem(16px) rem(40px);
  border-radius: rem(50px);
  box-sizing: border-box;
  margin-left: auto;

}
</style>
