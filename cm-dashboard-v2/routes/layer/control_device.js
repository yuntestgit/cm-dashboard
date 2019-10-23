var express = require('express');
var router = express.Router();

var deviceData = require('../utility/deviceData');

const mqtt = require('mqtt');

const options = {
    port: 1883,
    username: "nhiot",
    password: "12345678",
    clientId: "control"
};

var client = mqtt.connect("tcp://ec2-3-114-24-185.ap-northeast-1.compute.amazonaws.com", options);

var sd = require('silly-datetime');

router.post('/', function (req, res, next) {

    client.end();

    console.log("-----control-----device----")

    var mac = req.body.mac;
    //console.log("mac:"+mac);
    var action = req.body.action;
    //console.log("action:"+action);
    var gatewayMac = req.body.gatewayMac;
    //console.log("gatewayMac:"+gatewayMac);
    var connectdevice = req.body.connectdevice;
    //console.log("connectdevice:"+connectdevice);
    var topic = "Web/"+gatewayMac+"/"+connectdevice+"/Pub";
    //console.log("topic:"+topic);

    var times = req.body.times;
    //console.log("times:"+times);
    var headvalue = req.body.headvalue;
    // console.log("headvalue:"+headvalue);
    var footvalue = req.body.footvalue;
    // console.log("footvalue:"+footvalue);
    var bedvalue = req.body.bedvalue;
    // console.log("bedvalue:"+bedvalue);
    var diff = req.body.diff;
    // console.log("diff:"+diff);


    var Current_time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

    //console.log(gatewayMac+","+connectdevice);
    
    //console.log(headvalue+","+footvalue);

    client = mqtt.connect("tcp://ec2-3-114-24-185.ap-northeast-1.compute.amazonaws.com", options);

    
    switch (action) {
        case 'headup'://頭上
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x24\"]}";
            if(times>0){
                for(var x=0;x<times;x++){
                    (function(x){
                    setTimeout(function(){
                        client.publish(topic, st);
                    },(x+1)*500);
                    }(x))
                }
            }else{
                client.publish(topic, st);
            }
            for (var y=0;y<diff;y++)
                headvalue++;
            if (headvalue >= 66) 
            	headvalue = 66;
	        deviceData.Insert_bed_data(mac,headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "新增背部上升角度成功";
                    res.end(ans);
                } else {
                    ans = "新增背部上升角度失敗";
                    res.end(ans);
                }
            })
            break;
        case 'headdown'://頭下
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x25\"]}";
            if(times>0){
                for(var x=0;x<times;x++){
                    (function(x){
                    setTimeout(function(){
                        client.publish(topic, st);
                    },(x+1)*500);
                    }(x))
                }
            }else{
                client.publish(topic, st);
            }
            for (var y=0;y<diff;y++)
                headvalue--;
            if (headvalue < 0) 
            	headvalue = 0;
            deviceData.Insert_bed_data(mac,headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "新增背部下降角度成功";
                    res.end(ans);
                } else {
                    ans = "新增背部下降角度失敗";
                    res.end(ans);
                }
            })
            break;
        case 'footup'://腳上
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x26\"]}";
            if(times>0){
                for(var x=0;x<times;x++){
                    (function(x){
                    setTimeout(function(){
                        client.publish(topic, st);
                    },(x+1)*500);
                    }(x))
                }
            }else{
                client.publish(topic, st);
            }
            for (var y=0;y<diff;y++)
                footvalue++;
            if (footvalue >= 28) 
            	footvalue = 28;
            deviceData.Insert_bed_data(mac,headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "新增腿部上升角度成功";
                    res.end(ans);
                } else {
                    ans = "新增腿部上升角度失敗";
                    res.end(ans);
                }
            })
            break;
        case 'footdown'://腳下
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x27\"]}";
            if(times>0){
                for(var x=0;x<times;x++){
                    (function(x){
                    setTimeout(function(){
                        client.publish(topic, st);
                    },(x+1)*500);
                    }(x))
                }
            }else{
                client.publish(topic, st);
            }
            for (var y=0;y<diff;y++)
                footvalue--;
            if (footvalue < 0) 
            	footvalue = 0;
            deviceData.Insert_bed_data(mac,headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "新增腿部下降角度成功";
                    res.end(ans);
                } else {
                    ans = "新增腿部下降角度失敗";
                    res.end(ans);
                }
            })
            break;
        case 'fullup'://同時上
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x29\"]}";
            if(times>0){
                for(var x=0;x<times;x++){
                    headvalue++;
                    footvalue++;
                    (function(x){
                    setTimeout(function(){
                        client.publish(topic, st);
                    },(x+1)*500);
                    }(x))
                }
            }else{
                client.publish(topic, st);
                headvalue++;
                footvalue++;
            }
            if (headvalue >= 66) 
            	headvalue = 66;
            if (footvalue >= 28) 
            	footvalue = 28;
            deviceData.Insert_bed_data(mac,headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "新增同時上升角度成功";
                    res.end(ans);
                } else {
                    ans = "新增同時上升角度失敗";
                    res.end(ans);
                }
            })
            break;
        case 'fulldown'://同時下
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x2A\"]}";
            if(times>0){
                for(var x=0;x<times;x++){
                    headvalue--;
                    footvalue--;
                    (function(x){
                    setTimeout(function(){
                        client.publish(topic, st);
                    },(x+1)*500);
                    }(x))
                }
            }else{
                client.publish(topic, st);
                headvalue--;
                footvalue--;
            }

            if (headvalue < 0) 
	        	headvalue = 0;
	        if (footvalue < 0) 
	        	footvalue = 0;
            deviceData.Insert_bed_data(mac,headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "新增同時下降角度成功";
                    res.end(ans);
                } else {
                    ans = "新增同時下降角度失敗";
                    res.end(ans);
                }
            })
            break;
        case 'bedup'://整床上
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x43\"]}";
            client.publish(topic, st);
            if(times>0){
                for(var x=0;x<times;x++){
                    bedvalue++;
                    (function(x){
                    setTimeout(function(){
                        client.publish(topic, st);
                    },(x+1)*500);
                    }(x))
                }
            }else{
                client.publish(topic, st);
                bedvalue++;
            }
            if (bedvalue >= 35) 
              bedvalue = 35;
            deviceData.Insert_bed_data(mac,headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "新增整床上升成功";
                    res.end(ans);
                } else {
                    ans = "新增整床上升失敗";
                    res.end(ans);
                }
            })
            break;
        case 'beddown'://整床下
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x44\"]}";
            client.publish(topic, st);
            if(times>0){
                for(var x=0;x<times;x++){
                    bedvalue--;
                    (function(x){
                    setTimeout(function(){
                        client.publish(topic, st);
                    },(x+1)*500);
                    }(x))
                }
            }else{
                client.publish(topic, st);
                bedvalue--;
            }                        
            if (bedvalue < 0) 
            	bedvalue = 0;
            deviceData.Insert_bed_data(mac,headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "新增整床下降成功";
                    res.end(ans);
                } else {
                    ans = "新增整床下降失敗";
                    res.end(ans);
                }
            })
            break;
        case 'headdownfootup'://向後傾斜
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x40\"]}";
            var st1 = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x41\"]}";
            setTimeout(function(){
                client.publish(topic, st);
            }, 1000);
            client.publish(topic, st1);
            res.end("向後傾斜成功");
            break;
        case 'headupfootdown'://向前傾斜
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x3F\"]}";
            var st1 = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x42\"]}";
            setTimeout(function(){
                client.publish(topic, st);
            }, 1000);
            client.publish(topic, st1);
            res.end("向前傾斜成功");
            break;
        case 'SaveRecord1':
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x2B\"]}";
            client.publish(topic, st);
            deviceData.Insert_bed_record(mac,'1',headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "儲存記憶位置1成功";
                    res.end(ans);
                } else {
                    ans = "儲存記憶位置1失敗";
                    res.end(ans);
                }
            })
            break;
        case 'SaveRecord2':
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x2C\"]}";
            client.publish(topic, st);
            deviceData.Insert_bed_record(mac,'2',headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "儲存至記憶位置2成功";
                    res.end(ans);
                } else {
                    ans = "儲存至記憶位置2失敗";
                    res.end(ans);
                }
            })
            break;
        case 'ReturnRecord1':
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x2E\"]}";
            client.publish(topic, st);
            deviceData.Insert_bed_data(mac,headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "回復至記憶位置1成功";
                    res.end(ans);
                } else {
                    ans = "回復至記憶位置1失敗";
                    res.end(ans);
                }
            })
            break;
        case 'ReturnRecord2':
            var st = "{\"Content\":{\"length\":\"4\",\"command\":[\"0x6E\",\"0x01\",\"0x00\",\"0x2F\"]}";
            client.publish(topic, st);
            deviceData.Insert_bed_data(mac,headvalue,footvalue,bedvalue,Current_time).then(result => {
                if (result >= 0) {
                    ans = "回復至記憶位置2成功";
                    res.end(ans);
                } else {
                    ans = "回復至記憶位置2失敗";
                    res.end(ans);
                }
            })
            break;
            break;
        default:
            break;
    }
});

module.exports = router;