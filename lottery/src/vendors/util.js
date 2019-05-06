/**
 * 取url参数
 * @param {String} name url参数
 * @return {String} url值
 */
const getQuery = (name = "") => {
    const reg = new RegExp("(?:^|&)" + name + "=([^&]*)(?:&|$)", "i");
    /**
     * 报销凭证回跳地址的参数需要解码后再取
     * 但个人认为非标准方法
     */
    const ret = decodeURIComponent(location.search)
        .substr(1)
        .match(reg);
    if (ret) return decodeURIComponent(ret[1]);
    return "";
};

const getQueryString = () => {
    return location.search;
}

const getResponseCodeMsg = (code = 1, userLang) => {
    if (code == 1) {
        return userLang.success;
    } else if (code == 2000) {
        return userLang.normalError;
    } else if (code == 2001) {
        return userLang.argError;
    } else if (code == 2002) {
        return userLang.connectionError;
    } else if (code == 2003) {
        return userLang.tokenError;
    } else if (code == 2004) {
        return userLang.pointNotEnough;
    } else if (code == 2005) {
        return userLang.noExpress;
    } else {
        return userLang.responseFail + ", code:" + code;
    }
};

const getPrizeStatus = (prizeType = 1, prizeStatus = 1, userLang) => {
    switch (prizeType) {
        case 1:
            return userLang.prize1Status[prizeStatus - 1];
        case 2:
            return userLang.prize2Status[prizeStatus - 1];
        case 3:
            return userLang.prize3Status[prizeStatus - 1];
        case 4:
            return userLang.prize4Status[prizeStatus - 1];
    }
    return "";
};

const getPrizeStatusStyle = ( prizeStatus = 1) => {
    let list = [
        "tbd",
        "trans",
        "get",
        "refuse"
    ];
    return list[prizeStatus - 1];
};

const go2Detail = (router,item,lang,token) => {
    switch (item.prize.prize_type) {
        case 1:
            return;
        case 2:
            router.push({
                name: "phonedetail",
                params: {
                    lang:lang,
                    token:token,
                    lotteryRecord: item
                }
            });
            return;
        case 3:
            if (item.status === 1) {
                router.push({
                    name: "order",
                    params: {
                        lang:lang,
                        token:token,
                        lotteryRecord: item
                    }
                });
            } else {
                router.push({
                    name: "detail",
                    params: {
                        lang:lang,
                        token:token,
                        lotteryRecord: item
                    }
                });
            }
            return;
        case 4:
            router.push({
                name: "coupondetail",
                params: {
                    lang:lang,
                    token:token,
                    lotteryRecord: item
                }
            });
            return;
    }
    return "";
};

const formatNumber = (num = 0, precision = 0, separator = ',', point = '.') => {
    var parts;
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        num = Number(num);
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        parts = num.split('.');
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
        return parts.join(point);
    }
    return NaN;
};

const util = {
    getQuery,
    getQueryString,
    getResponseCodeMsg,
    formatNumber,
    getPrizeStatus,
    getPrizeStatusStyle,
    go2Detail
};

export default util;
