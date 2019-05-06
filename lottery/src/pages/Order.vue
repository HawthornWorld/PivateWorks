<template>
	<div class="order-wrap">
		<div class="header">
			<div class="header-cnt">
				<div class="img">
					<img :src="`http://${this.lotteryRecord.prize.detail_url}`" alt="detail" class="prize-img">
				</div>
				<ul class="txt">
					<li class="title">{{this.lotteryRecord.prize.title}}</li>
					<li class="desc">{{this.lotteryRecord.prize.detail}}</li>
					<li class="price">{{this.price}}</li>
					<del>{{this.original_price}}</del>
				</ul>
			</div>
		</div>
		<div class="addr-wrap">
			<div class="item-wrap">
				<span class="item-title">{{this.userLang.expressName}}</span>
				<input type="text" class="item-input" v-model="usrname">
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">{{this.userLang.expressPhone}}</span>
				<input type="number" class="item-input" v-model="phone">
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">{{this.userLang.expressCountry}}</span>
				<div class="item-input-btn" @click="pickCountry">
					<span>{{countryName}}</span>
					<span class="input-tri"></span>
				</div>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">{{this.userLang.expressState}}</span>
				<div class="item-input-btn" @click="pickProv">
					<span>{{provName}}</span>
					<span class="input-tri"></span>
				</div>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">{{this.userLang.expressCity}}</span>
				<div class="item-input-btn" @click="pickCity">
					<span>{{cityName}}</span>
					<span class="input-tri"></span>
				</div>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">{{this.userLang.expressDistrict}}</span>
				<div class="item-input-btn" @click="pickDis">
					<span>{{disName}}</span>
					<span class="input-tri"></span>
				</div>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">{{this.userLang.expressAddress}}</span>
				<textarea type="text" class="item-input-area" v-model="detailAddr"></textarea>
			</div>
			<div class="item-wrap mt9">
				<span class="item-title">{{this.userLang.expressCost}}</span>
				<div type="text" class="item-input-btn">{{this.freight}}</div>
			</div>
			<div class="tip-wrap">
				<span class="tip-item">{{this.userLang.expressNoticeLine1}}</span>
				<span class="tip-item">{{this.userLang.expressNoticeLine2}}</span>
				<span class="tip-item">{{this.userLang.expressNoticeLine3}}</span>
			</div>
			<div class="btn-wrap">
				<button class="submit-btn" @click="submit">{{this.userLang.expressSubmit}}</button>
			</div>
			<div class="special-tip" style="margin-bottom: 10px">
				<div class="sp-tip-title">{{this.userLang.receiveAwardNoticeTitle}}</div>
				<span class="sp-tip-item">{{this.userLang.receiveAwardNoticeLine1}}</span>
				<span class="sp-tip-item">{{this.userLang.receiveAwardNoticeLine2}}</span>
			</div>
			<div class="app-img-wrap">
				<img @click="gotoFacebook" :src="appLogoImg" alt="logo">
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
import cdata from "../vendors/mock.js";
import constants from "../constants/Global.vue";
import lang from "../vendors/lang.js";
import utils from "../vendors/util.js";

Vue.component(Actionsheet.name, Actionsheet);
//查询运费
const restapi = constants.serverSrc + "/lottery/common/getFreight";
//提交
const submitapi = constants.serverSrc + "/lottery/user/receiveAward";
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
			detailAddr: "",
			lotteryRecord: this.$route.params.lotteryRecord,
			lang: this.$route.params.lang,
			token: this.$route.params.token,
			price: "",
			original_price: "",
			userLang: {}
		};
	},
	computed: {},
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
		this.userLang = lang[this.lang];
		this.price = utils.formatNumber(
			this.lotteryRecord.prize.price / 100.0,
			2,
			this.userLang.currencySeparator,
			this.userLang.currencyPoint
		);
		this.original_price = utils.formatNumber(
			this.lotteryRecord.prize.original_price / 100.0,
			2,
			this.userLang.currencySeparator,
			this.userLang.currencyPoint
		);
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
				this.$toast(this.userLang.noPhoneNum);
				return;
			}
			// order_code && prizedto 从上个页面传过来
			this.$axios
				.post(submitapi, {
					token: this.token,
					order_code: this.lotteryRecord.order_code,
					phone: this.phone,
					country_id: this.countryID || 0,
					province_id: this.provID || 0,
					city_id: this.cityID || 0,
					detail: this.detailAddr || "",
					name: this.usrname || ""
				})
				.then(res => {
					if (res && res.data && res.data.code === 1) {
						this.$toast(this.userLang.expressSubmitSuccess);
						this.$route.go(-1);
					} else {
						this.$toast(
							utils.getResponseCodeMsg(
								res.data.code,
								this.userLang
							)
						);
					}
				});
		},
		gotoFacebook() {
			window.open(this.userLang.facebookUrl, "_blank");
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
	min-height: 39px;
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
