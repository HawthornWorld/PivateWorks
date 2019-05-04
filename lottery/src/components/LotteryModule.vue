<template>
	<div class="lottery-wrapper">
		<div class="lottery-wrap">
			<div class="title">{{userPoint}}</div>
			<table class="lottery-cnt">
				<tbody>
					<tr v-for="(row,idx) in prizeList" :key="idx">
						<td
							v-for="(item,idx) in row"
							:class="['tditem',`item${idx}`,`prize${item.prize_id}`,`ani${item.name}`]"
							:key="idx"
							:id="item.prize_id"
							@click="drawHandler(1,item,$event)"
						>
							<img v-if="item.prize_id !== 888" :id="item.prize_id" :src="`http://${item.url}`" alt>
							<img
								v-if="item.prize_id === 888"
								:id="item.prize_id"
								:src="item.url"
								alt
								@click="drawHandler(1,item,$event)"
							>
						</td>
					</tr>
				</tbody>
			</table>
			<ul class="btn-wrap">
				<li class="draw-five">
					<div class="tip">
						<span>Tingkat kemenangan</span>
						<span>+150%</span>
					</div>
					<div id="666" class="btn" @click="drawHandler(2,'',$event)"></div>
				</li>
				<li class="draw-ten">
					<div class="tip">
						<span>Tingkat kemenangan</span>
						<span>+150%</span>
					</div>
					<div id="777" class="btn" @click="drawHandler(3,'',$event)"></div>
				</li>
			</ul>
		</div>
		<DetailMask :isDetailShow="isDetailShow" :detailData="detailData" @popDetail="popDetail"></DetailMask>
		<PrizePop
			:isPrizePop="isPrizePop"
			:isSingleDraw="isSingleDraw"
			:isRepeatDraw="isRepeatDraw"
			:resultData="resultPrizeList"
			@prizePop="prizePop"
		></PrizePop>
	</div>
</template>

<script>
import draw1 from "../assets/images/img_btn_draw1.png";
import lang from "@/vendors/lang.js";
import DetailMask from "../components/DetailMask.vue";
import PrizePop from "../components/PrizePop.vue";

