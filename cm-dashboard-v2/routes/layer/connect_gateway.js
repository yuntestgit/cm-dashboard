var express = require('express');
var router = express.Router();

const mqtt1 = require('mqtt');

const options1 = {
    port: 1883,
    username: "nhiot",
    password: "12345678",
    clientId: "gateway1"
};

var client1 = mqtt1.connect("tcp://ec2-3-114-24-185.ap-northeast-1.compute.amazonaws.com", options1);


router.post('/', function (req, res, next) {
    console.log("gatewaymac-connecting");

    client1.end();

    var gatewaymac = req.body.gatewaymac;
    var connectdevice = req.body.connectdevice;
    var method = req.body.method;


    // console.log(gatewaymac);

    client1 = mqtt1.connect("tcp://ec2-3-114-24-185.ap-northeast-1.compute.amazonaws.com", options1);

    client1.on('connect', function () {
        // console.log("MQTT success:"+mac);
        var topic = "Broker/Nurse/"+gatewaymac+"/"+connectdevice+"/Sub";
        
        client1.subscribe(topic);
    });

    var topic1 = "Web/"+gatewaymac+"/"+connectdevice+"/Pub";

    if(method=="connect"){

        var serviceuuid = req.body.serviceuuid;
        var receiveuuid = req.body.receiveuuid;
        var senduuid = req.body.senduuid;
        var type = req.body.devicetype;
        console.log(topic1);
        var connect = "{\"Content\":{\"length\":\"4\",\"uuid\":\""+serviceuuid+"\",\"rxuuid\":\""+receiveuuid+"\",\"txuuid\":\""+senduuid+"\"}}";

        client1.publish(topic1,connect);
    }

    if(method=="disconnect"){

        var disconnect = "{\"Content\":{\"disconnect\":\"1\"}}";

        client1.publish(topic1,disconnect);
    }


    client1.on('message', function (topic, message) {
        console.log(message.toString());
        // message is Buffer
        // console.log("topic: " + topic + "\nmessage: " + message.toString());
        if(message=="ok"){
            res.end("成功");
        }else{
            res.end("失敗");
        }
    });

    client1.disconnecting;

});

module.exports = router;