var express = require('express');
var router = express.Router();

//增加引用函式
const schedule = require('../utility/schedule');


router.post('/', function (req, res, next) {
    
    var mac = req.body.mac;
    var id = req.body.id;
    var startdate = req.body.startdate;
    var startvaluehead = req.body.startvaluehead;
    var startvaluefoot = req.body.startvaluefoot;
    var startvaluebed = req.body.startvaluebed;

    var ans = "";

    schedule.modify(mac,id,startdate,startvaluehead,startvaluefoot,startvaluebed).then(result=>{
        if (result == 1) {
            ans = "修改排程成功";
            res.send(ans);
        } else {
            ans = "修改排程失敗";
            res.send(ans);
        }
    })

        
});
module.exports = router;    