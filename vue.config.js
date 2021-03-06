const path = require('path')

module.exports = {
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  configureWebpack: {
    // externals: {
    //   // AMap: 'AMap', // 高德地图配置
    //   T: 'T' // 天地图
    //   // BMap: 'BMap', // 百度地图配置
    // }
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    }
  },
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 生产环境
  //     config.mode = 'production'
  //   } else {
  //     // 开发环境
  //     config.mode = 'development'
  //   }
  // },
  // webpack-dev-server 相关配置
  devServer: {
    // host: 'localhost',
    // port: 8080,
    open: true,
    hot: true,
    // http 代理配置
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {}
}
