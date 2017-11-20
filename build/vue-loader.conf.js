var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: [
        "> 1%",
        "last 2 versions",
        "ie >= 9"
    ]
    }),
    require('cssnano')({
      preset: 'default',
  }),
     // 处理flex浏览器兼容性
     require('postcss-flexibility'),
     // 处理css中rgba颜色代码
     require('postcss-color-rgba-fallback'),
     // 处理css中opacity的IE兼容性。
     require('postcss-opacity')
  ]
}
