<template>
	<div class="share-wrapper" v-show="isDetailShow">
		<div class="mask" @click="closeMask"></div>
		<div class="cnt">
			<div class="header-cnt">
				<div class="img">
					<img :src="`http://${detailData.detail_url}`" alt="detail" class="prize-img">
				</div>
				<ul class="txt">
					<li class="title">{{detailData.title}}</li>
					<li class="desc">{{detailData.detail}}</li>
					<li class="price">Rp {{detailData.price}}</li>
					<del>Rp {{detailData.original_price}}</del>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
// const BASE_URL = '../assets/images'

export default {
	name: "detail-mask",
	data() {
		return {
			//   isShareShow: false,
		};
	},
	props: {
		isDetailShow: {
			type: Boolean,
			default: false
		},
		detailData: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	mounted() {
		//动态设置fixed元素的宽度
		let dom = document.getElementsByClassName("share-wrapper")[0];
		dom.style.width = document.body.clientWidth + "px";
	},
	methods: {
		closeMask() {
			this.$emit("popDetail");
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
	background: rgba(0, 0, 0, 0.5);
}
.cnt {
	position: absolute;
	z-index: 1;
	top: 0;
	width: 100%;
	height: rem(400px);
	background: #efeff4;
	border-radius: 0 0 8px 8px;
	overflow: hidden;
	animation: spin 0.8s ease;
}
.header-cnt {
	width: 100%;
	padding: rem(44px);
	box-sizing: border-box;
	.img {
		display: inline-block;
		width: rem(300px);
		height: rem(300px);
		margin-right: rem(16px);
	}
	img {
		width: 100%;
		height: 100%;
	}
	.txt {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		// justify-content: space-between;

		width: rem(310px);
		padding: rem(8px) 0;
		float: right;
		.title {
			font-size: rem(30px);
			color: #000;
		}
		.desc {
			color: #7a7a7a;
			font-size: rem(22px);
			margin: rem(8px) 0;
		}
		.price {
			color: #fe0000;
			font-size: rem(40px);
		}
	}
}

@keyframes spin {
	0% {
		transform: translateY(-40px);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>