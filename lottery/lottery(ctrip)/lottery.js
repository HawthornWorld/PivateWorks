define(['modulebase',
    'UIAlert',
    'mktutil',
    'cCommonStore',
    'cMemberService',
    'text!~Layout.html',
    'text!~Item.html',
    'text!~Prize.html',
    'text!~PrizeItem.html',
    'text!lottery.css',
    'cShell',
    '//pages.c-ctrip.com/amsweb/tools/qrcode.min.js',
    '//pages.c-ctrip.com/amsweb/tools/JsBarcode.code128.min.js'
], function(module, Alert, util, commonStore, memberService, layoutTpl, itemTpl, prizeTpl, prizeItemTpl, myCss, shell, qr, bar) {

    const log = console.log.bind(console)
    const UNION = util.getUnionObj()
    const userStore = commonStore.UserStore.getInstance();
    const isLogin = (() => {
        return userStore && userStore.isLogin()
    })()
    /**
     * 判断是否在微信中(包含微信H5, 微信小程序)
     * @return {Boolean}
     */
    const isInWechat = (() => {
        const ret = !!navigator.userAgent.match(/micromessenger/i);
        return () => {
            return ret;
        }
    })();

    /**
     * 判断是否在微信小程序中
     * @return {Boolean}
     */
    const isInWechatMP = (() => {
        /**
         * 参数platform = wechatmp
         * 判断为微信小程序环境
         */
        const queryJudgeMP = Lizard.P('platform') === 'wechatmp'
        const uaJudgeMP = (isInWechat() && navigator.userAgent.match(/miniprogram/i))        
        return () => {
            return queryJudgeMP || uaJudgeMP || window.__wxjs_environment === 'miniprogram';
        }
    })();    
    const MESSAGE = {
        NOSERIAL: '尚无券码',
        ERROR: '活动繁忙，请稍后再试',
        NOTOKEN: '通过验证后即可参与',
        SCENE_ERROR: {
            '40004': '活动还未开始哦，敬请期待',
            '40005': '您来晚啦，活动已经结束了'
        }
    }
    const CODE = {
        ERROR: -1,
        SUCCESS: 0,
        UNDERSTOCK: 10003,
        UNBOUND_MOBILE: 40007,
        USER_NOT_LOGIN: 40006,
        RULE_CHECK_FAILED: 40011,
        USER_DUPLICATE_JOIN: 40012,
        MOBILE_DUPLICATE_JOIN: 40013,
        CLIENT_DUPLICATE_JOIN: 40014,
        NOT_QULIFIED: 40026,
        DAY_DUPLICATE: 40028,
        WEEK_DUPLICATE: 40029,
        MONTH_DUPLICATE: 40030
    }
    const DEFAULT_CONFIG = {
        "sliderShow": "请按住滑块儿，拖动到最后",
    	
        "cycle": 20, // 最少跳动循环次数
        "speed": 120,
        "btnTxt": "知道了",
        "understock_info": "参与活动的人太多了，请刷新重试",
        "understock_text": "知道了",
        "getPrize_0_info": "好可惜，差一点点就中奖了",
        "getPrize_0_text": "知道了",
        "getPrize_1_info": "恭喜您抽中",
        "getPrize_1_text": "去使用",
        "getPrize_2_info": "恭喜您抽中",
        "getPrize_2_text": "去填写寄送地址",
        "getPrize_3_info": "恭喜您抽中",
        "getPrize_3_text": "去查看",
        "duplicate_info": "您已经参与过了哦",
        "duplicate_text": "知道了",
        "notQulified_info": "不好意思，您不符合参与条件哦",
        "notQulified_text": "知道了",
        "fail_info": "参与活动的人太多了，刷新重试",
        "fail_text": "刷新重试",
        "bindMobile_info": "需要先绑定手机哦",
        "bindMobile_text": "去绑定",
        "needLogin_info": "登录后即可参与",
        "needLogin_text": "去登录",
        "dayDuplicate_info": "今天已经参与过了哦，明天再来吧",
        "weekDuplicate_info": "这周已经参与过了哦，下周再来吧",
        "monthDuplicate_info": "本月已经参与过了哦，下月再来吧"
    }
    const PAGE_CONFIG = {
        // styles
        "chanceBgColor": "",
        "chanceFontColor": "",
        // 模块背景颜色或图片
        "lotteryBgColor": "",
        "lotteryBgImage": "",
        // 九宫格背景颜色或图片
        "tblBgColor": "",
        "tblBgImage": "",
        // 宫格间距
        "tblBorderSpace": "",
        // 宫格背景
        "tblItemShadow": "",
        // 宫格背景色
        "tblItemBgColor": "",
        // 宫格文字颜色
        "tblItemFontColor": "",
        // 抽奖按钮图片
        "centerBtnImage": "",
        // 是否显示我的奖品按钮
        "isPrizeBtn": false,
        "otherStyle": ""
    }
    const ICON_URL = {
        'Coupon': '//pages.c-ctrip.com/activitysetupapp/webresource2/component/lottery/coupon.png',
        'ThirdCoupon': '//pages.c-ctrip.com/activitysetupapp/webresource2/component/lottery/coupon.png',
        'Point': '//pages.c-ctrip.com/activitysetupapp/webresource2/component/lottery/point.png',
        "Holder": '//pic.c-ctrip.com/vacation_v2/h5/group_travel/no_product_pic.png',
    }
    return _.inherit(module, {
        basic() {
            return {
                fat: {
                    SOA_PORT: '13458',
                    ENV: 'fat',
                    aid: 10000,
                    sid: 10000
                },
                pro: {
                    SOA_PORT: '13458',
                    ENV: 'pro',
                    aid: '100319',
                    sid: '1001736'
                }
            }[this.getenv()]
        },
        init() {
            this.data = _.extend({}, PAGE_CONFIG, this.data)
            // 模板样式
            this.template = layoutTpl
            this.style = myCss + this.data.otherStyle

            // 九宫格状态
            this.isRolling = false
            this.currentIdx = 0
            this.sceneCode = this.data.SceneCode || this.data.sceneCode

            // 引入滑块验证
            this.sliderObject = null
            this.sliderToken = null
            this.authType = null

            // 模板数据注入
            this.data.componentId = this.$el[0].id
            this.sign = ''
            this.events = {
                'click .J_draw': _.debounce(this.beforeDraw),
                'click .J_prize': _.debounce(this.togglePrizeList),
                'click .J_link': _.debounce(this.jump),
                'click .J_slide_mask': _.debounce((e) => {
                    e.stopPropagation && e.stopPropagation()
                    this.$('.J_slide_wrap').hide()
                }),
                'click .J_slide_btn': _.debounce((e) => {
                    e.stopPropagation && e.stopPropagation()
                    if (!this.sliderToken) {
                        Lizard.showMessage(MESSAGE.NOTOKEN)
                        return
                    }
                    this.$('.J_slide_wrap').hide()
                    this.draw()
                }),
                'click .J_back_prize': _.debounce(this.hideCouponCode),
                'click .J_item_prize': _.debounce(this.togglePromotion),
                'click .J_coupon_code': _.debounce(this.showCouponCode)
            }
        },
        awakeSlider() {
            let self = this
            if (this.sliderObject) {
                this.sliderObject.clear() 
                this.initSlider()
            } else {
                if (window.slidingVerification && (typeof window.slidingVerification === 'function')) {
                    this.initSlider()
                } else {
                    this.createSliderEle(() => {
                        self.$('.J_slide_wrap').show()
                        self.initSlider()
                    })
                }
            }
        },
        initSlider() {
            this.$('.J_slide_wrap').show();
            const _id = `lty_slider_${this.data.componentId}`;
            const _containerId = `lty_container_${this.data.componentId}`;
            this.sliderObject = new slidingVerification({
                id: _id,
                appId: '100008627',
                containerId: _containerId,
                width: '100%',
                height: '40px',
                chooseOpt: { type: "pop", position: 'fixed' },
                businessSite: 'sms_activity_h5',
                resultHandler: (e) => {
                    this.sliderToken = e.token
                },
                stateChange: function(state) { // ~2.3.0,~2.4.0, ~2.5.0中添加
                    if (state == 0) {
                        log('slide show')
                    }
                }
            })
        },
        createSliderEle(callback) {
            const getEnv = () => {
                const host = location.host
                if (host.match(/localhost|127\.0|\.fat\d*\.qa\.nt\.ctripcorp\.com|ctriptravel\.com/i)) {
                    return 'fat'
                } else if (host.match(/\.uat\.qa\.nt\.ctripcorp\.com/i)) {
                    return 'uat'
                } else {
                    return 'pro'
                }
            };
            let script = document.createElement('script');
            script.src = '//' + {
                fat: 'webresource.fws.qa.nt.ctripcorp.com',
                uat: 'webresource.uat.qa.nt.ctripcorp.com',
                pro: 'webresource.c-ctrip.com'
            }[getEnv()] + '/ares/infosec/captcha/*/default/js/captcha.min.js';

            script.onload = () => {

                callback && callback()
            }
            document.head.appendChild(script);
        },
        onRender() {
            // log('local')
        	let self = this
        	this.fetchStatus(this.sceneCode, res => {
        		if (res.code === 0) {
        			self.renderPrize()
        		} else {
        			self.renderErrorWarn(res.code)
        		}
        	})
        },
        renderPrize() {
        	let self = this
        	/**
        	 * -1 代表抽奖按钮
        	 * 其他表示item在data.prizeInfos中的位置
        	 * 顺时针旋转
        	 * @type {Array}
        	 */
        	let sequence = [
        		[0,  1,  2],
        		[7, -1,  3], 
        		[6,  5,  4]
        	]

			self.fetchPrize(this.sceneCode, res => {
				const { code, prizeInfos, sceneInfo } = res
				if (code === 0) {
					let prizeList = sequence.map(item => {
						return item.map(i => {
							let obj = {},
								imgurl = ''
							if (i !== -1) {
								obj = prizeInfos[i]
								try {
									imgurl = JSON.parse(obj.extension).url
								} catch (e) {
									imgurl = ICON_URL.Holder
								}
								obj.imgurl = imgurl
								obj.idx = i
								obj.className = 'item'
							} else {
								// 开始抽奖按钮
                                let centerBtnImage = this.data.centerBtnImage 
                                    ? this.data.centerBtnImage 
                                    : '//images3.c-ctrip.com/marketing/front/component/luckydraw/draw_btn.png'
								obj = {
									name: '',
									code: '',
									imgurl: centerBtnImage,
									idx: 'draw',
									className: 'J_draw btn-draw'
								}
							}
							return obj	
						})
					})
					// render prize list
					let htmlStr =  _.template(itemTpl, { prizeList })
					self.$('.J_tbl').html(htmlStr)
                    // 获取验证类型 验证模式(0:无验证 1:英文验证 2:中文验证 3:滑块验证)
                    this.authType = sceneInfo.verifyType
				} else {
                    self.errorHandler(code)
				}
			})
        },
        beforeDraw() {
            
            if (!isLogin) {
                this.errorHandler(CODE.USER_NOT_LOGIN)
                return
            }
            if (this.isRolling) {
                return
            }
            if (this.authType == 3) {
                this.awakeSlider()
            } else {
                this.draw()
            }
        },
        draw() {
        	let self = this
        	if (this.isRolling) {
        		return
        	}
        	this.isRolling = true
            Lizard.showLoading()
        	self.join(this.sceneCode, this.sliderToken, res => {
        		const {code, cause, message, prizeInfo = {}} = res
                self.sliderToken = ''
                Lizard.hideLoading()
        		if (code === 0) {
	        		let stopIndex = self.$('.lottery .item').filter(`[data-code='${prizeInfo.code}']`).data('idx')
                    let prizeType = prizeInfo.prizeType
                    let custom = {}
                    try {
                        custom = JSON.parse(prizeInfo.custom || '{}')
                    } catch(e) {
                        log('parse prize custom error:', e)
                    }
                    // 没找到对应奖品
                    if (stopIndex === -1 || isNaN(stopIndex)) {
                        log('sotp index error:', stopIndex)
                        Lizard.showMessage(MESSAGE.ERROR)
                        self.isRolling = false
                        return
                    }
                    if (prizeType === 2) {
                        // 只有实物中奖纪录才能计算出签名
                        self.fetchSign(self.sceneCode, res => {
                            const {code, signature} = res
                            if (code === 0) {
                                self.sign = signature
                            } else {
                                log('签名获取失败:', res)
                            }
                        })
                    }

                    self.roll(Number(stopIndex), () => {
	        			self.isRolling = false
                        self.resultHandler('success', () => {
                            // 实体奖 2
                            if (prizeType === 2) {
                                if (self.sign) {
                                    Lizard.jump(self.getAddress(), { targetModel: 2 })
                                } else {
                                    Lizard.showMessage(MESSAGE.ERROR)
                                }
                            }
                            // 虚拟 1 
                            else if (prizeType === 1) {
                                // TODOS 跳转 去使用链接
                                // this.wakeUpJump(custom.rst_url)
                                if (custom.rst_url) {
                                    Lizard.jump(custom.rst_url, { targetModel: 2 })
                                }
                            }
                            // 其他 3 
                            else if (prizeType === 3) {
                                let authUrl = custom.authUrl || ''
                                let rstUrl = custom.rst_url || ''
                                if (authUrl && util.isInWechat()) {
                                    Lizard.jump(authUrl, { targetModel: 2 })
                                } else {
                                    !!rstUrl && Lizard.jump(custom.rst_url, { targetModel: 2 })
                                }
                            }
                        }, prizeInfo)
	        		})
        		} else {
                    self.isRolling = false
        			self.errorHandler(code, cause)
        		}
        	})
        },
        /**
         * 抽奖动画
         * @param  {Number}   stopIndex 停止位置
         * @param  {Function} callback  [description]
         * @return {[type]}             [description]
         */
        roll(stopIndex, callback) {
            const ACTIVE = 'active'
            const $arr = this.$('.lottery .item'),
                len = $arr.length
            let cur = this.currentIdx,
            	stopIdx = stopIndex % 8,
                times = 0
            let cycle = DEFAULT_CONFIG.cycle,
            	curSpeed = DEFAULT_CONFIG.speed
            let timer = null

            const rollAnimation = () => {
                times++
                cur > len - 2 ? cur = 0 : cur++
                // log('stop:', stopIdx, '  cur:', cur, ' len:', len)
                $arr.removeClass(ACTIVE).filter(`[data-idx="${cur}"]`).addClass(ACTIVE)
                if (times > cycle) {
                    // 减速
                    if (times < cycle + len ) {
                        curSpeed += 20
                    } else if(cur === stopIdx) {
                        // 停止
                        clearTimeout(timer)
                        stopIdx = -1
                        this.currentIdx = cur
                        curSpeed = DEFAULT_CONFIG.speed
                        callback && callback()
                        return
                    }
                }
                timer = setTimeout(rollAnimation, curSpeed)
            }
            timer = setTimeout(rollAnimation, curSpeed)
        },
        /**
         * 打开/隐藏 参与列表
         * @return {[type]} [description]
         */
        togglePrizeList() {
            let self = this
            let $wrap = this.$('.J_prize_list')
            if ($wrap.css('display') == 'none') {
                if (!isLogin) {
                    self.errorHandler(CODE.USER_NOT_LOGIN)
                    return
                }
                if (!self.sign) {
                    self.fetchSign(self.sceneCode, res => {
                        const {code, signature} = res
                        log('sign', res)
                        if (code === 0) {
                            self.sign = signature
                        }
                        renderJoinList()
                    })
                } else {
                    renderJoinList()
                }
                // fetch prize list
                function renderJoinList() {
                    self.fetchJoinList(self.sceneCode, res => {
                        log('join list', res)
                        const {code, recordInfos = []} = res
                        if (code === 0) {
                            let prizeList = recordInfos.map(item => {
                                let obj = {},
                                    ext = {},
                                    cus = {}
                                try {
                                    ext = JSON.parse(item.prizeInfo.extension || '{}')
                                    cus = JSON.parse(item.prizeInfo.custom || '{}')
                                } catch(e) {
                                    log('parse prizeList ext/cus error', e)
                                }
                                let prizeType = item.prizeInfo.prizeType

                                obj.fig = ext.url || ICON_URL.Holder
                                obj.name = item.prizeInfo.name
                                obj.date = util.formatDate(item.joinTime, 'yyyy-mm-dd')
                                obj.btn = cus.btnText || '去查看'
                                obj.url = cus.rst_url || ''
                                obj.appurl = cus.appUrl
                                obj.wxurl = cus.wxUrl
                                if (prizeType === 2) {
                                    obj.btn = '填写地址'
                                    obj.url = self.getAddress()
                                }
                                obj.isBtn = !!obj.url
                                if (prizeType == 1) {
                                    // 隐藏btn，显示更多图标
                                    obj.isMore = true
                                    obj.isBtn = false
                                    obj.promotion =  item.prizeInfo.promotionCode
                                }
                                return obj
                            })
                            let htmlStr = _.template(prizeTpl, { prizeList })
                            self.$('.J_prize_list').html(htmlStr)
                        } else {
                            self.errorHandler(code)
                        }
                    })
                }
            } else {
                self.$('.J_prize_list').html('')
            }
            $wrap.toggle()
        },
        togglePromotion(e) {
            let self = this
            let $el = this.$(e.target)
            let $target = $el.parent().siblings('.J_child_cnt')
            let proCode = $el.data('promotion')
            let url = $el.data('url') || 'https://m.ctrip.com'
            let btnTxt = $el.data('btn')
            const showList = () => {
                let $items = $target.find('.item')
                let h = $items.height() * $items.length
                $el.addClass('carrot-d')
                $target.animate({
                    height: h
                }, 150)
            }
            if ($target.height() > 0) {
                $el.removeClass('carrot-d')
                $target.animate({
                    height: 0
                }, 150)
                return
            }
            if (!!$target.html()) {
                showList()
                return
            }
            if (proCode) {
                this.fetchPromotionList(proCode, (res) => {
                    const {code, childPrizeInfos = []} = res
                    if (code === 0) {
                        let prizeList = childPrizeInfos.map((item) => {
                            let obj = {},
                                ext = {},
                                cus = {},
                                prop = {}
                            try {
                                ext = JSON.parse(item.extension || '{}')
                                cus = JSON.parse(item.custom || '{}')
                                prop = JSON.parse(item.property || '{}')
                            } catch(e) {
                                log('parse prizeList ext/cus error', e)
                            }
                            obj.name = item.name
                            obj.code = item.code
                            obj.proCode = proCode
                            obj.isThirdCoupon = item.type === 'ThirdCoupon'
                            obj.fig = ext.iconSrc || ICON_URL[item.type] || ICON_URL.Holder
                            obj.btn = ext.btnText || btnTxt
                            // 0724 三方券要求按钮直接显示“立即使用”
                            if (obj.isThirdCoupon) {
                                obj.btn = '立即使用'
                                // 外部券码查询码
                                obj.proId = prop.promotionId || ''
                            }

                            obj.url = ext.viewUrl || url
                            obj.wxurl = ext.wxUrl || ''
                            obj.appurl = ext.appUrl || ''
                            return obj
                        })
                        let htmlStr = _.template(prizeItemTpl, { prizeList })
                        $target.html(htmlStr)
                        showList()
                    } else {
                        self.errorHandler(code)
                    }
                })
            }
        },
        initCode(text) {
            if (QRCode) {
                this.$('#qrcode').html('')
                new QRCode(document.getElementById("qrcode"), {
                    text: text,
                    width: 180,
                    height: 180,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                })
            }
            if (JsBarcode) {
                this.$('#barcode').html('')
                JsBarcode(document.getElementById("barcode"), text, {
                    fontSize: 14,
                    width: 2,
                    height: 50,
                    displayValue: false
                })
            }

            this.$('.J_couponcode').html('兑换码：'+text)
        },
        /**
         * 订单页面展开显示详情，
         * 详情内容中展示券码和使用说明，
         * 原按钮查看券码更改文案为立即使用立即使用点击以后，
         * 如有配置跳转链接则直接跳转，如无，则生成优惠券二维码
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        showCouponCode(e) {
            let self = this
            let $el = this.$(e.currentTarget)
            // for temp 临时处理
            let $parent = $el.parents('.J_parent_cnt').find('.J_item_prize')
            // promotion id
            let proCode = $el.data('procode').toString()
            // 奖品id
            let prizeCode = $el.data('code')
            // 三方券码id
            let proId = $el.data('proid')

            log(proId, 'proId')
            if (proId) {
                this.fetchPromotionDetail(proId, res => {
                    if (res && res.resultCode === 0) {
                        let desc = res.promotionDesc || ''
                        let url = res.linkUrl
                        // 如果配置了链接，就没有必要请求code，直接跳转
                        // 没有配置链接，需要获取使用说明
                        if (url) {
                            Lizard.jump(url, { targetModel: 2 })
                        } else {
                            if (desc) {
                                let str = '<div class="tt">使用说明</div>'
                                this.$('.J_coupon_desc')
                                    .hide()
                                    .html(str+ '<div>' + desc.toString().replace(/<\/?script>/g, '') + '</div>')
                                    .show()                                
                            }
                            fetchCodeList()
                        }
                    }
                })
            }

            const fetchCodeList = () => {
                this.fetchAwardList(proCode, (res) => {
                    const { code, prizeRecords = [] } = res
                    // let prizeRecords1 = [{prizeCode: proCode, serialCode: '234234'}]
                    if (code === 0) {
                        let codeArr = prizeRecords.filter((item) => {
                            return item.prizeCode == prizeCode
                        })
                        log(prizeRecords,codeArr, 'codearr')
                        
                        if (codeArr.length) {
                            let serialCode = ''
                            // TODOS 临时处理 // 处理promotion code 重复，三方券一致问题
                            let $records = $(`.J_item_prize[data-promotion=${proCode}]`)
                            log('current index:',$records.index($parent), $parent, $records)
                            // if (codeArr.length > 1 && $records.length > 1) {
                            let idx = $records.index($parent)
                                if(idx > -1 && codeArr[idx]) {
                                    serialCode = codeArr[idx].serialCode
                                } else {
                                    serialCode = codeArr[0].serialCode
                                }
                            // } else {
                            //     serialCode = codeArr[0].serialCode
                            // }
                            if (!serialCode) {
                                Lizard.showMessage(MESSAGE.NOSERIAL)
                                return
                            }
                            self.initCode(serialCode)
                            this.$('.J_qrcode').css({
                                transform: 'translateX(0)'
                            })
                            this.$('.J_prize_cnt').css({
                                overflowY: 'hidden'
                            })
                        } else {
                            Lizard.showMessage(MESSAGE.NOSERIAL)
                        }
                    } else {
                        self.errorHandler(code)
                    }
                })                
            }
        },
        hideCouponCode(e) {
            this.$('.J_qrcode').css({
                transform: 'translateX(100%)'
            })
            this.$('.J_prize_cnt').css({
                overflowY: 'scroll'
            })
        },
        errorHandler(code, cause) {
        	switch(code) {
        		case CODE.UNDERSTOCK:
        			this.resultHandler('understock')
        			break
        		case CODE.UNBOUND_MOBILE:
        			this.resultHandler('bindMobile', () => {
        				if (util.isInCtrip()) {
        				    Lizard.jump('/webapp/myinfo/bindphone?action=set&phone=&from=' + encodeURIComponent(location.href), { targetModel: 4 });
        				} else {
        				    Lizard.jump('https://m.ctrip.com/webapp/h5myinfo/bindphone?action=set&from=' + encodeURIComponent(location.href));
        				}
        			})
        			break
        		case CODE.USER_NOT_LOGIN:
        			this.resultHandler('needLogin', () => {
        				if (userStore && !userStore.isLogin()) {
        				    memberService.memberLogin({
        				        param: "from=" + encodeURIComponent(location.href),
        				        callback: function() {}
        				    })
        				    return
        				}
        			})
        			break
                case CODE.RULE_CHECK_FAILED:
                    if (cause) {
                        let reason = JSON.parse(cause || '[]')
                        if (reason[0] && reason[0].ruleType === 'AppOnly') {
                            this.showResult('去携程app', '此券需要去携程app领券哦', () => {
                                util.activateApp(location.href, true);
                            })
                            return                     
                        }
                    }
                    this.resultHandler('notQulified')
                    break
                case CODE.USER_DUPLICATE_JOIN: //重复领取
                case CODE.CLIENT_DUPLICATE_JOIN:
                case CODE.MOBILE_DUPLICATE_JOIN:
                    this.resultHandler('duplicate')
                    break
    			case CODE.DAY_DUPLICATE: //重复领取
                    this.resultHandler('dayDuplicate')
                    break
    			case CODE.WEEK_DUPLICATE:
                    this.resultHandler('weekDuplicate')
                    break
    			case CODE.MONTH_DUPLICATE:
    				this.resultHandler('MonthDuplicate')
        			break
        		case CODE.NOT_QULIFIED:
        			this.resultHandler('notQulified')
        			break
        		default: 
        			this.resultHandler('fail', () => {
        				Lizard.jump(location.href)
        			})
                    log('fail code:', code)
        	}
        },
        /**
         * 组装modal数据
         * @param  {String}   type     from DEFAULT_CINFIG
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        resultHandler(type, callback = () => {}, prizeInfo = {}) {
        	const isDrawSuccess = type === 'success'
        	const prizeType = prizeInfo.prizeType
        	let typeStr = type
        	if (isDrawSuccess) {
        		typeStr = `getPrize_${prizeType}`
        	}
        	let btnTxt = DEFAULT_CONFIG[`${typeStr}_text`] || DEFAULT_CONFIG['btnTxt']
        	let cntTxt = DEFAULT_CONFIG[`${typeStr}_info`]

        	if (isDrawSuccess && prizeType !== 0 ) {
        		cntTxt = `${cntTxt}<p class="">${prizeInfo.name}</p>`
        	}
        	this.showResult(btnTxt, cntTxt, callback)
        },
        showResult(btnTxt, cntTxt, callback) {
        	this.root.showMessage({
        		datamodel: {
        			btns: [{
        				name: btnTxt,
        				className: 'cui-btns-ok myPopup_ok'
        			}, {
        				name: 'x',
        				className: 'cui-btns-cancel myPopup_cancel'
        			}],
        			content: cntTxt
        		},
                okAction: function() {
                    this.hide() //解决“app里面，跳转不刷新页面，而是新开viewWindow的时候，跳转回来的时候，提示框还在”的情况
                    if (typeof callback == 'function') {
                        callback()
                    }
                },
                cancelAction: function() {
                    this.hide()
                },
                maskToHide: true
        	})
        },
        wakeUpJump(url) {
        	if (!url) {
        		return
        	}
        	try {
        	    if (util.isInCtrip()) {
        	        Lizard.jump(url, { targetModel: 2 });
        	    } else {
        	        util.activateApp(url, true);
        	    }
        	} catch (err) {
        	    log('wakeUpJump error:', err)
        	}
        },
        jump(e) {
            let $target = this.$(e.currentTarget)
            let url = $target.data('url').toString()
            let appurl = $target.data('appurl')
            let wxurl = $target.data('wxurl')
            if (isInWechatMP() && wxurl) {
                url = wxurl
                
                try {
                    shell.weiXinGlobal.ping().done(() => {
                        shell.weiXinGlobal().done(wx => {
                            wx.miniProgram.navigateTo({
                                url: url
                            })
                        })
                    }) 
                } catch(e) {
                    console.log('get wx failed', e)
                }
            } else {
                if (util.isInCtrip() && appurl) {
                    url = appurl
                }
                url = url + (url.indexOf('?') > -1 ? `&` : `?`) + `from=${encodeURIComponent(location.href)}`
                url && Lizard.jump(url, { targetModel: 2 })
            }
            // url && Lizard.jump(url, { targetModel: 2 })
        },
        /**
         * 获取填写获奖信息URL
         * @return {[type]} [description]
         */
        getAddress() {
            if (this.sign) {
                return `${location.origin}/huodong/useraddress/index?allianceid=${this.basic().aid}&sid=${this.basic().sid}&signature=${this.sign}`
            }
            return ''
        },
        renderErrorWarn(code) {
        	const showMessage = MESSAGE.SCENE_ERROR[code] || MESSAGE.ERROR
        	this.$(`#container_${this.data.componentId}`).remove()
        	this.$(`#warn_${this.data.componentId}`).text(`${showMessage} ${code}`).show()
        },
        fetch(api) {
            return this.buildSoa(this.basic().SOA_PORT, api, this.basic().ENV)
        },
        /**
         * 抽中实体奖需要获取签名
         * @param  {String}   sceneCode 场景名
         * @param  {Function} callback  [description]
         * @return {[type]}             [description]
         */
        fetchSign(sceneCode, callback) {
            const fnModel = this.fetch('generateSign')
            fnModel.setParam({
                sceneCode,
                aid: this.basic().aid.toString(),
                sid: this.basic().sid.toString(),
            })
            fnModel.execute(res => {
                callback && callback(res)
            }, e => {
                log('签名获取异常', e)
            })
        },
        /**
         * 查询活动状态
         * @param  {String}   sceneCode 场景名
         * @param  {Function} callback  [description]
         * @return {[type]}             [description]
         */
        fetchStatus(sceneCode, callback) {
            const fnModel = this.fetch('queryStatus')
            fnModel.setParam({
                sceneCode
            })
            fnModel.execute(res => {
                callback && callback(res)
            }, e => {
                Lizard.showMessage(MESSAGE.ERROR)
                log('活动状态异常', e)
            })
        },
        /**
         * 获取九宫格奖品
         * @param  {String}   sceneCode 场景名
         * @param  {Function} callback  [description]
         * @return {Null}               [description]
         */
        fetchPrize(sceneCode, callback) {
            const fnModel = this.fetch('queryPrizeInfo')
            fnModel.setParam({
            	sceneCode
            })
            fnModel.execute(res => {
            	callback && callback(res)
            }, e => {
            	Lizard.showMessage(MESSAGE.ERROR)
            	log('queryPrizeInfo异常', e)
            })
        },
        /**
         * 开始抽奖
         * @param  {String}   sceneCode 场景名
         * @param  {Function} callback  [description]
         * @return {Null}             [description]
         */
        join(sceneCode, token='', callback) {
            const fnModel = this.fetch('join')
        	fnModel.setParam({
        		sceneCode,
                token,
        		allianceInfo: {
        		    aid: UNION.aid.toString(),
        		    ouid: UNION.ouid.toString(),
        		    pushCode: UNION.pushcode.toString(),
        		    sid: UNION.sid.toString()
        		},
        		extension: {
                    "vid": "",
                    "fingerPrint": "",
                    "rmsToken": "",
                    "requestUrl": ""
                }
        	})
        	fnModel.execute(res => {
                log('join:', res)
        		callback && callback(res)
        	}, e => {
        		Lizard.showMessage(MESSAGE.ERROR)
        		log('join异常', e)
        	})
        },
        /**
         * 获取参与记录
         * @param  {String}   sceneCode 场景名
         * @param  {Function} callback  [description]
         * @return {[type]}             [description]
         */
        fetchJoinList(sceneCode, callback) {
            const fnModel = this.fetch('queryJoinList')
            fnModel.setParam({
                sceneCode
            })
            fnModel.execute(res => {
                callback && callback(res)
            }, e => {
                Lizard.showMessage(MESSAGE.ERROR)
                log('queryJoinList异常', e)
            })
        },
        fetchPromotionList(promotionCode, callback) {
            const fnModel = this.fetch('queryPromotionInfo')
            fnModel.setParam({
                promotionCode,
                pageNo: 1,
                pageSize: 10,
                identifier: ''

            })
            fnModel.execute(res => {
                callback && callback(res)
            }, e => {
                Lizard.showMessage(MESSAGE.ERROR)
                log('queryPromotionInfo异常', e)
            })
        },
        fetchAwardList(promotionCode, callback) {
            const fnModel = this.fetch('queryAwardList')
            fnModel.setParam({
                identifier: '',
                promotionCode,
                pageNo: 1,
                pageSize: 10
            })
            fnModel.execute(res => {
                callback && callback(res)
            }, e => {
                Lizard.showMessage(MESSAGE.ERROR)
                log('queryAwardList异常', e)
            })
        },
        /**
         * 获取三方券详情
         * @param  {[type]} promotionCode [description]
         * @return {[type]}               [description]
         */
        fetchPromotionDetail(promotionCode, callback) {
            const fnModel = this.buildSoa('13018', 'getpromotioninfo', this.basic().ENV)
            fnModel.setParam({
                promotionCode
            })
            fnModel.execute(res => {
                callback && callback(res)
            }, e => {
                Lizard.showMessage(MESSAGE.ERROR)
                log('getPromotionInfo异常', e)
            })
        }
    })
})
