var express = require('express');
var router = express.Router();

//增加引用函式
const layer = require('../utility/layer');

router.post('/', function (req, res, next) {

    var floor = req.body.main_floor;
    var room = req.body.main_room;
    var name = req.body.main_name;
    var language = req.body.language;
    var matchdata=[];


    layer.devicetype().then(devicetype => {
        // console.log("devicetype");
        // console.log(devicetype);
        layer.devices(room).then(device => {
            // console.log("device");
            // console.log(device);
            for(var filter=0;filter<device.length;filter++){
                if(device[filter].Username == name){
                    matchdata.push(device[filter]);
                }
            }
            
            res.render('./layer/main_next',{devicetype:devicetype,devicedata:matchdata,language:language});
        })
    })

});

module.exports = router;