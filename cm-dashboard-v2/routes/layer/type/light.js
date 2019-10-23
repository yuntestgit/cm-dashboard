var express = require('express');
var router = express.Router();
var layer = require('../../utility/layer');

router.post('/', function(req, res, next) {
    mac = req.body.mac;
    var language = req.body.language;
    // console.log(mac);
    layer.devices_detail(mac).then(data=>{
        layer.devices_threshold(mac).then(threshold=>{
            res.render('./layer/type/light',{mac:mac,data:data,threshold:threshold,language:language});
        });
    });
});

module.exports = router;