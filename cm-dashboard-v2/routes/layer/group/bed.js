var express = require('express');
var router = express.Router();

//增加引用函式
const layer = require('../../utility/layer');

router.post('/', function (req, res, next) {

    var teamid = req.body.groupid;
    var type = req.body.type;
    
    layer.teamcheck(teamid).then(tc => {

        var muti_data=new Array();
        var muti_name=new Array();

        var muti_last_head=new Array();
        var muti_last_foot=new Array();
        var muti_last_bed=new Array();

        var muti_gatewayMac=new Array();
        var muti_connectdevice=new Array();
         
    	var array_mac=JSON.parse(tc[0].Devicemac);

        layer.group_devices_name(array_mac).then(name => {
        //console.log(muti_data[i]);
            muti_name=name;
            layer.group_devices_detail(array_mac).then(data => {
               //console.log("bed.js:"+tc+","+r);
               muti_data=data;

               for(var i=0;i<data.length;i++){
                    muti_last_head[i]=parseInt(muti_data[i][muti_data[i].length-1].Head,10);
                    muti_last_foot[i]=parseInt(muti_data[i][muti_data[i].length-1].Foot,10);
                    muti_last_bed[i]=parseInt(muti_data[i][muti_data[i].length-1].Bed,10);
                }
                console.log(muti_last_head);
               //console.log(muti_data);
               layer.group_devices_gatewayMac(array_mac).then(data2=>{
					console.log(data2[0].Mac);
					
					if(data2[0].Mac=='NONE'){
						muti_gatewayMac="NULL";
						muti_connectdevice="NULL";
					}else{
						for(var i=0;i<data2.length;i++){
							muti_gatewayMac[i]=data2[i][0].Mac;
							
							if(array_mac[i] == data2[i][0].Connectdevice1){
								muti_connectdevice[i]=1;
							}
							else if (array_mac[i]  == data2[i][0].Connectdevice2){
								muti_connectdevice[i]=2;
							}
							else if (array_mac[i]  == data2[i][0].Connectdevice3){
								muti_connectdevice[i]=3;
							}
							else if (array_mac[i]  == data2[i][0].Connectdevice4){
								muti_connectdevice[i]=4;
							}
						}
					}
					console.log(muti_gatewayMac);
					
                    res.render('./layer/group/bed', {teamid:teamid, muti_mac: array_mac,muti_data:muti_data,muti_last_head:muti_last_head,muti_last_foot:muti_last_foot,muti_last_bed:muti_last_bed,muti_name:muti_name,muti_gatewayMac:muti_gatewayMac,muti_connectdevice:muti_connectdevice});
                });
               
            });
        });
    });

    
});

module.exports = router;