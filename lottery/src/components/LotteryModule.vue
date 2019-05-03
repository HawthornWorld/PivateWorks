<template>
	<div class="lottery-wrapper">
		<div class="lottery-wrap">
			<div class="title">{{userPoint}}</div>
			<table class="lottery-cnt">
				<tbody>
					<tr
					 v-for="(row,idx) in prizeList"
					 :key="idx"
					>
						<td
						 v-for="(item,idx) in row"
						 :class="`prize${item.prize_id}`"
						 :key="idx"
						 :id="item.prize_id"
						>
							<img
							 v-if="item.prize_id !== 888"
							 :src="`http://${item.url}`"
							 alt=""
							>
							<img
							 v-if="item.prize_id === 888"
							 :src="item.url"
							 alt=""
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
					<div class="btn"></div>
				</li>
				<li class="draw-ten">
					<div class="tip">
						<span>Tingkat kemenangan</span>
						<span>+150%</span>
					</div>
					<div class="btn"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import draw1 from "../assets/images/img_btn_draw1.png";
import lang from "@/vendors/lang.js";

export default {
	name: "lottery",
	data() {
		return {
			prizeList: [],
			userPoint: ''
		};
	},
	props: {
		// userLang: {
		// 	type: Object,
		// 	default: {}
		// }
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
						let list = prize_list;
						let row1 = prize_list.slice(0, 3);
						let row2 = prize_list.slice(2, 4);
						row2.splice(1, 0, { url: draw1, prize_id: 888 });
						let row3 = prize_list.slice(4, 7);
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
		/**
		 * 抽奖事件
		 */
		drawHandler() {
			const lottery = "http://149.129.216.140/lottery/user/lottery";
			this.$axios
				.post(lottery, {
					token: "token1",
					language_id: this.userLang.id,
					lottery_type: 1
				})
				.then(res => {
					const { code, lottery_record } = res.data;
					if (code === 1) {
						this.recordList = lottery_record;
					} else {
						this.$toast("获取数据失败");
					}
				})
				.catch(() => {
					this.$toast("网络繁忙，请稍后再试");
				});
		},
		/**
		 * 跑马灯动画
		 */
		rollAnimate() {}
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
		width: 88%;

		transform: translate(-0.5%, -0.5%);
	}
	table tbody tr {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		&:nth-child(2) {
			margin: rem(2px) 0;
		}
	}
	table tbody tr td {
		width: rem(184px);
		height: rem(152px);
		background: url(#{$base}/img_awardbg.png) 0 0 no-repeat/100%;

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
}
</style>
