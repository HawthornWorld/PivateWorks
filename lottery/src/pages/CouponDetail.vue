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
				</ul>
			</div>
		</div>
		<div class="addr-wrap">
			<div class="item-wrap">
				<span class="item-title">VOUCHER CODE:</span>
				<div type="text" class="item-input" :style="{backgroundImage: 'url(' + couponbg + ')'}">
					<span>{{prize.extend_1}}</span>
					<span class="copy-clip" @click="copycoupon" :data-clipboard-text="prize.extend_1">点我复制到剪切板</span>
				</div>
			</div>
			<span class="item-stat">{{stat}}</span>
			<span class="item-txt">{{stat === "已使用" ? "获取更多代金券或折扣活动请前往" : "立即去LAZADA RAYMANGA官方店铺使用该代金券:"}}</span>
			<div class="item-goshopping" @click="go2shopping">
				<img :src="shopping" alt="shop">
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
import Clipboard from "clipboard";
export default {
	name: "coupondetail",
	data() {
		return {
			appLogoImg: logo,
			express_code: "",
			couponbg: require("../assets/images/couponbg.png"),
			shopping: require("../assets/images/goshopping.png"),
		};
	},
	computed: {
		orderCode() {
			return this.$route.params.ordercode;
		},
		prize() {
			console.log(this.$route.params.prize);
			return this.$route.params.prize;
		},
		stat() {
			let a = "";
			switch (this.$route.params.status) {
				case 1:
					a = "已领取";
					break;
				case 2:
					a = "待填写信息";
					break;
				case 3:
					a = "等待发货";
					break;
				case 4:
					a = "运输中";
					break;
				case 5:
					a = "已签收";
					break;
				case 6:
					a = "已拒签";
					break;
				case 7:
					a = "未使用";
					break;
				case 8:
					a = "已使用";
					break;
			}
			return a;
		}
	},
	mounted() {
		if (this.$route.params.status !== 3) {
			this.fetchRecordDetail();
		} else if (this.$route.params.status === 3) {
			this.express_code = "等待发货";
		}
	},
	methods: {
		/**
		 * 获取物流详情
		 */
		fetchRecordDetail() {
			const recordDetail =
				"http://149.129.216.140/lottery/user/getRecordDetail";
			this.$axios
				.post(recordDetail, {
					token: "TestToken",
					order_code: this.orderCode
				})
				.then(res => {
					/**
					 * 状态码
					 * 1     ：成功
					 * 其他  ：调用失败
					 */
					const { code } = res;
					if (code === 1) {
						this.express_code = res.data.express_code;
					} else if (code === 2005) {
						this.$toast("暂无物流详情");
					} else {
						// this.$toast("获取数据失败");
					}
				})
				.catch(() => {
					this.$toast("网络繁忙，请稍后再试");
				});
		},
		go2shopping() {
			location.href = "https://baidu.com";
		},
		copycoupon() {
			let btn = new Clipboard(".copy-clip");
		}
	},
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
	height: 60px;
	background: #e7e7e7;
	border-radius: 3px;
	margin-top: 6px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: AdobeHeitiStd-Regular;
	font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2px;
	color: #121212;
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
.item-stat {
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: AdobeHeitiStd-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #ff000c;
	padding-top: 10px;
}
.item-txt {
	font-family: AdobeHeitiStd-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #000000;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 33px;
}
.item-goshopping {
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
}
.item-goshopping > img {
	max-height: 80px;
}
.copy-clip {
	font-family: AdobeHeitiStd-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #5b5b5b;
}
</style>
