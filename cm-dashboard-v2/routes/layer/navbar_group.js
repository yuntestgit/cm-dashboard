var express = require('express');
var router = express.Router();

//增加引用函式
const layer = require('../utility/layer');

router.post('/', function (req, res, next) {

	var teamid = req.body.groupid;
    layer.room().then(r => {
        layer.patient().then(u => {
            layer.teamcheck(teamid).then(tc => {
				//console.log("navtc:"+tc);
				var array_mac=JSON.parse(tc[0].Devicemac);
				//console.log(array_mac);
				layer.group_devices_gatewayMac(array_mac).then(data2=>{
					//console.log(data2);
					/*if(data2[0].Mac=='NONE'){
						console.log("GatewayError");
						res.send("error");
					}else{*/
						layer.deviceall().then(d=>{
							res.render('./layer/navbar_group', { team: tc, room: r, patient: u , device:d});
						});
					/*}*/
				});
            });
        });
    });
});

module.exports = router;