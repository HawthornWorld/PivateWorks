<template>
	<div class="order-wrap">
		<div class="header">
			<div class="header-cnt">
				<div class="img">
					<img :src="prize.detail_url" alt="detail" class="prize-img">
				</div>
				<ul class="txt">
					<li class="title">{{prize.title}}</li>
					<li class="desc">{{prize.detail}}</li>
					<li class="price">{{prize.price}}</li>
					<del>{{prize.original_price}}</del>
				</ul>
			</div>
		</div>
		<div class="addr-wrap">
			<div class="item-wrap">
				<span class="item-title">您的名字</span>
				<input type="text" class="item-input" v-model="usrname">
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">您的电话</span>
				<input type="number" class="item-input" v-model="phone">
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">国家</span>
				<div class="item-input-btn" @click="pickCountry">
					<span>{{countryName}}</span>
					<span class="input-tri"></span>
				</div>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">省/直辖市</span>
				<div class="item-input-btn" @click="pickProv">
					<span>{{provName}}</span>
					<span class="input-tri"></span>
				</div>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">市</span>
				<div class="item-input-btn" @click="pickCity">
					<span>{{cityName}}</span>
					<span class="input-tri"></span>
				</div>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">区</span>
				<div class="item-input-btn" @click="pickDis">
					<span>{{disName}}</span>
					<span class="input-tri"></span>
				</div>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">详细地址</span>
				<textarea type="text" class="item-input-area" v-model="detailAddr"></textarea>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">快递费用及时间</span>
				<div type="text" class="item-input-btn">{{this.freight}}</div>
			</div>
			<div class="tip-wrap">
				<span class="tip-item">1.如果您的地址不在选择范围内,请直接联系客服;</span>
				<span class="tip-item">2.快递费用将在奖品送达时由快递公司向您收取;</span>
				<span class="tip-item">3.我们会在您提交联系方式之后2天内发货,请耐心等待;</span>
			</div>
			<div class="btn-wrap">
				<button class="submit-btn" @click="submit">提交</button>
			</div>
			<div class="special-tip" style="margin-bottom: 10px">
				<div class="sp-tip-title">特别说明</div>
				<span class="sp-tip-item">1.若因地址不详,联系号码错误,停机等个人原因导致快递多次配送不成功,延期退回后我们将不再进行二次发货,非质量问题不退换,敬请谅解;</span>
				<span class="sp-tip-item">2.如有疑问可直接联系客服;</span>
			</div>
			<div class="app-img-wrap">
				<img :src="appLogoImg" alt="logo">
			</div>
		</div>
		<mt-actionsheet :actions="countries" v-model="showCountry"></mt-actionsheet>
		<mt-actionsheet :actions="proviences" v-model="showProv"></mt-actionsheet>
		<mt-actionsheet :actions="cities" v-model="showCity"></mt-actionsheet>
		<mt-actionsheet :actions="districts" v-model="showDistrict"></mt-actionsheet>
	</div>
</template>

<script>
import Vue from "vue";
import { Actionsheet } from "mint-ui";
import logo from "../assets/images/paymangaapp.png";
import cdata from "./mock.js";

