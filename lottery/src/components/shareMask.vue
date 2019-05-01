<template>
	<div class="share-wrapper" v-show="isMaskShow">
		<div class="mask" @click="closeMask"></div>
		<div class="cnt">
			<ul>
				<li class="logo1" @click="setShare"></li>
				<li class="logo2"></li>
				<li class="logo3"></li>
				<li class="logo4"></li>
			</ul>
		</div>
	</div>
</template>
<script>
// const BASE_URL = '../assets/images'

export default {
	name: "share-mask",
	data() {
		return {
			//   isShareShow: false,
		};
	},
	props: {
		isMaskShow: {
			type: Boolean,
			default: false
		}
	},
	mounted() {
		//动态设置fixed元素的宽度
		let dom = document.getElementsByClassName("share-wrapper")[0];
		dom.style.width = document.body.clientWidth + "px";
	},
	methods: {
		/**
		 * 设置分享
		 */
		setShare() {
			//调用平台分享api
			console.log("success");
		},
		closeMask() {
			this.$emit("popShareMask");
		}
	}
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.share-wrapper {
	position: fixed;
	z-index: 999;
	top: 0;
	width: 100%;
	height: 100%;
	// margin: 0 auto;
	text-align: left;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.mask {
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
}
.cnt {
	position: absolute;
	z-index: 1;
	bottom: 0;
	width: 100%;
	height: rem(400px);
	background: #efeff4;
	padding-top: 20px;
	overflow: hidden;
	animation: spin 0.8s ease;
	ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}
	li {
		width: rem(140px);
		height: rem(140px);
		border-radius: rem(100px);
		background: #ccc;
	}
}

@keyframes spin {
	0% {
		transform: translateY(40px);
		opacity: 0;
	}

	100% {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>