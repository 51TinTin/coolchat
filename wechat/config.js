module.exports = {
  corpId:"wwf1c94a7800a1a065",
  apps:[{
    agentid:"1000002",
    secret:"sHFBUCo5MrffHE0xLNTjkvmte1chO2lxPBrXaUH1Mqw",
    token:"USlhEzVBIrZsjLHT7DmWUf8G2kkkV",
    encodingAESKey:"Qky5JzMdfOYsHuukMerQT1Xlt25rAne526pIc5C21tf"
  }],
  getApp(agentid){
    return this.apps.find(r=>r.agentid == agentid);
  }
}