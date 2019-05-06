<template>
    <div class="list-wrapper">
        <div class="nav-wrap">
            <div class="title">{{userLang.prizeHistory}}</div>
        </div>
        <div class="contend-wrap" v-infinite-scroll="loadMore" infinite-scroll-distance="10">
            <div class="contend-item-wrap" v-for="(item, index) in itemList" :key="index">
                <div class="item-img-wrap">
                    <img :src="`http://${item.prize.url}`" alt="img" class="item-img">
                </div>
                <div class="item-txt-wrap">
                    <span class="txt-big">{{item.prize.title}}</span>
                    <span class="txt-small">{{userLang.prizeCreateTime}}{{formatTime(new Date(item.create_time), "yyyy-MM-dd hh:mm:ss")}}</span>
                </div>
                <div class="item-stat-btn" @click="go2order(item,$event)">
                    <span :class="`item-stat ${btnStyle(item)}`">{{btnMap(item)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import {InfiniteScroll} from "mint-ui";
    import utils from "../vendors/util.js"
    import lang from "../vendors/lang.js";
    import constants from "../constants/Global.vue"

    Vue.use(InfiniteScroll);

    export default {
        name: "list",
        data() {
            return {
                token: utils.getQuery("token"),
                lang: utils.getQuery("lang"),
                itemList: [],
                loading: false,
                page: 0,
                userLang: {}
            };
        },
        mounted() {
            this.getData(this.page);
            this.userLang = lang[this.lang];
        },
        computed: {
        },
        methods: {
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
            },
            loadMore() {
                this.getData(this.page++);
            },
            getData(page) {
                const restapi =
                    constants.serverSrc + "/lottery/user/getLotteryRecord";
                this.$axios
                    .post(restapi, {
                        token: this.token,
                        page: page
                    })
                    .then(res => {
                        if (res && res.data && res.data.code === 1) {
                            let dataList = res.data.lottery_record;
                            dataList.forEach(element => {
                                //虚拟奖品
                                this.itemList.push(element);
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
    @import "../assets/scss/common.scss";

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
        height: 70px;
        padding: 0 1rem /* 200/100 */
    ;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .title {
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

    .nav-item-wrap {
        height: 100%;
        width: 0.7rem /* 70/100 */
    ;
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
        padding: 10px 0.3rem /* 30/100 */
        0 0.3rem;
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
        width: 1.65rem /* 165/100 */
    ;
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
