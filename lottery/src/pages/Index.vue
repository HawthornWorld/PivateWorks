<template>
	<div class="index-wrapper">
		<div class="banner"></div>
		<BroadCast :userLang="userLang" class="broadcast"></BroadCast>
		<LotteryModule></LotteryModule>
		<PrizeList></PrizeList>
		<Rule></Rule>
	</div>
</template>

<script>
import lang from "../vendors/lang.js";
import LotteryModule from "../components/LotteryModule.vue";
import PrizeList from "../components/PrizeList.vue";
import BroadCast from "../components/BroadCast.vue";
import Rule from "../components/Rule.vue";

export default {
	name: "index",
	data() {
		return {
			langKey: "",
			userLang: {}
		};
	},
	computed: {},
	mounted() {
		//获取用户设备语言 包含常规浏览器和ie浏览器
		this.langKey = (navigator.language || navigator.userLanguage).slice(
			0,
			2
		);
		//切换ui至相应语言
		this.userLang = lang[this.langKey];
		// eg:
		// this.btnTxtTemp = this.userLang.btnOpen;
	},
	methods: {
		goToList: function(event) {
			event.preventDefault();
			this.$router.push("List");
		}
	},
	components: {
		LotteryModule,
		PrizeList,
		BroadCast,
		Rule
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.index-wrapper {
	position: relative;
	width: 100%;
	background: #803ce6;
	padding-bottom: 50px;
	// overflow-y: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
	.banner {
		width: 100%;
		height: rem(490px);
		background: url(#{$base}/banner.png) top left no-repeat/100%;
	}
}
</style>
