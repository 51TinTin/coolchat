let WXBizMsgCrypt = require('wechat-crypto');
let config = require("./config");

class  SendMessageBase {
    constructor(options){
        let {ToUserName,FromUserName,CreateTime}=options;
        //发送人变为接收人
        this.FromUserName = ToUserName;
        this.ToUserName = FromUserName;
        this.CreateTime =CreateTime;
    }

    //消息加密,要发送的应用
    encryptMessage(agentId){
        let message = this.initXmlMessage();
        let agent = config.getApp(agentId);
        if(!agent) return "";
        let cryptor = new WXBizMsgCrypt(agent.token, agent.encodingAESKey, config.corpId);
         let newMessage = this.initXmlMessage();
        var encryptStr = cryptor.encrypt(newMessage);
        return encryptStr;
    }

}

class  SendTextMessage  extends  SendMessageBase{
    constructor(option){
        super(option);
        this.Content = option.Content;
    }
    initXmlMessage(){
        console.log("序列化！");
        return `<xml><ToUserName><![CDATA[${this.ToUserName}]]></ToUserName><FromUserName><![CDATA[${this.FromUserName}]]></FromUserName><CreateTime>${this.CreateTime}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${this.Content}]]></Content></xml>`
    }
}


module.exports={
    SendTextMessage
};