<template>
	<div class="star-wrapper">
		<div class="title">{{userLang.starTitle}}</div>
		<div class="desc">{{userLang.starSubTitle}}</div>
		<div class="star">
			<ul class="list">
				<li v-for="(item,idx) in starObj" v-bind:key="idx">
					<span class="bg" :data-score="item.score" @click="starHandle"></span>
					<span class="txt">{{item.txt}}</span>
				</li>
			</ul>
		</div>
		<div class="text">
			<textarea
				type="text"
				rows="4"
				:placeholder="placeHolder"
				v-model.trim="comment"
				@keyup.stop="getInput"
			></textarea>
		</div>
		<div class="submit" @click="submitHandle">{{userLang.submitBtn}}</div>
	</div>
</template>

<script>
import util from "../vendors/util.js";

const BASE_URL = "../assets/images";
export default {
	name: "star",
	data() {
		return {
			chapterId: util.getQuery("chapterid"),
			userScore: 0,
			comment: "",
			cookieId: "",
			placeHolder: this.userLang.starCnt,
			starObj: [
				{
					txt: this.userLang.starC,
					score: 1
				},
				{
					txt: this.userLang.starB,
					score: 2
				},
				{
					txt: this.userLang.starA,
					score: 3
				}
			]
		};
	},
	props: {
		userLang: {
			type: Object,
			default: {}
		}
	},
	mounted() {
		//判断cookie中是否有uuid，若无，则写入
		this.cookieId = this.getCookie("uuid");
		if (!this.cookieId) {
			this.cookieId = this.generateUid();
			this.setCookie("uuid", this.cookieId, 365);
		}
	},
	methods: {
		starHandle(e) {
			//star时高亮星星
			let doms = document.getElementsByClassName("bg");
			Array.prototype.slice.call(doms).forEach(item => {
				item.classList.remove("light");
			});
			e.target.classList.add("light");

			//获取用户分数
			this.userScore = parseInt(e.target.dataset.score);
		},
		/**
		 * 获取输入框内容
		 */
		getInput(e) {
			this.comment = e.target.value;
		},
		/**
		 * 获取cookie标识
		 */
		getCookie(name) {
			let arr,
				reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if ((arr = document.cookie.match(reg))) {
				return unescape(arr[2]);
			} else {
				return "";
			}
		},
		setCookie(name, value, expiredays) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + expiredays);
			document.cookie =
				name +
				"=" +
				escape(value) +
				(expiredays == null ? "" : ";expires=" + exdate.toGMTString());
		},
		/**
		 * 随机生成无重复字符串
		 */
		generateUid() {
			let s = () => {
				return (((1 + Math.random()) * 0x10000) | 0)
					.toString(16)
					.substring(1);
			};
			return (
				s() +
				s() +
				"-" +
				s() +
				"-" +
				s() +
				"-" +
				s() +
				"-" +
				s() +
				s() +
				s()
			);
		},
		/**
		 * 提交评分和评论
		 */
		submitHandle() {
			// 点击提交,一起提交star && comment,star必选，comment可选
			if (!this.userScore) {
				//提示star必选
				this.$toast("请为本章节打分");
				return;
			}
			//提交
			this.submitStar();
		},
		/**
		 * 提交评分和评论
		 */
		submitStar() {
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
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.star-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #5a5a5a;
	padding: 0 rem(128px);
	box-sizing: border-box;

	.title {
		font-size: rem(48px);
		font-weight: bold;
	}
	.desc {
		font-size: rem(36px);
		margin: rem(50px) 0 rem(100px);
	}
	.star {
		.list {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		li {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 90px;
			.bg {
				display: inline-block;
				width: rem(72px);
				height: rem(72px);
				background-image: url(#{$base}/ic_reader_navigation_favorite.png);
				background-size: 100%;
				background-position: center center;
				background-repeat: no-repeat;
			}
			.bg.light {
				background-image: url(#{$base}/ic_favorite_highlight.png);
			}
			.txt {
				color: #5a5a5a;
				font-size: rem(40px);
				font-weight: bold;
			}
		}
	}
	.text {
		width: 100%;
		margin: rem(80px) 0 rem(42px);
		textarea {
			width: 100%;
			height: rem(278px);
			color: #7e7e7e;
			background: #e8e8e8;
			border: none;
			outline: none;
			resize: none;
			padding: rem(20px) rem(28px);
		}
	}
	.submit {
		width: rem(336px);
		height: rem(110px);
		line-height: rem(110px);
		color: #fff;
		font-size: rem(36px);
		background: #ff6666;
		border-radius: rem(110px);
		text-align: center;
	}
}
</style>
