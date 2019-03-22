import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios';

// Vue.use(Router)

// import 'core-js/fn/object'
// import 'core-js/fn/array'
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
