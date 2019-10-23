var express = require('express');
var router = express.Router();

//增加引用函式
const setting = require('../utility/setting');

router.post('/', function (req, res,next) {


    var id = req.body.id;
    var type = req.body.type;
    var language = req.body.language;
    console.log(language);

    var userdata=[];
  
    setting.floor().then(floor=>{
      setting.room().then(room =>{
        if(id == 1){
          setting.deviceall().then(device=>{
            setting.gateway().then(gateway=>{
              res.render("./setting/setting_device_gate",{device_id:id,type:type,device:device,floor:floor,room:room,gateway:gateway,language:language});
            
            });
          });
        }else if(id==2||id==3){
          setting.user().then(user => {
            for (var filter = 0; filter < user.length; filter++){
              if (user[filter].Role == 4) {
                userdata.push(user[filter]);
              }
            }
            setting.devices(id).then(device=>{
              // console.log(room.length);
              res.render("./setting/setting_device_personal",{device_id:id,type:type,device:device,floor:floor,room:room,user:userdata,language:language});
            });      
          });
        }else{
          setting.user().then(user => {
            for (var filter = 0; filter < user.length; filter++){
              if (user[filter].Role == 4) {
                userdata.push(user[filter]);
              }
            }
            setting.devices(id).then(device=>{
              // console.log(device);
              res.render("./setting/setting_device",{device_id:id,type:type,device:device,floor:floor,room:room,user:userdata,language:language});
            });      
          });
        }
      });
    });

});

module.exports = router;