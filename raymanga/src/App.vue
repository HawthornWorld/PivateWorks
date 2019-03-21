<template>
  <div id="app">
        <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
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
          360 *
          100;
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
body {
  overflow-x: hidden;
}
html,
body,
p,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
dl,
dt,
dd,
button {
  margin: 0;
  padding: 0;
  font-size: 12px;
}
body,
input,
button,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Microsoft YaHei', 'Hiragino Sans GB', Arial, 'Lucida Grande',
    Verdana;
}
html {
  margin: auto;
  min-width: 320px;
  max-width: 768px;
  font-size: 4vw;
  overflow-x: hidden;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 400;
}
ul,
ol,
li {
  list-style: none;
}
input,
button {
  display: block;
  outline: none;
  border: 0;
}
b {
  font-weight: 400;
}
i {
  font-style: normal;
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
body {
  background: #fff;
}
html, body {
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
}
.app-wrapper {
  position: relative;
  width: 100%;
  max-width: 768px;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.content-wrapper {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
}

</style>
