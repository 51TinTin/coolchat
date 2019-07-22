module.exports = ReplyHandler;

function ReplyHandler(){
	this.methods=new Map();
}

["text","image","voice","video","location","link"].forEach(method=>{
	ReplyHandler.prototype[method] = function(handler){
		console.log("注册方法！");
		this.methods.set(method,handler);
		return this;
	}
})




