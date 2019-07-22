let parseString = require('xml2js').parseString;

module.exports={
	async parse(xml){
		return new Promise((resolve,reject)=>{
			parseString(xml,(err,obj)=>{
				if(err) return reject(err);
				resolve(formatXmlObject(obj.xml));
			})
		})
	}
}

function  formatXmlObject(obj){
	let newObj = {};
	for(let item in obj){
		if(Array.isArray(obj[item])){
			newObj[item]=obj[item][0];
		}
		else
		newObj[item]=obj[item];
	}
	return  newObj;
}