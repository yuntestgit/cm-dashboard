var express = require('express');
var router = express.Router();

var layer = require('../../utility/layer');
var schedule = require('../../utility/schedule');

router.post('/', function(req, res, next) {

	mac = req.body.mac;
	// console.log(mac);
    var language = req.body.language;

    layer.devices_detail(mac).then(data=>{	
    	layer.bed_record(mac).then(data1=>{
    		layer.devices_gatewayMac(mac).then(data2=>{
				var gateway_mac;
				if(data2[0].Mac!="NULL"){
					for(g=0;g<data2.length;g++){
						if(mac == data2[g].Connectdevice1){
							connectdevice=1;
						}
						else if (mac == data2[g].Connectdevice2){
							connectdevice=2;
						}
						else if (mac == data2[g].Connectdevice3){
							connectdevice=3;
						}
						else if (mac == data2[g].Connectdevice4){
							connectdevice=4;
						}
					}
				}else{
					connectdevice=0;
				}

				// console.log(data2);

				schedule.calendar_check(mac).then(schedule_data=>{
					// console.log(schedule_data);
					for(w=0;w<schedule_data.length;w++){
						schedule_data[w]["start"] = schedule_data[w]["Startdate"];
						delete schedule_data[w]["Startdate"];
						// console.log(schedule_data[w]);
					}

					layer.devices_mac(mac).then(uuid=>{
						var serviceuuid = uuid[0].ServiceUUID;
						var receiveuuid = uuid[0].ReceiveUUID;
						var senduuid = uuid[0].SendUUID;
						var devicetype = uuid[0].Devicetype;

						res.render('./layer/type/bed',{mac:mac,data:data,leth:data.length,record:data1,gatewayMac:data2[0].Mac,connectdevice:connectdevice,schedule:schedule_data,serviceuuid:serviceuuid,receiveuuid:receiveuuid,senduuid:senduuid,devicetype:devicetype,language:language});
					});	
				});
	    	});
    	});
    });
    
});

module.exports = router;