
const { parse } = require("url")
const axios = require("axios")

export default function(options){
  const port = options.port
  const pathReg = options.path
  return async function (ctx, next) {
    const parsed = parse(ctx.originalUrl, true)
    // match 匹配资源路径做校验，请求的文件是否是静态资源木目录下面的文件
    const match = parsed.pathname.match(pathReg)
    if (ctx.method === 'GET' && match) {
      //let result: iCompileResult | null | Error;
      try {
        const url = `http://127.0.0.1:${port}${ctx.url}`
        // console.log(ctx)

        if (/\.js$/.test(url)) {
          const result = await axios.get(url)
          ctx.set('Content-Type', result.headers['content-type']);
          ctx.set('Cache-Control', 'no-cache');
          ctx.body = result.data
        } else {
          const result = await axios({
            method: 'get',
            url: url
          })
          ctx.body = result.data
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // 如果是404的异常，则表示没有找到需要编译的文件
          return next()
        }
        // 编译错误
        ctx.set('Content-Type', 'text/html');
        ctx.body = err.message
      }
      return
    }
    return next()
  }
}