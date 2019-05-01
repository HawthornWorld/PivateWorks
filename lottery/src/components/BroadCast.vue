<template>
	<div class="scroll-wrap">
		<scroll
		 :data="recordList"
		 :class-option="optionLeft"
		 class="cnt-wrap">
			<ul
			 class="scroll-cnt"
			 id="scroll">
				<li
				 class="cnt"
				 v-for="(item, index) in recordList"
				 :key="index"
				><span>{{item.name}} </span>获<span> {{item.prize}}</span></li>
			</ul>
		</scroll>
	</div>
</template>Ï
<script>
import scroll from "vue-seamless-scroll";
import broadInfo from "@/vendors/broadcast.js";

export default {
	name: "broad-cast",
	data() {
		return {
			recordList: broadInfo
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
	// 	this.fetchDrawRecord();
    // },
    },
	methods: {
		/**
		 * 拉取获奖记录
		 */
		fetchDrawRecord() {
                const markBook =
				"//previewapi.raymangaapp.com/previewapi/v1/common/markBook";

                this.$axios
				.post(markBook, {
					cookie_id: this.cookieId,
					chapter_id: parseInt(this.chapterId),
					score: this.userScore,
					suggestion: this.comment || ""
				})
				.then(res => {
					/**
					 * 状态码
					 * 1     ：成功
					 * 2000  ：常规错误
					 * 2001  ：参数错误
					 * 2002  ：数据库连接错误
					 */
					const { code } = res.data;
					if (code === 1) {
						this.$toast("提交成功");
					} else if (code === 2000) {
						this.$toast("常规错误(2000)");
					} else if (code === 2001) {
						this.$toast("参数错误(2001)");
					} else if (code === 2002) {
						this.$toast("数据库连接错误(2002)");
					}
				})
				.catch(error => {
					this.$toast("网络繁忙，请稍后再试");
				});
		}
	},
	components: {
		scroll
	}
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/common.scss";

.scroll-wrap {
    position: absolute;
    top: 2.5%;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: rem(52px);
	color: #fff;
    text-align: center;
    padding: 0 10px;
	box-sizing: border-box;
    background: rgba(0,0,0,.6);
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
		margin-right: 40px;
	}

}
</style>