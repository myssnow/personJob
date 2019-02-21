/*
 *
 @files 开发环境下支持动态编译
 */
// webpack编译文件之后的监听服务与端口
// process.env.NODE_ENV = 'development'
const webpack  = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require( '../webpack.config.js')

console.log(2222)
const compiler = webpack(webpackConfig);
const port = webpackConfig.devServer.port
console.log(webpackConfig.devServer)
const server = new WebpackDevServer(compiler, webpackConfig.devServer);
server.listen(port,'127.0.0.1', () => {
	console.log(`Starting server on http://127.0.0.1:${port}`);
});
