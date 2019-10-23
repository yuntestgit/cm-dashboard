var express = require('express');
var router = express.Router();

//增加引用函式
const setting = require('../utility/setting');

router.post('/', function (req, res, next) {
    var type = req.body.type;
    var value = req.body.value;
    var ans = "";

    switch (type) {
        case 'room':
            setting.delete_room(value).then(result => {
                if (result >= 0) {
                    ans = "刪除房號成功";
                    res.send(ans);
                } else {
                    ans = "刪除房號失敗";
                    res.send(ans);
                }
            })
            break;
        case 'floor':
            setting.delete_floor(value).then(result => {
                if (result >= 0) {
                    ans = "刪除樓層成功";
                    res.send(ans);
                } else {
                    ans = "刪除樓層失敗";
                    res.send(ans);
                }
            })
            break;
        case 'user':
            setting.delete_user(value).then(result => {
                if (result >= 0) {
                    ans = "刪除使用者成功";
                    res.send(ans);
                } else {
                    ans = "刪除使用者失敗";
                    res.send(ans);
                }
            })
            break;
        case 'patient':
            setting.delete_patient(value).then(result => {
                if (result >= 0) {
                    ans = "刪除病患成功";
                    res.send(ans);
                } else {
                    ans = "刪除病患失敗";
                    res.send(ans);
                }
            })
            break;
        case 'device':
            var id = req.body.id;
            setting.delete_device(value).then(result => {
                if (result >= 0) {
                    // console.log(result);
                    if(id>2){
                        ans = "刪除設備成功";
                        res.send(ans);
                    }else{
                        setting.delete_device_table(value).then(result_d => {
                            // console.log(result_d);
                            if (result_d == 0) {
                                ans = "刪除設備成功";
                                res.send(ans);
                            }
                             else {
                                ans = "刪除設備失敗";
                                res.send(ans);
                            }
                        })
                    }
                } else {
                    ans = "刪除設備失敗";
                    res.send(ans);
                }
            })
            break;
        case 'gateway':
            setting.delete_gateway(value).then(result => {
                if (result >= 0) {
                    ans = "刪除閘道器成功";
                    res.send(ans);
                } else {
                    ans = "刪除閘道器失敗";
                    res.send(ans);
                }
            })
            break;
        case 'group':
            setting.delete_team(value).then(result => {
                if (result >= 0) {
                    ans = "刪除群組成功";
                    res.send(ans);
                } else {
                    ans = "刪除群組失敗";
                    res.send(ans);
                }
            })
            break;
        default:
            break;
    }
});
module.exports = router;