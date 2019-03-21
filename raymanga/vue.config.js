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
      host: 'localhost',
      port: 8888,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': "X-Requested-With",
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  }