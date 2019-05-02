<template>
	<div class="lottery-wrapper">
		<div class="lottery-wrap">
			<div class="title"></div>
			<table class="lottery-cnt">
				<tbody>
					<tr v-for="(row,idx) in prizeTypeList" :key="idx">
						<td v-for="(item,idx) in row" :class="item.name" :key="idx">
							<img :src="item.img" alt="img">
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
import jifen1 from "../assets/images/icon_jifen_1.jpg";
import quan1 from "../assets/images/icon_quan_1.jpg";
import shiti1 from "../assets/images/icon_shiti1_1.jpg";
import shiti2 from "../assets/images/icon_shiti2_1.jpg";
import draw1 from "../assets/images/img_btn_draw1.png";
import shiti3 from "../assets/images/icon_shiti3_1.jpg";
import vip from "../assets/images/icon_vip_1.jpg";
import youhuiquan from "../assets/images/icon_youhuiquan_1.jpg";
import zuanshi from "../assets/images/icon_zuanshi_1.jpg";
export default {
	name: "lottery",
	data() {
		return {
			prizeTypeList: [
				[
					{ img: jifen1, name: "prize1" },
					{ img: quan1, name: "prize2" },
					{ img: shiti1, name: "prize3" }
				],
				[
					{ img: shiti2, name: "prize4" },
					{ img: draw1, name: "j_btn_draw" },
					{ img: shiti3, name: "prize5" }
				],
				[
					{ img: vip, name: "prize6" },
					{ img: youhuiquan, name: "prize7" },
					{ img: zuanshi, name: "prize8" }
				]
			]
		};
	},
	props: {
		// userLang: {
		// 	type: Object,
		// 	default: {}
		// }
	},
	mounted() {},
	methods: {
		draw() {},
		roll() {}
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
		width: rem(306px);
		height: rem(86px);
		background: url(#{$base}/img_mypoints.png) 0 0 no-repeat/100%;
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
