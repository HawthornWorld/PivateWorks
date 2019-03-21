import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// Vue.use(Router)

// import 'core-js/fn/object'
// import 'core-js/fn/array'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
