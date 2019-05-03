<template>
	<div class="prize-wrapper">
		<div class="title">Hadiah saya</div>
		<div class="list">
			<div class="bottom-wave">

			</div>
		</div>
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
		color: #fff;
		text-align: center;
		line-height: rem(92px);
		padding-left: rem(30px);
		box-sizing: border-box;
		font-size: rem(14px);
	}
	.list {
        position: relative;
		width: 96%;
		height: 300px;
		background: #6829c8;
		border-radius: 10px;
        margin-top: 10px;
        overflow: hidden;
		.bottom-wave {
            position: absolute;
            bottom: 0;
			width: 100%;
            height: rem(116px);
            background: #fff;
			&:before {
                content: '';
                position: absolute;
                display: inline-block;
                width: rem(692px);
                height: rem(22px);
				background: url(#{$base}/img_border_wavestyle_1.png) center
                    center no-repeat/100%;
                transform: translateY(-50%);
			}
		}
	}
}
</style>
