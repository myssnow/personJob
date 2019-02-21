import { join } from "path"
import * as Koa from "koa"
import * as pug from "pug"
const pageRoot = join(__dirname,"../../page")
const env = process.env.NODE_ENV
const tpl ={
  login: join(pageRoot,"index.pug")
}

export default class {
  private context: Koa.Context
  
  async handle (response):Promise<void> {
    // if (this.context.url === '/client/favicon.ico') {
    //   response.body = ''
    //   return
    // }
    
    const path = tpl['login']
    const pageRender = pug.compileFile(path, {
      inlineRuntimeFunctions: true
    })
    const html = pageRender({
      env: env
    })
    response.contentType = 'text/html'
    response.body = html
    response.statusCode = 200
    // response.html(html)
  }
}