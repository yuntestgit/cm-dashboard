var express = require('express');
var router = express.Router();

//增加引用函式
const schedule = require('../utility/schedule');


router.post('/', function (req, res, next) {
    
    var mac = req.body.mac;
    var id = req.body.id;

    var ans = "";

    schedule.remove(mac,id).then(result=>{
        if (result == 1) {
            ans = "刪除排程成功";
            res.send(ans);
        } else {
            ans = "刪除排程失敗";
            res.send(ans);
        }
    })

        
});
module.exports = router;    