<template>
	<div class="panel-wrapper">
		<span class="ad">AD</span>
		<span class="cnt">{{userLang.ad}}</span>
		<span class="down" @click="jumpToDown">DOWNLOAD</span>
	</div>
</template>

<script>
import util from "../vendors/util.js";
export default {
	name: "panel",
	data() {
		return {
			bookId: util.getQuery("bookid")
		};
	},
	mounted() {
		let dom = document.getElementsByClassName("panel-wrapper")[0];
		dom.style.width = document.body.clientWidth + "px";
	},
	props: {
		userLang: {
			type: Object,
			default: {}
		}
	},
	methods: {
		jumpToDown() {
			location.href = `https://play.google.com/store/apps/details?id=com.hijoy.raymanga&referrer=utm_source%3Dtry_reader%26utm_campaign%3D${
				this.bookId
			}`;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "../assets/scss/common.scss";
.panel-wrapper {
	position: fixed;
	bottom: 0;
	// width: rem(1080px);
	height: rem(140px);
	background: #f4f4f4;
	border-top: 1px solid #b2b2b2;
	font-size: rem(36px);
	padding: 0 rem(36px);
	box-sizing: border-box;

	display: flex;
	flex-direction: row;
	align-items: center;
	span {
		display: inline-block;
	}
}
.ad {
	color: #fff;
	background: #ff9600;
	padding: rem(12px) rem(30px);
	border-radius: 2px;
	box-sizing: border-box;
	margin-right: rem(14px);
}
.cnt {
	color: #4d4d4d;
}
.down {
	color: #fff;
	background: #ff6666;
	padding: rem(16px) rem(40px);
	border-radius: rem(50px);
	box-sizing: border-box;
	margin-left: auto;
}
</style>
