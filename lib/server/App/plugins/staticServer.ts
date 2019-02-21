import * as server from "koa-better-serve"

export default function ({client,path}){
  const pathReg = new RegExp(`^${path}`)
  const handle = server(client, path)
  return function (ctx, next){
    if(pathReg.test(ctx.url)){
      return handle(ctx, next)
    }else{
      return next()
    }
  }
}