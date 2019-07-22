let config = require("./config");
let WXBizMsgCrypt = require('wechat-crypto');
let getRawBody = require("raw-body");
let Xml2Object = require("./xml2Object");
let {SendTextMessage} =require("./sendMessage");
module.exports = function(replyHandler) {
	return async (ctx, next) => {
		let {
			msg_signature,
			timestamp,
			nonce,
			agentid,
			echostr
		} = ctx.query;
		if (msg_signature && timestamp && nonce) {
			let agent = config.getApp(agentid);
			if (agent) {
				let cryptor = new WXBizMsgCrypt(agent.token, agent.encodingAESKey, config.corpId);
				if (ctx.method == "GET") {
					let signature = cryptor.getSignature(timestamp, nonce, echostr);
					//请求来自微信
					if (signature == msg_signature) {
						let decrypted = cryptor.decrypt(echostr);
						ctx.body = decrypted.message;
					}
				}
				if(ctx.method ==="POST"){
					let message = await getRawBody(ctx.req,{encoding:"utf8"});
					let obj = await Xml2Object.parse(message);
					let signature = cryptor.getSignature(timestamp, nonce, obj.Encrypt);
					if(signature == msg_signature){
						let decrypted = cryptor.decrypt(obj.Encrypt);
						let receiveMessage = await Xml2Object.parse(decrypted.message);
						ctx.message = receiveMessage;
						if(replyHandler.methods.has(receiveMessage.MsgType)){
							await replyHandler.methods.get(receiveMessage.MsgType).call(ctx);
							SendMessageFactory(ctx.message,ctx.reply,agentid);
						}
						ctx.body="";
					}
				}
			}
			else
				await next();
		}
		else
			await next();
	}
}


function  SendMessageFactory(message,reply,agentid) {
	let sendMessage=null;
	if(reply.type=="text"){
		sendMessage = new SendTextMessage(Object.assign(message,{Content:reply.content}))
		let encryptMessage  = sendMessage.encryptMessage(agentid);
		console.log(encryptMessage);
	}
}