<template>
	<div class="prize-wrapper">
		<div class="title"></div>
		<div class="list"></div>
	</div>
</template>

<script>
// import util from "../vendors/util.js";
// const BASE_URL = "../assets/images";
export default {
	name: "prize",
	data() {
		return {};
	},
	props: {
		// userLang: {
		// 	type: Object,
		// 	default: {}
		// }
	},
	mounted() {},
	methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.prize-wrapper {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	margin-top: 20px;
	.title {
		width: rem(296px);
		height: rem(92px);
		background: url(#{$base}/img_title_myawards.png) center center
			no-repeat/100%;
		// background: url(#{$base}/img_border_wavestyle_1.png) center center no-repeat/100%;
	}
	.list {
		width: 96%;
		height: 100px;
		background: #6829c8;
		border-radius: 10px;
		margin-top: 10px;
	}
}
</style>
