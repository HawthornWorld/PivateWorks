<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  mounted() {
    this.setRemRoot()
  },
  methods: {
    setRemRoot() {
      var fnSet = function() {
        var availWidth =
          window.innderWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        var rootFontSize =
          (availWidth =
            750 < (availWidth = availWidth < 320 ? 320 : availWidth)
              ? 750
              : availWidth) /
          540 *
          20;
        document.getElementsByTagName('html')[0].style.fontSize =
          rootFontSize + 'px';
      };
      fnSet();
      window.onresize = fnSet;
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
