const webpack = require("webpack")
const { join } = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let webpackConfig = {
  mode: "development",
  context: join(__dirname,"./lib/client/"),
  entry: {
    index: "./layout/login.js"
  },
  output: {
    filename: "[name].js",
    path: join(__dirname,"./lib/client/"),
    publicPath: '/lib/client/dist/',
  },
  module:{
    rules:[
      {
        test: /\.vue$/,
        use:[{
          loader: 'vue-loader'
        }]
      },
      {
        test: /\.js$/,
        use: [{
          loader: "babel-loader"
        }]
        
      },
      {
        test: /\.fn\.pug$/,
        // 函数形态的pug template, 可以传入数据构建
        use: ['pug-loader']
      },
      {
        test: /\.pug$/,
        exclude: /\.fn\.pug$/,
        oneOf: [
          // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          }
        ]
      },

    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    // 资源生成位置
    publicPath: '/lib/client/dist/',
    // 生成路径
    filename: '[name]_[chunkhash].js',
    port: 8384,
    inline: false,
    historyApiFallback: false,
    hot: false,
    compress: false,
    overlay: false,
    stats: {
      entrypoints: true,
      modules: false,
      colors: true
    }
  }
}
// webpack(webpackConfig)
module.exports = webpackConfig