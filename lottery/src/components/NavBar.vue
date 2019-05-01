<template>
	<div class="navbar-wrapper">
		<span class="back" @click="back"></span>
		<span class="chapter-name">Chapter {{chapterNum}}</span>
		<div class="share" @click="popShareMask">
			<span class="i-share"></span>
			<span>share</span>
		</div>
		<shareMask :isMaskShow="isShow" @popShareMask="popShareMask"></shareMask>
	</div>
</template>

<script>
import util from "../vendors/util.js";
import shareMask from "../components/shareMask.vue";

export default {
	name: "navbar",
	data() {
		return {
			isShow: false
			// chapterNum: util.getQuery('chapternum'),
		};
	},
	props: ["chapterNum"],
	mounted() {
		//动态设置fixed元素的宽度
		let dom = document.getElementsByClassName("navbar-wrapper")[0];
		dom.style.width = document.body.clientWidth + "px";
	},
	methods: {
		back() {
			this.$router.go(-1);
		},
		/**
		 * 点击分享按钮弹出选择平台浮层
		 */
		popShareMask() {
			this.isShow = !this.isShow;
		}
	},
	components: {
		shareMask
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.navbar-wrapper {
	position: fixed;
	z-index: 9;
	top: 0;
	left: 0;
	width: 100%;
	height: rem(160px);
	background: #f4f4f4;
	color: #7e7e7e;
	box-sizing: border-box;

	display: flex;
	flex-direction: row;
	align-items: center;
	.back {
		display: inline-block;
		width: rem(64px);
		height: rem(64px);
		background: url(#{$base}/ic_reader_navigation_back.png) center center
			no-repeat/100%;
		margin-left: rem(40px);
	}
	.chapter-name {
		font-size: rem(48px);
		font-weight: bold;
		margin-left: rem(34px);
	}
	.share {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: right;
		// margin-left: auto;
		margin-left: rem(530px);

		.i-share {
			display: inline-block;
			width: rem(64px);
			height: rem(64px);
			font-size: rem(24px);
			background: url(#{$base}/ic_reader_navigation_share.png) center
				center no-repeat/100%;
		}
	}
}
</style>
