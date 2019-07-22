let should =require("chai").should();
let xmlParser = require("../wechat/messageHandler");
const imageMessage = "<xml><ToUserName><![CDATA[wwf1c94a7800a1a065]]></ToUserName><Encrypt><![CDATA[PcFmZHWBY6/+gnWwXvwRy+GeHpTSAK9EPrt30cBA5xab3Keq1P7hGXcxJsx80aVaeJaNwsOr87m6IPXYn1/IdDkwUBHcDa5QdQhvTYkVkPSEAAfacX3rpeJExy6JqSLzc5hqDGohs1V2M8CySZXSS/+0VOce29FUXqDDHQIIqH3Qu1kHY1E9VZeqtAycL7szJnjgt5AjEfpT1qagaMQTlMt+USRYvKG3PMaIdbCDrasXQL5r8oCsUlQB7P5t5nyMU06LZg2orf7qFKRD9kkI1gdhFnp2/6eaMZOVS48MHdjI6SToXh+yNIRBNsOppb0npx9EyOL/3GssP45P3QawVGF7JJYZtM1bnCMxIw1JmQPr3xYOC5A3K1JuJh6tntkRPstg3Jn2iCc+uj1Yu46HokYXCNZXxokOKPfm0LiBEDc=]]></Encrypt><AgentID><![CDATA[1000002]]></AgentID></xml>";


describe("后端接收微信发送的消息",function(){
	it("接收图片消息",async function(){
		let message = await xmlParser.parse(imageMessage);
		 console.log(message);
	})
})