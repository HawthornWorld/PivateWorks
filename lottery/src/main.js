import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import axios from "axios";
import "mint-ui/lib/style.css";
import { Toast } from "mint-ui";
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
	id: 'UA-120160055-4',
	router,
	autoTracking: {
		pageviewOnLoad: false
	}
})

// import 'core-js/fn/object'
// import 'core-js/fn/array'
Vue.prototype.$axios = axios;
Vue.prototype.$toast = Toast;

axios.defaults.headers.post["Content-Type"] = "application/json";

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
