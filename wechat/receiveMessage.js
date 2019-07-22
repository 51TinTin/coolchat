class ReceiceMessageBase{
	/*
	  @【toUserName】-接收人
	  @【fromUserName】-发送人
	  @【createTime】-创建时间
	  @【msgType】- 消息类型
	  @【msgId】- 消息Id
	  @【agentID】-应用Id
	  */
	constructor(message) {
	    let {ToUserName,FromUserName,CreateTime,MsgId,AgentID} = message;
		this.ToUserName=ToUserName;
		this.FromUserName=FromUserName;
		this.CreateTime=CreateTime;
		this.MsgId=MsgId;
		this.AgentID =AgentID;
	}
}

class TextReceiceMessage extends ReceiceMessageBase{
	constructor(message) {
		this.MsgType = "text";
		super(message);
	}
}


module.exports={
	TextReceiceMessage
}

