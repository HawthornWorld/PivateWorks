import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
	{
		path: "/index",
		name: "index",
		component: () => import("../pages/Index.vue")
	},
	{
		path: "*",
		name: "*",
		component: () => import("../pages/Index.vue")
	},
	{
		path: "/detail",
		name: "detail",
		component: () => import("../pages/Detail.vue")
	}
];

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: routes
});
