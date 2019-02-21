// import koaBody from "koa-body";
import * as Koa from "koa"
import PageController from './layout/page'
import * as koaBetterRouter from "koa-better-router"
import staticServer from "./App/plugins/staticServer"
import compiler from "./App/plugins/compiler"
import { join } from "path";
// const Koa =  require("koa")
// const app = new Koa();

const applyResponse = (response, ctx) => {
  ctx.body = response.body
  ctx.type = response.contentType
  ctx.response.status = response.statusCode
}
 class Application {
  private app: Koa
  private controllers = []
  constructor () {
    this.app = new Koa();
  }
  start(): void {
    // this.app.use(async ctx => {
    //   ctx.body = 'Hello World';
    // });
    const webpackconfig = require('../../webpack.config.js')
    this.app.use(compiler({
      port: webpackconfig.devServer.port,
      path: /\/dist\//
    }))

    // console.log(22233)
    this.plugin({
      path:"/client/",
      client: join(__dirname,'../client')
    })
    this.route("*",PageController)
    const router = this.bindRoute()
    this.app.use(router.middleware())
    this.app.use((ctx, next) => {
      return next()
    })
    this.app.listen(3000,()=>{
      console.log(`listen on 3000`)

    });
  }
  route(arg1:any, arg2:any, arg3?:any){
    let method: string []
    let path: string 
    let ctor
    method = ['GET']
    path = arg1
    ctor = arg2

    this.controllers.push({
      method,
      path,
      ctor
    })
  }
  creatRoute(){

  }
  bindRoute(): any {
    const router = new koaBetterRouter()
    this.controllers.forEach((item) => {
      const Factory = item.ctor
      // console.log(item.ctor())
      const routeHandle = async (ctx, next) => {
        const controller = new Factory()
        let response = {
          statusCode: 200,
          body: ""
        }
        console.log(controller)
        try {
           await controller.handle(response)
        } catch (err) {
          if (err instanceof Error) {
            console.error(err)
            err = err.message
          }
          response.statusCode = 500
          response.body = err
        }
        await next()
        applyResponse(response, ctx)
      }
      item.method.forEach(function (method) {
        router.addRoute(method, item.path, routeHandle)
      })
    })
    return router
  }
  plugin(arg){
    this.app.use(staticServer(arg))
  }
}
const app = new Application()
export default app 



