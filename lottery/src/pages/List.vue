<template>
	<div class="list-wrapper">
		<div class="nav-wrap">
			<div class="nav-item-wrap" @click="switchList(101, $event)">
				<span class="nav-item-txt" :class="tabStyle1">未领取</span>
			</div>
			<div class="nav-item-wrap" @click="switchList(100, $event)">
				<span class="nav-item-txt" :class="tabStyle2">已领取</span>
			</div>
		</div>
		<div class="contend-wrap">
			<div class="contend-item-wrap" v-for="(item, index) in focusList" :key="index">
				<div class="item-img-wrap"></div>
				<div class="item-txt-wrap">
					<span class="txt-big">{{item.name}}</span>
					<span class="txt-small">{{item.time}}</span>
				</div>
				<div class="item-stat-btn">
					<span class="item-stat">{{item.stat}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const STATS = {
	//已领取
	done: "已领取",
	//已签收
	get: "已签收",
	//拒收
	refuse: "已拒收",
	//运输中
	transport: "运输中",
	//待发货
	unsend: "待发货"
};
const BTNS = {
	//已领取
	do: 100,
	//未领取
	undo: 101
};
export default {
	name: "list",
	data() {
		return {
			getList: [
				{
					img: "",
					name: "HELLOKITTY美妆小工具套装x1",
					time: "有效期至二零一九",
					stat: STATS.done
				},
				{
					img: "",
					name: "HELLOKITTY美妆小工具套装x1",
					time: "有效期至二零一九",
					stat: STATS.done
				},
				{
					img: "",
					name: "HELLOKITTY美妆小工具套装x1",
					time: "有效期至二零一九",
					stat: STATS.done
				},
				{
					img: "",
					name: "HELLOKITTY美妆小工具套装x1",
					time: "有效期至二零一九",
					stat: STATS.done
				}
			],
			notGetList: [],
			focusTab: BTNS.do
		};
	},
	computed: {
		focusList: function() {
			return this.focusTab === BTNS.do ? this.getList : this.notGetList;
		},
		tabStyle1: function() {
			return {
				active: this.focusTab === BTNS.undo
			};
		},
		tabStyle2: function() {
			return {
				active: this.focusTab === BTNS.do
			};
		}
	},
	methods: {
		switchList: function(id, events) {
			events.preventDefault();
			this.focusTab = id === BTNS.do ? BTNS.do : BTNS.undo;
		}
	},
	components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list-wrapper {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	background: #6829c8;
	display: flex;
	flex-direction: column;
}
.nav-wrap {
	width: 100%;
	height: 44px;
	padding: 0 1rem /* 200/100 */;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.nav-item-wrap {
	height: 100%;
	width: 0.7rem /* 70/100 */;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.nav-item-txt {
	font-size: 12px;
	color: #fffcb2;
	opacity: 0.5;
}
.nav-item-txt.active {
	opacity: 1;
	border-bottom: 3px solid #ff356b;
    margin-top: 3px;
}
.contend-wrap {
	width: 100%;
	height: 100%;
	padding: 10px 0.3rem /* 30/100 */ 0 0.3rem;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.contend-item-wrap {
	width: 100%;
	height: 62px;
	margin: 10px 0 0 0;
	border-bottom: 1px dashed #fff;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.item-img-wrap {
	width: 48px;
	height: 36px;
	border-radius: 3px;
	background: #fffcb2;
	margin: 0 9px;
}
.item-txt-wrap {
	width: 1.65rem /* 165/100 */;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.txt-big {
	font-family: AdobeHeitiStd-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #f3e4e4;
}
.txt-small {
	font-family: AdobeHeitiStd-Regular;
	font-size: 9px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #ff9422;
}
.item-stat-btn {
	height: 100%;
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.item-stat {
	width: 70px;
	height: 26px;
	background-color: #000000;
	border-radius: 13px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
