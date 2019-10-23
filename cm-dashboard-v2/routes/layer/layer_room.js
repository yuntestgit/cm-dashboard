var express = require('express');
var router = express.Router();

//增加引用函式
const layer = require('../utility/layer');

//接收Post請求
router.post('/', function (req, res, next) {

    // var name = req.session.name;; 

    // if(name==null || name==undefined){
    //   name = '尚未登入';
    // }

    // console.log("flooroom:"+req.body.flooroom);
    
    var room_nb = req.body.flooroom;
    var data_realtime = [];
    
    var oldsql="";
    var newsql="";

    layer.devicetype().then(devicetype => {
        layer.devices(room_nb).then(device => {

            for(x=0;x<device.length;x++){

                if(device[x].Devicetype==2){
                    // console.log(device[x].Devicetype);
                    // console.log(device[x].Mac);
                    oldsql="(SELECT * FROM `"+ device[x].Mac +"` ORDER BY `"+ device[x].Mac +"`.`Time` DESC LIMIT 1)" ;
                    newsql= newsql+"UNION"+oldsql;
                }
            }
            layer.devices_realtime_data(newsql).then(devicerealtime => {
                res.render('./layer/layer_room', { devicetype: devicetype, device: device,devicerealtime: devicerealtime});
            })
        })
    })
});

module.exports = router;