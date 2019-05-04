<template>
	<div class="prize-wrapper" v-show="isPrizePop">
		<div class="mask" @click="closeMask"></div>
		<template v-if="resultData[0]">
			<div class="cnt">
				<div
				 class="single-draw"
				 v-if="isSingleDraw"
				>
					<img
					 :src="`http://${resultData[0].prize.detail_url}`"
					 alt=""
					>
					<div class="t">CONGRATULATIONS!</div>
					<div class="prize-title">{{resultData[0].prize.title}}</div>
					<div class="btn-wrap">
						<span
						 v-if="prizeType===3"
						 @click="refuseEvent"
						>我不想要</span>
						<span
						 v-if="prizeType===2 || prizeType===3"
						 @click="receivePrize"
						>立即领取</span>
						<span
						 v-if="prizeType===4"
						 @click="receivePrize"
						>立即使用</span>
					</div>
					<div
					 class="refuse"
					 v-if="prizeType===3"
					>如果你不喜欢这个奖品，可以选择我不想要</div>
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
	name: "prize-pop",
	data() {
		return {
			// imgsrv: this.resultData
			// 	? `http://${resultData[0].prize.detail_url}`
			// 	: ""
			prizeType: this.resultData[0].prize.prize_type
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
		/**
		 * 拒绝奖品
		 */
		refuseEvent() {
			// 关掉弹窗
			this.$emit("prizePop");
			// 传递拒签奖品
			const refuse = "http://149.129.216.140/lottery/user/refuse";
			this.$axios
				.post(refuse, {
					token: "TestToken",
					prize_id: this.resultData[0].prize.prize_id,
					order_code: this.resultData[0].order_code
				})
				.then(res => {
					/**
					 * 状态码
					 * 1     ：成功
					 * 其他  ：调用失败
					 */
					const { code } = res.data;
					if (code === 1) {
						this.$toast('成功丢弃奖品')
                    }
				})
				.catch(() => {
					this.$toast("网络繁忙，请稍后再试");
				});
		},
		/**
		 * 跳领取奖品页面
         * prizeType:4 至优惠券中奖详情页；prizeType: 2 至实物中奖详情页；prizeType: 3 至话费中奖详情页
		 */
		receivePrize() {
            
        },
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
	width: 100%;
	height: rem(868px);
	background: url(#{$base}/bg_getaward.png) 0 0 no-repeat/100%;
	color: #fff;

	display: flex;
	flex-direction: column;
	align-items: center;

	transform: translateY(8%);

	img {
		width: rem(300px);
		height: rem(300px);
		margin: 32.5% 0 8%;
	}
	.t {
		margin: 2% 0;
		font-size: rem(36px);
	}
	.prize-title {
		font-size: rem(30px);
		width: rem(400px);
		white-space: wrap;
		text-align: left;
	}
	.btn-wrap {
		position: absolute;
		bottom: -20px;
		span {
			display: inline-block;
			&:first-child {
				width: rem(234px);
				height: rem(62px);
				line-height: rem(62px);
				background: url(#{$base}/btn_refuse.png) 0 0 no-repeat/100%;
				margin-right: rem(34px);
				font-size: rem(28px);
				text-align: center;
			}
			&:nth-child(1),
			&:nth-child(2) {
				width: rem(296px);
				height: rem(79px);
				line-height: rem(79px);
				background: url(#{$base}/btn_recieve.png) 0 0 no-repeat/100%;
				font-size: rem(32px);
				text-align: center;
			}
		}
	}
	.refuse {
		position: absolute;
		bottom: -50px;
		font-size: rem(28px);
	}
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