<template>
    <div class="prize-wrapper" v-show="isPrizePop">
        <div class="mask" @click="closeMask"></div>
        <template v-if="resultData[0]">
            <div class="cnt">
                <div class="single-draw" v-if="isSingleDraw">
                    <img :src="`http://${resultData[0].prize.detail_url}`" alt="">
                    <div class="t">{{userLang.congratulations}}</div>
                    <div class="prize-title">{{resultData[0].prize.title}}</div>
                    <div class="btn-wrap">
                        <span v-if="prizeType===1" @click="closePop">{{userLang.confirmPrize}}</span>
                        <span v-if="prizeType===3" @click="refusePrize(resultData[0])">{{userLang.refusePrize}}</span>
                        <span v-if="prizeType===2 || prizeType===3  || prizeType===4" @click="go2order(resultData[0])">{{userLang.recivePrize}}</span>
                    </div>
                    <div class="refuse" v-if="prizeType===3">
                        {{userLang.refusePrizeNotice}}
                    </div>
                </div>
                <div class="repeat-draw" v-if="isRepeatDraw">
                    <div class="title">{{userLang.prizeHistory}}</div>
                    <div class="content-wrap">
                        <div class="content-item-wrap" v-for="(item, index) in resultData" :key="index">
                            <div class="item-img-wrap">
                                <img :src="'http://'+item.prize.url" alt="img" class="item-img">
                            </div>
                            <div class="item-txt-wrap">
                                <span class="txt-big">{{item.prize.title}}</span>
                                <span class="txt-small">{{userLang.prizeCreateTime}}{{formatTime(new Date(item.create_time), "yyyy-MM-dd hh:mm:ss")}}</span>
                            </div>
                            <div class="item-stat-btn" @click="go2order(item, $event)">
                                <span :class="`item-stat ${btnStyle(item)}`">{{btnMap(item)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    // const BASE_URL = '../assets/images'
    import constants from "../constants/Global.vue"
    import utils from "../vendors/util.js"

    export default {
        name: "prize-pop",
        data() {
            return {
                // imgsrv: this.resultData
                // 	? `http://${resultData[0].prize.detail_url}`
                // 	: ""
                prizeType: this.resultData[0]
                    ? this.resultData[0].prize.prize_type
                    : null
            };
        },
        props: {
            isPrizePop: {
                type: Boolean,
                default: false
            },
            isSingleDraw: {
                type: Boolean,
                default: false
            },
            isRepeatDraw: {
                type: Boolean,
                default: false
            },
            resultData: {
                type: Array,
                default: () => []
            },
            userLang: {
                type: Object,
                // eslint-disable-next-line
                default: {} //默认中文
            },
            token : {
                type: String,
                // eslint-disable-next-line
                default: ""
            }
        },
        mounted() {
            //动态设置fixed元素的宽度
            let dom = document.getElementsByClassName("share-wrapper")[0];
            dom.style.width = document.body.clientWidth + "px";
        },
        methods: {
            /**
             * 拒绝奖品
             */
            closePop() {
                // 关掉弹窗
                this.$emit("prizePop");
            },
            refusePrize(item) {
                // 关掉弹窗
                this.$emit("prizePop");
                // 传递拒签奖品
                const refuse = constants.serverSrc+"/lottery/user/refuse";
                this.$axios
                    .post(refuse, {
                        token: this.token,
                        prize_id: item.prize.prize_id,
                        order_code: item.order_code
                    })
                    .then(res => {
                        /**
                         * 状态码
                         * 1     ：成功
                         * 其他  ：调用失败
                         */
                        const {code} = res.data;
                        if (code === 1) {
                            this.$toast(this.userLang.refusePrizeSuccess);
                        }else{
                            this.$toast(utils.getResponseCodeMsg(code,this.userLang));
                        }
                    })
                    .catch(() => {
                        this.$toast(this.userLang.requestFail);
                    });
            },
            closeMask() {
                this.$emit("prizePop");
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
            btnMap(item) {
                return utils.getPrizeStatus(item.prize.prize_type, item.status, this.userLang);
            },
            btnStyle(item) {
                return utils.getPrizeStatusStyle(item.status);
            },
            go2order(item, $event) {
                $event.preventDefault();
                //实物
                utils.go2Detail(this.$router,item,this.lang,this.token);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "../assets/scss/common.scss";

    .prize-wrapper {
        position: fixed;
        z-index: 999;
        top: 0;
        width: 100%;
        height: 100%;
        // margin: 0 auto;
        text-align: left;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    .cnt {
        position: absolute;
        z-index: 1;
        top: 0;
        width: 100%;
        // background: #efeff4;
        // border-radius: 0 0 8px 8px;
        // overflow: hidden;
        // animation: spin 0.8s ease;
    }

    .title {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: rem(296px);
        height: rem(92px);
        background: url(#{$base}/img_title_myawards.png) center center no-repeat/100%;
        color: #fff;
        text-align: center;
        line-height: rem(92px);
        padding-left: rem(30px);
        box-sizing: border-box;
        font-size: rem(14px);
    }

    .single-draw {
        width: 100%;
        height: rem(868px);
        background: url(#{$base}/bg_getaward.png) 0 0 no-repeat/100%;
        color: #fff;

        display: flex;
        flex-direction: column;
        align-items: center;

        transform: translateY(8%);

        img {
            width: rem(300px);
            height: rem(300px);
            margin: 32.5% 0 8%;
        }

        .t {
            margin: 2% 0;
            font-size: rem(36px);
        }

        .prize-title {
            font-size: rem(30px);
            width: rem(400px);
            white-space: wrap;
            text-align: left;
        }

        .btn-wrap {
            position: absolute;
            bottom: -20px;

            span {
                display: inline-block;

                &:first-child {
                    width: rem(234px);
                    height: rem(62px);
                    line-height: rem(62px);
                    background: url(#{$base}/btn_refuse.png) 0 0 no-repeat/100%;
                    margin-right: rem(34px);
                    font-size: rem(28px);
                    text-align: center;
                }

                &:nth-child(1),
                &:nth-child(2) {
                    width: rem(296px);
                    height: rem(79px);
                    line-height: rem(79px);
                    background: url(#{$base}/btn_recieve.png) 0 0 no-repeat/100%;
                    font-size: rem(32px);
                    text-align: center;
                }
            }
        }

        .refuse {
            position: absolute;
            bottom: -50px;
            font-size: rem(28px);
        }
    }

    .repeat-draw {
        background: #000;
        padding: rem(40px) rem(30px);
        box-sizing: border-box;
        background: #6829c8;
        width: 100%;
        max-height: rem(1000px);
        overflow-y: auto;
    }

    .content-wrap {
        width: 100%;
        height: 100%;
        // padding: 10px 0.3rem /* 30/100 */ 0 0.3rem;
        display: flex;
        flex-direction: column;
    }

    .content-item-wrap {
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
        width: 1.65rem /* 165/100 */
    ;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .txt-big {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #f3e4e4;
    }

    .txt-small {
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
        background-color: #803ce6;
        border-radius: 13px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-img {
        max-width: 100%;
    }

    @keyframes spin {
        0% {
            transform: translateY(-40px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
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