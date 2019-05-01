<template>
	<div class="scroll-wrap">
		<div class="title-wrapper">
			<i class="laba"></i>
			<span class="title">恭喜</span>
		</div>
		<scroll
		 :data="recordList"
		 :class-option="optionLeft"
		 class="cnt-wrap"
		>
			<ul
			 class="scroll-cnt"
			 id="scroll"
			>
				<li
				 class="cnt"
				 v-for="(item, index) in recordList"
				 :key="index"
				><span>{{item.customerName}} </span>获<span> {{item.prizeName}}</span></li>
			</ul>
		</scroll>
	</div>
</template>Ï
<script>
import scroll from "vue-seamless-scroll";
// import scrolldata from "@/vendors/scrolldata.js";

export default {
	name: "scroll-note",
	data() {
		return {
			recordList: scrolldata
		};
	},
	props: {
		isMap: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		optionLeft() {
			return {
				direction: 2,
				limitMoveNum: 5,
				waitTime: 0,
				switchDelay: 0,
				step: 0.5
			};
		}
	},
	mounted() {
		// this.fetchDrawRecord();
	},
	methods: {
		/**
		 * 拉取获奖记录
		 */
		// fetchDrawRecord() {
			
		// 		.model("16393")("queryPrizeDrawRecord", {
		// 			sceneId: this.sceneCode,
		// 			// 用存在state的主人openid来拉取记录，不用链接上的owneropenid，因为从客人页面进入主人页面，链接上owneropenid不是自己的
		// 			openId: this.openId,
		// 			drawPrizeStatus: 2
		// 		})
		// 		.then(res => {
		// 			if (res.resultCode === 0) {
		// 				this.recordList = scrolldata;
		// 				let list = res.data;
		// 				if (!list.length) {
		// 					this.recordList = scrolldata;
		// 				} else if (list.length && list.length < 20) {
		// 					this.recordList = list.concat(scrolldata);
		// 				} else {
		// 					this.recordList = list;
		// 				}
		// 			}
		// 		})
		// 		.catch(err => {});
		// }
	},
	components: {
		// scroll
	}
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/common.scss";

.scroll-wrap {
	position: relative;
	left: 50%;
	transform: transLateX(-50%);
	display: flex;
	flex-direction: row;
	align-items: center;
	width: r(360px);
	height: r(39px);
	color: #91f5ff;
	text-align: center;
	padding: 0 r(40px);
	box-sizing: border-box;
	// background: url(#{$base}/bg-tip.png) center center no-repeat/100%;

	background-image: linear-gradient(-270deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.70) 50%, rgba(255, 255, 255, 0.00) 100%);
}

.bg-tip-map {
	// background: url(#{$base}/bg-tip-map.png) center center no-repeat/100%;
}

.title-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-right: 10px;
}

.laba {
	display: inline-block;
	width: 12px;
	height: 12px;
	// background: url("#{$base}/i-tip.png") center center no-repeat/100%;
	margin-right: 4px;
}

.cnt-wrap {
	width: r(230px);
	height: 22px;
	overflow-x: hidden;
}

.scroll-cnt {
	white-space: nowrap;

	li {
		display: inline-block;
		height: 22px;
		line-height: 22px;
		margin-right: 8px;
	}

	span {
		color: #e76480;
	}
}
</style>