export default {
	name: "lottery",
	data() {
		return {
			initialList: [],
			prizeList: [],
			userPoint: "",
			isRolling: false,
			currentIdx: 0,
			isDetailShow: false,
			isPrizePop: false,
			isSingleDraw: false,
			isRepeatDraw: false,
			detailData: {},
			resultPrizeList: []
		};
	},
	props: {
		// userLang: {
		// 	type: Object,
		// 	default: {}
		// }
	},
	components: {
		DetailMask,
		PrizePop
	},
	created() {
		//获取用户设备语言 包含常规浏览器和ie浏览器
		this.langKey = (navigator.language || navigator.userLanguage).slice(
			0,
			2
		);
		//切换ui至相应语言
		this.userLang = lang[this.langKey];
	},
	mounted() {
		//获取九宫格奖品
		this.getPrizeList();
		//获取用户积分
		this.getPoint();
	},
	methods: {
		/**
		 * 中奖结果页开关
		 */
		prizePop(type) {
			this.isPrizePop = !this.isPrizePop;
			if (type === 1) {
				// 单抽结果
				this.isSingleDraw = !this.isSingleDraw;
			} else {
				// 连抽结果
				this.isRepeatDraw = !this.isRepeatDraw;
			}
		},
		/**
		 * 查看奖品详情
		 */
		popDetail(item) {
			this.isDetailShow = !this.isDetailShow;
			this.detailData = item;
		},
		/**
		 * 获取九宫格及奖品详情页奖品列表
		 */
		getPrizeList() {
			const getPrizeList =
				"http://149.129.216.140/lottery/common/getPrizeList";
			this.$axios
				.post(getPrizeList, {
					language_id: 1
				})
				.then(res => {
					/**
					 * 状态码
					 * 1     ：成功
					 * 其他  ：调用失败
					 */
					const { code, prize_list } = res.data;
					if (code === 1) {
						this.initialList = prize_list;
						// 给数组按顺时针顺序加数字属性
						this.initialList[0]["name"] = 1;
						this.initialList[1]["name"] = 2;
						this.initialList[2]["name"] = 3;
						this.initialList[3]["name"] = 8;
						this.initialList[4]["name"] = 4;
						this.initialList[5]["name"] = 7;
						this.initialList[6]["name"] = 6;
						this.initialList[7]["name"] = 5;
						let row1 = this.initialList.slice(0, 3);
						let row2 = this.initialList.slice(3, 5);
						row2.splice(1, 0, { url: draw1, prize_id: 888 });
						let row3 = this.initialList.slice(5, 8);
						this.prizeList.push(row1);
						this.prizeList.push(row2);
						this.prizeList.push(row3);
					} else {
						this.$toast("获取数据失败");
					}
				})
				.catch(() => {
					this.$toast("网络繁忙，请稍后再试");
				});
		},
		/**
		 * 获取用户积分
		 */
		getPoint() {
			const getUserInfo =
				"http://149.129.216.140/lottery/user/getUserInfo";
			this.$axios
				.post(getUserInfo, {
					token: "TestToken"
				})
				.then(res => {
					const { code, point } = res.data;
					if (code === 1) {
						this.userPoint = point;
					} else if (code === 2003) {
						this.$toast("token过期");
					}
				})
				.catch(() => {
					this.$toast("网络繁忙，请稍后再试");
				});
		},
		lottery(type, callback) {
			if (this.isRolling) {
				return;
			}
			this.isRolling = true;
			const lottery = "http://149.129.216.140/lottery/user/lottery";
			this.$axios
				.post(lottery, {
					token: "TestToken",
					language_id: this.userLang.id,
					lottery_type: type
				})
				.then(res => {
					callback && callback(res);
				});
		},
		/**
		 * 抽奖事件
		 */
		drawHandler(type, item, $event) {
			let targetId = parseInt($event.target.id);
			if (targetId !== 888 && targetId !== 666 && targetId !== 777) {
				//调用查看奖品详情事件
				this.popDetail(item);
				return;
			}
			// this.roll(6);
			this.lottery(type, res => {
				this.isRolling = false;
				const { lottery_record_list } = res.data;
				this.resultPrizeList = lottery_record_list;
				let finalIndex;
				this.initialList.forEach(item => {
					if (
						item.prize_type ===
						lottery_record_list[0].prize.prize_type
					) {
						finalIndex = item.name;
					}
				});
				//调用动画
				this.roll(finalIndex, () => {
					// 弹出结果
					this.prizePop(type);
				});
			});
		},
		/**
		 * 抽奖动画
		 * stopIndex 停止位置
		 */
		roll(stopIndex, callback) {
			let cycle = 2;
			let speed = 60;
			let times = 1;
			let currIndex = 1;
			let timer = null;
			let ani = function() {
				let currdom = document.querySelector(`.ani${currIndex}`);
				let alldom = document.querySelectorAll("tbody .tditem");
				alldom.forEach(function(item) {
					item.classList.remove("active");
				});
				currdom.classList.add("active");

				currIndex = (currIndex + 1) % 8;
				if (currIndex === 0) {
					currIndex = 8;
					times++;
				}
				if (times > cycle) {
					//减速
					speed += 1 * (times - cycle);
				}
				if (times > cycle + 3) {
					if (currIndex === stopIndex + 1) {
						clearTimeout(timer);
						//闪两下
						currdom.classList.add("active-ani");
						// 抽奖结果展示
						callback && callback();
						return;
					}
				}
				timer = setTimeout(ani, speed);
			};
			timer = setTimeout(ani, speed);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.lottery-wrapper {
	background: #6829c8;
	width: 96%;
	padding: 20px 0;
	box-sizing: border-box;
	border-radius: 10px;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	.lottery-wrap {
		width: rem(652px);
	}
	.title {
		display: inline-block;
		color: #fff;
		width: rem(306px);
		height: rem(86px);
		background: url(#{$base}/img_mypoints.png) 0 0 no-repeat/100%;
		text-align: center;
		line-height: rem(86px);
		padding-left: rem(14px);
		box-sizing: border-box;
	}
	.lottery-cnt {
		position: relative;
		z-index: 1;
		left: 50%;
		transform: translateX(-50%);
		width: rem(652px);
		height: rem(562px);
		background: url(#{$base}/bg_awards_borderlights.png) center center
			no-repeat/100%;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	table tbody {
		display: inline-block;
		width: 87%;

		transform: translate(-0.5%, -0.5%);
	}
	table tbody tr {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		&:nth-child(2) {
			margin: rem(6px) 0;
		}
	}
	table tbody tr td {
		width: rem(184px);
		height: rem(152px);
		background: url(#{$base}/img_awardbg.png) 0 0 no-repeat/100%;
		border-radius: 12px;
		box-sizing: border-box;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	table tbody tr td img {
		display: inline-block;
		width: rem(160px);
		height: rem(120px);
	}
	.btn-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: rem(30px);
		.tip {
			background: #ff1200;
			border-radius: 4px;
			color: #fff;
			padding: 0 10px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			// width: rem(250px);
			font-size: 12px;
			span:first-child {
				text-align: left;
			}
			span:last-child {
				text-align: center;
			}
		}
		.btn {
			display: inline-block;
			width: rem(300px);
			height: rem(154px);
			margin-top: rem(10px);
		}
		.draw-five {
			.btn {
				background: url(#{$base}/img_btn_draw5.png) 0 0 no-repeat/100%;
			}
		}
		.draw-ten {
			.btn {
				background: url(#{$base}/img_btn_draw10.png) 0 0 no-repeat/100%;
			}
		}
	}
	.active {
		border: 3px solid #4cf3e1;
	}
}
.active-ani {
	animation: myfirst 1s;
	-moz-animation: myfirst 1s; /* Firefox */
	-webkit-animation: myfirst 1s; /* Safari 和 Chrome */
	-o-animation: myfirst 1s; /* Opera */
}
@keyframes myfirst {
	0% {
		border: 3px solid #4cf3e1;
	}
	50% {
		border: none;
	}
	100% {
		border: 3px solid #4cf3e1;
	}
}

@-moz-keyframes myfirst /* Firefox */ {
	0% {
		border: 3px solid #4cf3e1;
	}
	50% {
		border: none;
	}
	100% {
		border: 3px solid #4cf3e1;
	}
}

@-webkit-keyframes myfirst /* Safari 和 Chrome */ {
	0% {
		border: 3px solid #4cf3e1;
	}
	50% {
		border: none;
	}
	100% {
		border: 3px solid #4cf3e1;
	}
}

@-o-keyframes myfirst /* Opera */ {
	0% {
		border: 3px solid #4cf3e1;
	}
	50% {
		border: none;
	}
	100% {
		border: 3px solid #4cf3e1;
	}
}
</style>
