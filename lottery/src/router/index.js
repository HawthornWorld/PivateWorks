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
		path: "/list",
		name: "list",
		component: () => import("../pages/List.vue")
	},
	{
		path: "/order",
		name: "order",
		component: () => import("../pages/Order.vue")
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
