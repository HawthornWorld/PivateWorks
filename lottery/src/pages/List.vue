<template>
	<div class="list-wrapper">
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">未领取</mt-tab-item>
			<mt-tab-item id="2">已领取</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<div>HELLOKITTY</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<div>nihaoma</div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
import Vue from "vue";
import { Navbar, TabItem } from "mint-ui";
import { TabContainer, TabContainerItem } from "mint-ui";
import { Cell } from "mint-ui";

Vue.component(Cell.name, Cell);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

const STATS = {
	//已领取
	done: "done",
	//已签收
	get: "get",
	//拒收
	refuse: "refuse",
	//运输中
	transport: "transport",
	//待发货
	unsend: "unsend"
};
export default {
	name: "list",
	data() {
		return {
			getList: [
				{
					img: "",
					name: "HELLOKITTY美妆小工具套装x1",
					time: "有效期至二零一九",
					stat: STATS.done
				},
				{
					img: "",
					name: "HELLOKITTY美妆小工具套装x1",
					time: "有效期至二零一九",
					stat: STATS.done
				},
				{
					img: "",
					name: "HELLOKITTY美妆小工具套装x1",
					time: "有效期至二零一九",
					stat: STATS.done
				},
				{
					img: "",
					name: "HELLOKITTY美妆小工具套装x1",
					time: "有效期至二零一九",
					stat: STATS.done
				}
			],
			notGetList: [],
			selected: 1
		};
	},
	computed: {},
	methods: {},
	components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list-wrapper {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	background: #6829c8;
}
.list-wrapper .mint-navbar {
	background: transparent;
	color: #fffcb2;
	opacity: 0.5;
}
</style>
