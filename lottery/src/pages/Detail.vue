<template>
	<div class="order-wrap">
		<div class="header">
			<div class="header-cnt">
				<div class="img">
					<img :src="prize.detail_url" alt="detail" class="prize-img">
				</div>
				<ul class="txt">
					<li class="title">{{prize.title}}</li>
					<li class="desc">{{prize.detail}}</li>
					<li class="price">{{prize.price}}</li>
					<li>{{prize.original_price}}</li>
				</ul>
			</div>
		</div>
		<div class="addr-wrap">
			<div class="deli-stat-wrap">
				<span class="deli-no">NO.72318937198371</span>
				<span class="deli-txt">快递已签收,谢谢惠顾!</span>
			</div>
			<div class="item-wrap">
				<span class="item-title">快递号:</span>
				<span type="text" class="item-input">1111 2222 3333 4444</span>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">您本次使用的联系方式</span>
				<div type="text" class="item-addr">
					<span>ming zi</span>
					<span>7865645273</span>
					<span>Ampana Kota Badon Kuta Utara</span>
					<span>babala street NO.123 , A12-402</span>
				</div>
			</div>
			<div class="special-tip" style="margin-bottom: 10px">
				<div class="sp-tip-title">特别说明</div>
				<span class="sp-tip-item">1.若因地址不详,联系号码错误,停机等个人原因导致快递多次配送不成功,延期退回后我们将不再进行二次发货,非质量问题不退换,敬请谅解;</span>
				<span class="sp-tip-item">2.如有疑问可直接联系客服;</span>
			</div>
			<div class="app-img-wrap">
				<img :src="appLogoImg" alt="logo">
			</div>
		</div>
	</div>
</template>

<script>
import logo from "../assets/images/paymangaapp.png";
export default {
	name: "order",
	data() {
		return {
			appLogoImg: logo,
			prize: {
				detail: "Berlianx50",
				detail_url: "http://149.129.219.103/prize/icon_zuanshi_2.jpg",
				original_price: 0,
				price: 0,
				prize_id: 4,
				prize_type: 1,
				title: "Berlianx50",
				url: "http://149.129.219.103/prize/icon_zuanshi_1.jpg"
			}
		};
	},
	computed: {},
	mounted() {},
	methods: {},
	components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.order-wrap {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	.header {
		width: 100%;
		padding: rem(44px);
		box-sizing: border-box;
		border-bottom: 1px solid #c9c9c9;
		.img {
			display: inline-block;
			width: rem(300px);
			height: rem(300px);
			margin-right: rem(16px);
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
}
.addr-wrap {
	display: flex;
	width: 100%;
	height: auto;
	flex-direction: column;
	padding-top: 15px;
	box-sizing: border-box;
}
.item-wrap {
	display: flex;
	flex-direction: column;
}
.item-title {
	padding-left: 22px;
	font-family: AdobeHeitiStd-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #000000;
}
.item-input {
	margin-left: 0.275rem;
	margin-right: 0.25rem; /* 25/100 */
	height: 39px;
	background: #e7e7e7;
	border-radius: 3px;
	margin-top: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: AdobeHeitiStd-Regular;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2px;
	color: #0a0a0a;
}
.item-addr {
	margin-left: 0.275rem;
	margin-right: 0.25rem; /* 25/100 */
	height: auto;
	background: #e7e7e7;
	border-radius: 3px;
	margin-top: 6px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: AdobeHeitiStd-Regular;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2px;
	color: #0a0a0a;
	padding: 15px 0;
	box-sizing: border-box;
}
.mt9 {
	margin-top: 9px;
}
.special-tip {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 18px;
}
.sp-tip-title {
	padding-left: 0.225rem /* 22.5/100 */;
	font-family: AdobeHeitiStd-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #000000;
	margin-bottom: 6px;
}
.sp-tip-item {
	padding-left: 0.37rem /* 37/100 */;
	padding-right: 0.29rem /* 29/100 */;
	font-family: AdobeHeitiStd-Regular;
	font-size: 11px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #7a7a7a;
}
.app-img-wrap {
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
}
.app-img-wrap > img {
	max-width: 1.62rem /* 162/100 */;
}
.deli-stat-wrap {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
}
.deli-stat-wrap > span {
	display: flex;
	justify-content: center;
	align-items: center;
}
.deli-no {
	font-family: AdobeHeitiStd-Regular;
	font-size: 18px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2px;
	color: #ff0000;
}
.deli-txt {
	font-family: AdobeHeitiStd-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #000000;
	margin-top: 10px;
}
.prize-img {
	width: rem(300px);
	height: rem(300px);
	max-width: rem(300px);
}
</style>
