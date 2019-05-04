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
		<div class="contend-wrap" v-infinite-scroll="loadMore" infinite-scroll-distance="10">
			<div class="contend-item-wrap" v-for="(item, index) in focusList" :key="index">
				<div class="item-img-wrap">
					<img :src="'http://'+item.prize.url" alt="img" class="item-img">
				</div>
				<div class="item-txt-wrap">
					<span class="txt-big">{{item.prize.title}}</span>
					<span class="txt-small">领奖时间{{formatTime(new Date(item.create_time), "yyyy-MM-dd hh:mm:ss")}}</span>
				</div>
				<div class="item-stat-btn" @click="go2order(item,$event)">
					<span :class="`item-stat ${btnStyle(item.status)}`">{{btnMap(item.status)}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import { InfiniteScroll } from "mint-ui";

Vue.use(InfiniteScroll);
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
			getList: [],
			notGetList: [],
			focusTab: BTNS.do,
			loading: false,
			page: 1
		};
	},
	mounted() {
		this.getData(1);
	},
	computed: {
		focusList() {
			return this.focusTab === BTNS.do ? this.getList : this.notGetList;
		},
		tabStyle1() {
			return {
				active: this.focusTab === BTNS.undo
			};
		},
		tabStyle2() {
			return {
				active: this.focusTab === BTNS.do
			};
		}
	},
	methods: {
		switchList(id, events) {
			events.preventDefault();
			this.focusTab = id === BTNS.do ? BTNS.do : BTNS.undo;
		},
		formatTime(dataObj, fmt) {
			var o = {
				"M+": dataObj.getMonth() + 1, //月份
				"d+": dataObj.getDate(), //日
				"h+": dataObj.getHours(), //小时
				"m+": dataObj.getMinutes(), //分
				"s+": dataObj.getSeconds(), //秒
				"q+": Math.floor((dataObj.getMonth() + 3) / 3), //季度
				S: dataObj.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(
					RegExp.$1,
					(dataObj.getFullYear() + "").substr(4 - RegExp.$1.length)
				);
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(
						RegExp.$1,
						RegExp.$1.length == 1
							? o[k]
							: ("00" + o[k]).substr(("" + o[k]).length)
					);
			return fmt;
		},
		btnMap(stat) {
			let list = [
				"已领取",
				"待填写信息",
				"等待发货",
				"运输中",
				"已签收",
				"已拒签",
				"未使用",
				"已使用"
			];
			return list[stat - 1];
		},
		btnStyle(stat) {
			let list = [
				"get",
				"tbd",
				"notsend",
				"trans",
				"hasreceive",
				"refuse",
				"notuse",
				"used"
			];
			return list[stat - 1];
		},
		go2order(item, $event) {
			$event.preventDefault();
			//实物
			if (item.prize.prize_type === 3) {
				//需要填信息
				if (item.status === 2) {
					this.$router.push({
						name: "order",
						params: {
							ordercode: item.order_code,
							prize: item.prize,
							status: item.status
						}
					});
				}
				if (
					item.status === 3 ||
					item.status === 4 ||
					item.status === 5 ||
					item.status === 6
				) {
					this.$router.push({
						name: "detail",
						params: {
							ordercode: item.order_code,
							prize: item.prize,
							status: item.status
						}
					});
				}
			}
			//优惠券详情
			if (item.prize.prize_type === 4) {
				this.$router.push({
					name: "coupondetail",
					params: {
						ordercode: item.order_code,
						prize: item.prize,
						status: item.status
					}
				});
			}
			//话费详情
			if (item.prize.prize_type === 2) {
				this.$router.push({
					name: "phonedetail",
					params: {
						ordercode: item.order_code,
						prize: item.prize,
						status: item.status
					}
				});
			}
		},
		loadMore() {
			this.getData(this.page++);
		},
		getData(page) {
			const restapi =
				"http://149.129.216.140/lottery/user/getLotteryRecord";
			this.$axios
				.post(restapi, {
					token: "TestToken",
					page: page
				})
				.then(res => {
					if (res && res.data && res.data.code === 1) {
						//未领取：实物未填写信息
						//已领取：虚拟奖品，实物填写信息
						let dataList = res.data.lottery_record;
						dataList.forEach(element => {
							//虚拟奖品
							if (
								element.prize &&
								(element.prize.prize_type === 1 ||
									element.prize.prize_type === 4)
							) {
								this.getList.push(element);
							}
							//实物奖品
							if (
								element.prize &&
								(element.prize.prize_type === 2 ||
									element.prize.prize_type === 3)
							) {
								//待填写信息，运输中，待发货
								if (
									element.status === 2 ||
									element.status === 3 ||
									element.status === 4
								) {
									this.notGetList.push(element);
								} else {
									this.getList.push(element);
								}
							}
						});
					}
				});
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
	overflow-y: auto;
	overflow-x: hidden;
}
.contend-item-wrap {
	width: 100%;
	height: 62px;
	min-height: 62px;
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
.item-img {
	max-width: 100%;
}
.item-stat.get,
.item-stat.hasreceive,
.item-stat.used,
.item-stat.notused {
	background: #803ce6;
}
.item-stat.tbd,
.item-stat.notsend {
	background: #d72ae6;
}
.item-stat.trans {
	background: #deb32f;
}
.item-stat.refuse {
	background: #000;
}
</style>
