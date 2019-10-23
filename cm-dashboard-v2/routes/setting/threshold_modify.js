var express = require('express');
var router = express.Router();

//增加引用函式

var threshold = require('../utility/threshold');
var mysql = require('mysql');

router.post('/', function (req, res, next) {
    var type = req.body.type;
    var mac = req.body.mac;
    var ans = "";

    switch (type) {
        case "sleeptape":
            var breath = req.body.b; 
            var heartbreak = req.body.h;
            var turnoff = req.body.t;
            // console.log(breath+"/"+heartbreak+"/"+turnoff);
            threshold.modify_sleeptape(mac,breath,heartbreak,turnoff).then(result => {
                if (result >= 0) {
                    ans = "修改告警值成功";
                    res.send(ans);
                } else {
                    ans = "修改告警值失敗";
                    res.send(ans);
                }
            })
            break;
        case "light":
            var light = req.body.light; 
            var colorvalue = req.body.colorvalue;
            var wat = req.body.wat;
            // console.log(light+"/"+colorvalue+"/"+wat);
            threshold.modify_light(mac,light,colorvalue,wat).then(result => {
                if (result >= 0) {
                    ans = "修改告警值成功";
                    res.send(ans);
                } else {
                    ans = "修改告警值失敗";
                    res.send(ans);
                }
            })
            break;
        case "bloodpressure":
            var sbp = req.body.sbp; 
            var dbp = req.body.dbp;
            var heartrate = req.body.heartrate;
            // console.log(sbp+"/"+dbp+"/"+heartrate);
            threshold.modify_bloodpressure(mac,sbp,dbp,heartrate).then(result => {
                if (result >= 0) {
                    ans = "修改告警值成功";
                    res.send(ans);
                } else {
                    ans = "修改告警值失敗";
                    res.send(ans);
                }
            })
            break;
        case "bloodsugar":
            var glucose = req.body.glucose; 
            // console.log(glucose);
            threshold.modify_bloodsugar(mac,glucose).then(result => {
                if (result >= 0) {
                    ans = "修改告警值成功";
                    res.send(ans);
                } else {
                    ans = "修改告警值失敗";
                    res.send(ans);
                }
            })
            break;
        case "humidifier":
            var wet = req.body.wet; 
            var wat = req.body.wat;
            // console.log(wet+"/"+wat);
            threshold.modify_humidifier(mac,wet,wat).then(result => {
                if (result >= 0) {
                    ans = "修改告警值成功";
                    res.send(ans);
                } else {
                    ans = "修改告警值失敗";
                    res.send(ans);
                }
            })
            break;
        case "fat":
            var fat = req.body.f; 
            var water = req.body.w;
            var muscle = req.body.m;
            var bone = req.body.b;
            // console.log(fat+"/"+water+"/"+muscle+"/"+bone);
            threshold.modify_fat(mac,fat,water,muscle,bone).then(result => {
                if (result >= 0) {
                    ans = "修改告警值成功";
                    res.send(ans);
                } else {
                    ans = "修改告警值失敗";
                    res.send(ans);
                }
            })
            break;
        case "airquality":
            var wet = req.body.wet;
            var temp = req.body.temp; 
            var pm = req.body.pm;
            var co2 = req.body.co2;
            var cha = req.body.cha;
            var tvoc = req.body.tvoc;
            var wat = req.body.wat;
            // console.log(wet + "/" + temp + "/" + pm + "/" + co2 + "/" + cha + "/" + tvoc + "/" + wat);
            threshold.modify_airquality(mac,wet,temp,pm,co2,cha,tvoc,wat).then(result => {
                if (result >= 0) {
                    ans = "修改告警值成功";
                    res.send(ans);
                } else {
                    ans = "修改告警值失敗";
                    res.send(ans);
                }
            })
            break;
        case "temperature":
            var temperature = req.body.temperature; 
            // console.log(temperature);
            threshold.modify_temperature(mac,temperature).then(result => {
                if (result >= 0) {
                    ans = "修改告警值成功";
                    res.send(ans);
                } else {
                    ans = "修改告警值失敗";
                    res.send(ans);
                }
            })
            break;
        case "bed":
            var head = req.body.head; 
            var foot = req.body.foot; 
            var bed = req.body.bed; 
            // console.log(head+"/"+foot+"/"+bed);
            threshold.modify_bed(mac,head,foot,bed).then(result => {
                if (result >= 0) {
                    ans = "修改告警值成功";
                    res.send(ans);
                } else {
                    ans = "修改告警值失敗";
                    res.send(ans);
                }
            })
            break;
        default:
            break;
    }
});
module.exports = router;    