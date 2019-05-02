<template>
	<div class="lottery-wrapper">
		<div class="lottery-wrap">
			<div class="title"></div>
			<div class="lottery-cnt">

			</div>
		</div>
	</div>
</template>

<script>
// const BASE_URL = "../assets/images";
export default {
	name: "star",
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
.lottery-wrapper {
	background: #6829c8;
	width: 96%;
	padding: 20px;
	box-sizing: border-box;
	border-radius: 10px;
	// height: 300px;
	.title {
		display: inline-block;
		width: rem(306px);
		height: rem(86px);
		background: url(#{$base}/img_mypoints.png) 0 0 no-repeat/100%;
	}
	.lottery-cnt {
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		width: rem(652px);
		height: rem(562px);
		background: url(#{$base}/bg_awards_borderlights.png) center center
			no-repeat/100%;
	}
}
</style>
