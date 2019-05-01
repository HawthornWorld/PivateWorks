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

const util = {
	getQuery
};

export default util;
