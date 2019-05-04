<template>
	<div class="prize-wrapper" v-show="isPrizePop">
		<div class="mask" @click="closeMask"></div>
		<template v-if="resultData[0]">
			<div class="cnt">
				<div class="single-draw" v-if="isSingleDraw">
					<img :src="`http://${resultData[0].prize.detail_url}`" alt>
				</div>
				<div class="repeat-draw" v-if="isRepeatDraw">
					<div class="title">Hadiah saya</div>
					<div class="content-wrap">
						<div class="content-item-wrap" v-for="(item, index) in resultData" :key="index">
							<div class="item-img-wrap">
								<img :src="'http://'+item.prize.url" alt="img" class="item-img">
							</div>
							<div class="item-txt-wrap">
								<span class="txt-big">{{item.prize.title}}</span>
								<span
									class="txt-small"
								>领奖时间{{formatTime(new Date(item.create_time), "yyyy-MM-dd hh:mm:ss")}}</span>
							</div>
							<div class="item-stat-btn" @click="go2order(item, $event)">
								<span :class="`item-stat ${btnStyle(item.status)}`">{{btnMap(item.status)}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>
<script>
// const BASE_URL = '../assets/images'

export default {
	name: "detail-mask",
	data() {
		return {
			// imgsrv: this.resultData
			// 	? `http://${resultData[0].prize.detail_url}`
			// 	: ""
		};
	},
	props: {
		isPrizePop: {
			type: Boolean,
			default: false
		},
		isSingleDraw: {
			type: Boolean,
			default: false
		},
		isRepeatDraw: {
			type: Boolean,
			default: false
		},
		resultData: {
			type: Array,
			default: () => []
		}
	},
	mounted() {
		//动态设置fixed元素的宽度
		let dom = document.getElementsByClassName("share-wrapper")[0];
		dom.style.width = document.body.clientWidth + "px";
	},
	methods: {
		closeMask() {
			this.$emit("prizePop");
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
		}
	}
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.prize-wrapper {
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
	// background: #efeff4;
	// border-radius: 0 0 8px 8px;
	// overflow: hidden;
	// animation: spin 0.8s ease;
}
.title {
	position: relative;
	left: 50%;
	transform: translateX(-50%);
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
.single-draw {
	// background: url(#{$base}/)
}
.repeat-draw {
	background: #000;
	padding: rem(40px) rem(30px);
	box-sizing: border-box;
	background: #6829c8;
	width: 100%;
	max-height: rem(1000px);
	overflow-y: auto;
}
.content-wrap {
	width: 100%;
	height: 100%;
	// padding: 10px 0.3rem /* 30/100 */ 0 0.3rem;
	display: flex;
	flex-direction: column;
}
.content-item-wrap {
	width: 100%;
	height: 62px;
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
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #f3e4e4;
}
.txt-small {
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
	background-color: #803ce6;
	border-radius: 13px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item-img {
	max-width: 100%;
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