const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')



let WeChat =require("./wechat/index");
// error handler
let ReplyHandler = require("./wechat/replyHandler");

let handler =new ReplyHandler();

handler.text(async function(){
	let message = this.message;
	this.reply={
	    type:"text",
        content:"回复一笑消息！"
    }
}).image(async function(){
	let message = this.message;
	console.log(message);
})

onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))



app.use(WeChat(handler));

app.use(views(__dirname + '/views', {
  extension: 'nunjucks'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
