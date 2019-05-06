<template>
	<div class="rule-wrap">
		<p class="title"><span>{{userLang.noticeTitle}}</span></p>
		<ul class="list">
			<li><span>1</span><span>{{userLang.noticeLine1}}</span></li>
			<li><span>2</span><span>{{userLang.noticeLine2}}</span></li>
			<li><span>3</span><span>{{userLang.noticeLine3}}</span></li>
			<li><span>4</span><span>{{userLang.noticeLine4}}</span></li>
			<li><span>5</span><span>{{userLang.noticeLine5}}</span></li>
			<li><span>6</span><span>{{userLang.noticeLine6}}</span></li>
			<li><span>7</span><span>{{userLang.noticeLine7}}</span></li>
		</ul>
	</div>
</template>Ï
<script>
export default {
	name: "rule",
	data() {
		return {};
	},
	props: {
		userLang: {
			type: Object,
			// eslint-disable-next-line
			default: {} //默认中文
		}
	},
	mounted() {},
	methods: {}
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.rule-wrap {
	position: relative;
	width: 100%;
	background: #fff;
	font-size: rem(28px);
	color: #593e3a;
	margin-top: 56px;
	padding-top: 30px;

	display: flex;
	flex-direction: column;
	align-items: center;
	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		display: inline-block;
		width: rem(704px);
		height: rem(12px);
		background: url(#{$base}/img_border_wavestyle_2.png) center center
			no-repeat/100%;
	}
	.title {
		font-size: rem(34px);
		span {
			color: #ff356b;
		}
	}
	.list {
		padding: rem(40px);
		box-sizing: border-box;
		li {
			margin-bottom: 8px;
			span:first-child {
				display: inline-block;
				width: rem(30px);
				height: rem(30px);
				line-height: rem(30px);
				text-align: center;
				border-radius: 4px;
				background: #ff356b;
				color: #fff;
				margin-right: 6px;
			}
		}
	}
}
</style>