Vue.component(Actionsheet.name, Actionsheet);
//查询运费
const restapi = "http://149.129.216.140/lottery/common/getFreight";
//提交
const submitapi = "http://149.129.216.140/lottery/user/receiveAward";
export default {
	name: "order",
	data() {
		return {
			appLogoImg: logo,
			showCountry: false,
			showProv: false,
			showCity: false,
			showDistrict: false,
			countries: [],
			proviences: [],
			cities: [],
			districts: [],
			countryID: -1,
			provienceIndex: -1,
			cityIndex: -1,
			districtIndex: -1,
			countryName: "",
			provName: "",
			cityName: "",
			disName: "",
			provID: -1,
			cityID: -1,
			disID: -1,
			freight: 0,
			phone: "",
			usrname: "",
			detailAddr: ""
		};
	},
	computed: {
		orderCode() {
			return this.$route.params.ordercode;
		},
		prize() {
			return this.$route.params.prize;
		}
	},
	watch: {
		countryID(val, old) {
			if (old !== -1) {
				this.provName = "";
				this.cityName = "";
				this.disName = "";
			}
		},
		provienceIndex(val, old) {
			var self = this;
			if (old !== -1) {
				this.cityIndex = -1;
				this.districtIndex = -1;
				this.cityName = "";
				this.disName = "";
			}
			if (val) {
				let prov = [];
				if (cdata.prov[val]) {
					cdata.prov[val].forEach(p => {
						p.method = function() {
							self.cityIndex = p.child;
							self.provName = p.name;
							self.provID = p.id;
						};
						prov.push(p);
					});
				}
				this.proviences = prov;
			}
		},
		cityIndex(val, old) {
			var self = this;
			if (old !== -1) {
				this.districtIndex = -1;
				this.cityName = "";
				this.disName = "";
			}
			if (val) {
				let city = [];
				if (cdata.city[val]) {
					cdata.city[val].forEach(c => {
						c.method = function() {
							self.districtIndex = c.child;
							self.cityName = c.name;
							self.cityID = c.id;
							//根据国家，省份，城市查询运费
							self.$axios
								.post(restapi, {
									country_id: self.countryID,
									province_id: self.provID,
									city_id: self.cityID
								})
								.then(res => {
									if (res && res.data) {
										this.freight = res.data.freight;
									}
								});
						};
						city.push(c);
					});
				}
				this.cities = city;
			}
		},
		districtIndex(val, old) {
			var self = this;
			if (old !== -1) {
				this.disName = "";
			}
			if (val) {
				let dis = [];
				if (cdata.district[val]) {
					cdata.district[val].forEach(c => {
						c.method = function() {
							self.disName = c.name;
							self.disID = c.id;
						};
						dis.push(c);
					});
				}
				this.districts = dis;
			}
		}
	},
	mounted() {
		var self = this;
		cdata.country.forEach(c => {
			c.method = function() {
				self.countryID = c.id;
				self.countryName = c.name;
				self.provienceIndex = c.child;
			};
			this.countries.push(c);
		});
	},
	methods: {
		pickCountry() {
			this.showCountry = true;
		},
		pickProv() {
			this.showProv = true;
		},
		pickCity() {
			this.showCity = true;
		},
		pickDis() {
			this.showDistrict = true;
		},
		submit() {
			if (!this.phone) {
				this.$toast("请输入手机号");
				return;
			}
			// order_code && prizedto 从上个页面传过来
			this.$axios
				.post(submitapi, {
					token: "TestToken",
					order_code: "19040155661881918875192",
					phone: this.phone,
					country_id: this.countryID || 0,
					province_id: this.provID || 0,
					city_id: this.cityID || 0,
					detail: this.detailAddr || "",
					name: this.usrname || ""
				})
				.then(res => {
					console.log(this.$route);
					if (res && res.code && res.code === 1) {
						this.$toast("success");
						this.$route.go(-1);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.order-wrap {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	.header {
		width: 100%;
		padding: rem(44px);
		box-sizing: border-box;
		border-bottom: 1px solid #c9c9c9;
		.img {
			display: inline-block;
			width: rem(300px);
			height: rem(300px);
			margin-right: rem(16px);
			background: #000;
		}
		.txt {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			// justify-content: space-between;

			width: rem(310px);
			padding: rem(8px) 0;
			float: right;
			.title {
				font-size: rem(30px);
				color: #000;
			}
			.desc {
				color: #7a7a7a;
				font-size: rem(22px);
				margin: rem(8px) 0;
			}
			.price {
				color: #fe0000;
				font-size: rem(40px);
			}
		}
	}
}
.addr-wrap {
	display: flex;
	width: 100%;
	height: auto;
	flex-direction: column;
	padding-top: 15px;
	box-sizing: border-box;
}
.item-wrap {
	display: flex;
	flex-direction: column;
}
.item-title {
	padding-left: 22px;
	font-family: AdobeHeitiStd-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #000000;
}
.item-input {
	margin-left: 0.275rem;
	margin-right: 0.25rem; /* 25/100 */
	height: 39px;
	background: #e7e7e7;
	border-radius: 3px;
	margin-top: 6px;
	padding-left: 5px;
	box-sizing: border-box;
	font-family: AdobeHeitiStd-Regular;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2px;
	color: #000000;
	text-align: center;
}
.item-input-btn {
	margin-left: 0.275rem;
	margin-right: 0.25rem; /* 25/100 */
	height: 39px;
	background: #e7e7e7;
	border-radius: 3px;
	margin-top: 6px;
	padding-left: 15px;
	padding-right: 15px;
	box-sizing: border-box;
	font-family: AdobeHeitiStd-Regular;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2px;
	color: #000000;
	text-align: center;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.mt9 {
	margin-top: 9px;
}
.tip-wrap {
	width: 100%;
	padding: 0 0.47rem /* 47/100 */ 37px 0.37rem /* 37/100 */;
	box-sizing: border-box;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	font-family: AdobeHeitiStd-Regular;
	font-size: 11px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #7a7a7a;
}
.btn-wrap {
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
.submit-btn {
	width: 1.3rem /* 130/100 */;
	height: 39px;
	background: #ff6666;
	border-radius: 20px;
	font-family: AdobeHeitiStd-Regular;
	font-size: 18px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #f3e4e4;
}
.special-tip {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 18px;
}
.sp-tip-title {
	padding-left: 0.225rem /* 22.5/100 */;
	font-family: AdobeHeitiStd-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #000000;
	margin-bottom: 6px;
}
.sp-tip-item {
	padding-left: 0.37rem /* 37/100 */;
	padding-right: 0.29rem /* 29/100 */;
	font-family: AdobeHeitiStd-Regular;
	font-size: 11px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #7a7a7a;
}
.app-img-wrap {
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
}
.app-img-wrap > img {
	max-width: 1.62rem /* 162/100 */;
}
.prize-img {
	width: rem(300px);
	height: rem(300px);
	max-width: rem(300px);
}
.input-tri {
	width: 0;
	height: 0;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-top: 7px solid rgba(0, 0, 0, 0.4);
}
.item-input-area {
	margin-left: 0.275rem;
	margin-right: 0.25rem; /* 25/100 */
	height: 80px;
	background: #e7e7e7;
	border-radius: 3px;
	margin-top: 6px;
	padding-left: 5px;
	box-sizing: border-box;
	font-family: AdobeHeitiStd-Regular;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2px;
	color: #000000;
	outline: none;
	resize: none;
	border: none;
}
</style>
