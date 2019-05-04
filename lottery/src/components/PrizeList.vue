<template>
	<div class="prize-wrapper">
		<div class="title">Hadiah saya</div>
		<!-- <div class="list"> -->
		<!-- <div class="title">Hadiah saya</div> -->
		<div class="content-wrap">
			<div class="contend-item-wrap" v-for="(item, index) in prizeList" :key="index">
				<div class="item-img-wrap">
					<img :src="'http://'+item.prize.url" alt="img" class="item-img">
				</div>
				<div class="item-txt-wrap">
					<span class="txt-big">{{item.prize.title}}</span>
					<span class="txt-small">领奖时间{{formatTime(new Date(item.create_time), "yyyy-MM-dd hh:mm:ss")}}</span>
				</div>
				<div class="item-stat-btn" @click="go2order(item,$event)">
					<span :class="`item-stat ${btnStyle(item.status)}`">{{btnMap(item.status)}}</span>
				</div>
			</div>
			<div class="bottom-wave"></div>
			<div class="view-more-btn" @click="viewmore">
				<img :src="btnimg">
			</div>
		</div>
		<!-- </div> -->
	</div>
</template>

<script>
// import util from "../vendors/util.js";
// const BASE_URL = "../assets/images";
export default {
	name: "prize",
	data() {
		return {
			prizeList: [],
			btnimg: require("../assets/images/viewmore.png")
		};
	},
	props: {
		// userLang: {
		// 	type: Object,
		// 	default: {}
		// }
	},
	mounted() {
		this.getPrizeList();
	},
	methods: {
		getPrizeList() {
			const prize = "http://149.129.216.140/lottery/user/getUserInfo";
			this.$axios
				.post(prize, {
					token: "TestToken"
				})
				.then(res => {
					if (res && res.data && res.data.lottery_record) {
						this.prizeList = res.data.lottery_record;
					}
				});
		},
		formatTime(dataObj, fmt) {
			var o = {
				"M+": dataObj.getMonth() + 1, //月份
				"d+": dataObj.getDate(), //日
				"h+": dataObj.getHours(), //小时
				"m+": dataObj.getMinutes(), //分
				"s+": dataObj.getSeconds(), //秒
				"q+": Math.floor((dataObj.getMonth() + 3) / 3), //季度
				S: dataObj.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(
					RegExp.$1,
					(dataObj.getFullYear() + "").substr(4 - RegExp.$1.length)
				);
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(
						RegExp.$1,
						RegExp.$1.length == 1
							? o[k]
							: ("00" + o[k]).substr(("" + o[k]).length)
					);
			return fmt;
		},
		btnMap(stat) {
			let list = [
				"已领取",
				"待填写信息",
				"等待发货",
				"运输中",
				"已签收",
				"已拒签",
				"未使用",
				"已使用"
			];
			return list[stat - 1];
		},
		btnStyle(stat) {
			let list = [
				"get",
				"tbd",
				"notsend",
				"trans",
				"hasreceive",
				"refuse",
				"notuse",
				"used"
			];
			return list[stat - 1];
		},
		go2order(item, $event) {
			$event.preventDefault();
			//实物
			if (item.prize.prize_type === 3) {
				//需要填信息
				if (item.status === 2) {
					this.$router.push({
						name: "order",
						params: {
							ordercode: item.order_code,
							prize: item.prize,
							status: item.status
						}
					});
				}
				if (
					item.status === 3 ||
					item.status === 4 ||
					item.status === 5 ||
					item.status === 6
				) {
					this.$router.push({
						name: "detail",
						params: {
							ordercode: item.order_code,
							prize: item.prize,
							status: item.status
						}
					});
				}
			}
			//优惠券详情
			if (item.prize.prize_type === 2) {
				this.$router.push({
					name: "coupondetail",
					params: {
						ordercode: item.order_code,
						prize: item.prize,
						status: item.status
					}
				});
			}
			//话费详情
			if (item.prize.prize_type === 4) {
				this.$router.push({
					name: "phonedetail",
					params: {
						ordercode: item.order_code,
						prize: item.prize,
						status: item.status
					}
				});
			}
		},
		viewmore() {
			this.$router.push({
				name: "list"
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.prize-wrapper {
	position: relative;
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
	.content-wrap {
		position: relative;
		width: 96%;
		height: auto;
		background: #6829c8;
		border-radius: 10px;
		margin-top: 10px;
		overflow: hidden;
	}
}
.contend-wrap {
	width: 100%;
	height: 100%;
	padding: 10px 0.3rem /* 30/100 */ 0 0.3rem;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;
}
.bottom-wave {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: rem(116px);
	background: #fff;
	&:before {
		content: "";
		position: absolute;
		display: inline-block;
		width: rem(692px);
		height: rem(22px);
		background: url(#{$base}/img_border_wavestyle_1.png) center center
			no-repeat/100%;
		transform: translateY(-50%);
	}
}
.contend-item-wrap {
	width: 100%;
	height: 62px;
	min-height: 62px;
	margin: 10px 0 0 0;
	border-bottom: 1px dashed #fff;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.item-img-wrap {
	width: 48px;
	height: 36px;
	border-radius: 3px;
	background: #fffcb2;
	margin: 0 9px;
}
.item-txt-wrap {
	width: 1.65rem /* 165/100 */;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.txt-big {
	font-family: AdobeHeitiStd-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #f3e4e4;
}
.txt-small {
	font-family: AdobeHeitiStd-Regular;
	font-size: 9px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #ff9422;
}
.item-stat-btn {
	height: 100%;
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.item-stat {
	width: 70px;
	height: 26px;
	background-color: #000000;
	border-radius: 13px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item-img {
	max-width: 100%;
}
.view-more-btn {
	position: absolute;
	bottom: 13px;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}
.view-more-btn > img {
	max-width: rem(247px);
}
.item-stat.get,
.item-stat.hasreceive,
.item-stat.used,
.item-stat.notused {
	background: #803ce6;
}
.item-stat.tbd,
.item-stat.notsend {
	background: #d72ae6;
}
.item-stat.trans {
	background: #deb32f;
}
.item-stat.refuse {
	background: #000;
}
</style>
