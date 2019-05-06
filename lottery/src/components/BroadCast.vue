<template>
    <div class="scroll-wrap">
        <scroll :data="recordList" :class-option="optionLeft" class="cnt-wrap">
            <ul class="scroll-cnt" id="scroll">
                <li class="cnt" v-for="(item, index) in recordList" :key="index">{{item}}</li>
            </ul>
        </scroll>
    </div>
</template>Ï
<script>
    import scroll from "vue-seamless-scroll";
    import constants from "../constants/Global.vue"
    import utils from "../vendors/util.js"

    export default {
        name: "broad-cast",
        data() {
            return {
                recordList: []
            };
        },
        props: {
            isMap: {
                type: Boolean,
                default: false
            },
            userLang: {
                type: Object,
                // eslint-disable-next-line
                default: {} //默认中文
            }
        },
        computed: {
            optionLeft() {
                return {
                    direction: 2,
                    limitMoveNum: 5,
                    waitTime: 0,
                    switchDelay: 0,
                    step: 0.5
                };
            }
        },
        watch: {
            // eslint-disable-next-line
            userLang(newVal, oldVal) {
                if (newVal) {
                    this.fetchDrawRecord();
                }
            }
        },
        mounted() {
        },
        methods: {
            /**
             * 拉取获奖记录
             */
            fetchDrawRecord() {
                const hisRecord = constants.serverSrc + "/lottery/common/getAwardHistory";

                this.$axios
                    .post(hisRecord, {
                        language_id: this.userLang.id
                    })
                    .then(res => {
                        /**
                         * 状态码
                         * 1     ：成功
                         * 其他  ：调用失败
                         */
                        const {code, lottery_record} = res.data;
                        if (code === 1) {
                            this.recordList = lottery_record;
                        } else {
                            this.$toast(utils.getResponseCodeMsg(code,this.userLang));
                        }
                    })
                    .catch(() => {
                        this.$toast(this.userLang.requestFail);
                    });
            }
        },
        components: {
            scroll
        }
    };
</script>
<style lang="scss" scoped>
    @import "../assets/scss/common.scss";

    .scroll-wrap {
        position: absolute;
        top: 2.5%;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: rem(52px);
        color: #fff;
        text-align: center;
        padding: 0 10px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.6);
    }

    .cnt-wrap {
        width: r(230px);
        height: 22px;
        overflow-x: hidden;
    }

    .scroll-cnt {
        white-space: nowrap;

        li {
            display: inline-block;
            height: 22px;
            line-height: 22px;
            margin-right: 40px;
        }
    }
</style>