<template>
	<div class="rule-wrap">
		<p class="title"><span>活动</span>说明</p>
		<ul class="list">
			<li><span>1</span><span>抽奖获得的钻石,阅读券,VIP即时生效;</span></li>
			<li><span>2</span><span>实物类奖品自中奖时间起7天内可领取;逾期则视为自动放弃领奖;</span></li>
			<li><span>3</span><span>实物类奖品将在您提交正确联系信息后10个工作日内安排发货,请耐心等待;</span></li>
			<li><span>4</span><span>若因地址不正确,联系号码错误,停机等个人原因导致快递多次配送部成功,我们将视为自动放弃领奖;</span></li>
			<li><span>5</span><span>奖品非质量问题不作退还,敬请谅解;</span></li>
			<li><span>6</span><span>若因个人原因拒绝签收奖品,我们将保留通过法律途径获取损失的权利;</span></li>
			<li><span>7</span><span>通过非法途径获得奖品的,主办方有权不提供奖品;</span></li>
		</ul>
	</div>
</template>Ï
<script>
export default {
	name: "rule",
	data() {
		return {};
	},
	props: {},
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