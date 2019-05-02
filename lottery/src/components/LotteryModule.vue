<template>
	<div class="lottery-wrapper">
		<div class="lottery-wrap">
			<div class="title"></div>
			<table class="lottery-cnt">
				<tbody>
					<tr v-for="(row,idx) in prizeTypeList">
						<td v-for="(item,idx) in row">
							<img
							 :src="item"
							 alt="img"
							>
						</td>
					</tr>
				</tbody>
			</table>
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
const BASE_URL = "../assets/images";
export default {
	name: "lottery",
	data() {
		return {
			prizeTypeList: [
				[jifen1, quan1, shiti1],
				[shiti2, draw1, shiti3],
				[vip, youhuiquan, zuanshi]
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
	methods: {}
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

		transform: translate(-0.5%,-0.5%)
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
}
</style>
