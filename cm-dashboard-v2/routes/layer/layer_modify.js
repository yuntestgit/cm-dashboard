var express = require('express');
var router = express.Router();

//增加引用函式
const setting = require('../utility/setting');

router.post('/', function (req, res, next) {
    var type = req.body.type;
    // var value = req.body.value;
    var ansm = "";
    switch (type) {
        case 'user':
            var account = req.body.account;
            var password = req.body.password;
            var username = req.body.username;
            var email = req.body.email;
            var phone = req.body.phone;

            setting.modify_user(account, password, username, email, phone).then(result => {
                if (result >= 0) {
                    ansm = "修改使用者成功";
                    res.send(ansm);
                } else {
                    ansm = "修改使用者失敗";
                    res.send(ansm);
                }
            })
            break;
        case 'patient':
            var account = req.body.account;
            var password = req.body.password;
            var username = req.body.username;
            var email = req.body.email;
            var phone = req.body.phone;
            var room = req.body.room;

            setting.modify_patient(account, password, username, email, phone,room).then(result => {
                if (result >= 0) {
                    ansm = "修改病患成功";
                    res.send(ansm);
                } else {
                    ansm = "修改病患失敗";
                    res.send(ansm);
                }
            })
            break;
        case "device":
            var mac = req.body.mac;
            var name = req.body.name;
            var description = req.body.description;
            var room = req.body.room;
            var user = req.body.user;
            setting.modify_device(mac,name,description,room,user).then(result => {
                if (result >= 0) {
                    ansm = "修改設備成功";
                    res.send(ansm);
                } else {
                    ansm = "修改設備失敗";
                    res.send(ansm);
                }
            })
            break;
        case "gateway":
            var mac = req.body.mac;
            var name = req.body.name;
            var description = req.body.description;
            var floor = req.body.floor;
            var device1 = req.body.device1;
            var device2 = req.body.device2;
            var device3 = req.body.device3;
            var device4 = req.body.device4;
            setting.modify_gateway(mac,name,description,floor,device1,device2,device3,device4).then(result => {
                if (result >= 0) {
                    ansm = "修改閘道器成功";
                    res.send(ansm);
                } else {
                    ansm = "修改閘道器失敗";
                    res.send(ansm);
                }
            })
            break;
        case "group":
            var mac = req.body.mac;
            var teamname = req.body.teamname;
            var teamtype = req.body.teamtype;
            var teamarray = req.body.teamarray;
            // console.log(mac+"/"+teamname+"/"+teamtype+"/"+teamarray);
            setting.modify_team(mac,teamname,teamtype,teamarray).then(result => {
                if (result >= 0) {
                    ansm = "修改群組成功";
                    res.send(ansm);
                } else {
                    ansm = "修改群組失敗";
                    res.send(ansm);
                }
            })
            break;
        default:
            break;
    }
});
module.exports = router;