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
            <div class="deli-stat-wrap">
                <span class="deli-no">NO.{{this.lotteryRecord.order_code}}</span>
                <span class="deli-txt">{{this.statString}}</span>
            </div>
            <div class="item-wrap">
                <span class="item-title">{{this.userLang.expressNumber}}:</span>
                <span type="text" class="item-input">{{express_code}}</span>
            </div>
            <div class="item-wrap mt9">
                <span class="item-title">{{this.userLang.expressAddress}}</span>
                <div type="text" class="item-addr">
                    <span>ming zi</span>
                    <span>7865645273</span>
                    <span>Ampana Kota Badon Kuta Utara</span>
                    <span>babala street NO.123 , A12-402</span>
                </div>
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
    </div>
</template>

<script>
    import logo from "../assets/images/paymangaapp.png";
    import lang from "../vendors/lang.js";
    import utils from "../vendors/util.js"
    import constants from "../constants/Global.vue"

    export default {
        name: "order",
        data() {
            return {
                appLogoImg: logo,
                lotteryRecord: this.$route.params.lotteryRecord,
                lang: this.$route.params.lang,
                token: this.$route.params.token,
                userLang: {},
                statString: "",
                express_code: "",
                price:"",
                original_price:""
            };
        },
        computed: {},
        mounted() {
            this.userLang = lang[this.lang];
            this.statString = utils.getPrizeStatus(this.lotteryRecord.prize.prize_type, this.lotteryRecord.status, this.userLang);
            this.price = utils.formatNumber(this.detailData.price/100.00,2,this.userLang.currencySeparator,this.userLang.currencyPoint);
            this.original_price = utils.formatNumber(this.detailData.original_price/100.00,2,this.userLang.currencySeparator,this.userLang.currencyPoint);
        },
        methods: {
            /**
             * 获取物流详情
             */
            fetchRecordDetail() {
                const recordDetail = constants.serverSrc + "/lottery/user/getRecordDetail";
                this.$axios
                    .post(recordDetail, {
                        token: this.token,
                        order_code: this.lotteryRecord.order_code
                    })
                    .then(res => {
                        /**
                         * 状态码
                         * 1     ：成功
                         * 其他  ：调用失败
                         */
                        const {code} = res;
                        if (code === 1) {
                            this.express_code = res.data.express_code;
                        } else {
                            this.$toast(utils.getResponseCodeMsg(code, this.userLang));
                        }
                    })
                    .catch(() => {
                        this.$toast(this.userLang.requestFail);
                    });
            },
            gotoFacebook() {
                window.open(this.userLang.facebookUrl, '_blank');
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
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: AdobeHeitiStd-Regular;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        color: #0a0a0a;
    }

    .item-addr {
        margin-left: 0.275rem;
        margin-right: 0.25rem; /* 25/100 */
        height: auto;
        background: #e7e7e7;
        border-radius: 3px;
        margin-top: 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: AdobeHeitiStd-Regular;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        color: #0a0a0a;
        padding: 15px 0;
        box-sizing: border-box;
    }

    .mt9 {
        margin-top: 9px;
    }

    .special-tip {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 18px;
    }

    .sp-tip-title {
        padding-left: 0.225rem /* 22.5/100 */
    ;
        font-family: AdobeHeitiStd-Regular;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #000000;
        margin-bottom: 6px;
    }

    .sp-tip-item {
        padding-left: 0.37rem /* 37/100 */
    ;
        padding-right: 0.29rem /* 29/100 */
    ;
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
        max-width: 1.62rem /* 162/100 */
    ;
    }

    .deli-stat-wrap {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
    }

    .deli-stat-wrap > span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .deli-no {
        font-family: AdobeHeitiStd-Regular;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        color: #ff0000;
    }

    .deli-txt {
        font-family: AdobeHeitiStd-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #000000;
        margin-top: 10px;
    }

    .prize-img {
        width: rem(300px);
        height: rem(300px);
        max-width: rem(300px);
    }
</style>
