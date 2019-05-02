module.exports = {
	css: {
		extract: false
	},
	productionSourceMap: false,
	// chainWebpack: config => {
	//   config.plugin("html").tap(args => {
	//     args[0].minify = false;
	//     return args;
	//   });
	// },

	devServer: {
		disableHostCheck: true,
		host: "localhost",
		port: 8888,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With",
			"Access-Control-Allow-Headers": "Content-Type"
		},
		https: false,
		proxy: {
		  '/getBookInfo': {
		    target:
		      'http://149.129.216.140/lottery/user/getLotteryRecord',
		    ws: true,
		    changeOrigin: true,
		    pathRewrite: {
		      '^/getBookInfo': '/'
		    }
		  },
		//   '/getChapterDetail': {
		//     target:
		//       'http://previewapi.raymangaapp.com/previewapi/v1/common/getChapterDetail',
		//     ws: true,
		//     changeOrigin: true,
		//     pathRewrite: {
		//       '^/getChapterDetail': '/'
		//     }
		//   },
		//   '/markBook': {
		//     target:
		//       'http://previewapi.raymangaapp.com/previewapi/v1/common/markBook',
		//     ws: true,
		//     changeOrigin: true,
		//     pathRewrite: {
		//       '^/markBook': '/'
		//     }
		//   },
		//   '/uploadEvent': {
		//     target:
		//       'http://previewapi.raymangaapp.com/previewapi/v1/common/uploadEvent',
		//     ws: true,
		//     changeOrigin: true,
		//     pathRewrite: {
		//       '^/uploadEvent': '/'
		//     }
		//   }
		}
	}
};
