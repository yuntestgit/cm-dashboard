var express = require('express');
var router = express.Router();

//增加引用函式
const layer = require('../utility/layer');

//接收POST請求
router.post('/', function (req, res, next) {

    var mac = req.body.mac;
    var devicetype = req.body.devicetype;

    // console.log("devicetype:" + devicetype);
    // console.log("mac:" + mac);

    layer.devices_username(mac).then(devices_username => {
        layer.devices_detail(mac).then(devices_detail => {
            if (devicetype == 1) {
                res.render('./layer/type/device_type1', { devices_username: devices_username, devices_detail: devices_detail });
            } else if (devicetype == 2) {
                res.render('./layer/type/device_type2', { devices_username: devices_username, devices_detail: devices_detail });
            } else if (devicetype == 3) {
                res.render('./layer/type/device_type3', { devices_username: devices_username, devices_detail: devices_detail });
            } else if (devicetype == 4) {
                res.render('./layer/type/device_type4', { devices_username: devices_username, devices_detail: devices_detail });
            } else if (devicetype == 5) {
                res.render('./layer/type/device_type5', { devices_username: devices_username, devices_detail: devices_detail });
            } else if (devicetype == 6) {
                res.render('./layer/type/device_type6', { devices_username: devices_username, devices_detail: devices_detail });
            } else if (devicetype == 7) {
                res.render('./layer/type/device_type7', { devices_username: devices_username, devices_detail: devices_detail });
            } else if (devicetype == 8) {
                res.render('./layer/type/device_type8', { devices_username: devices_username, devices_detail: devices_detail });
            } else if (devicetype == 9) {
                res.render('./layer/type/device_type9', { devices_username: devices_username, devices_detail: devices_detail });
            } else if (devicetype == 10) {
                res.render('./layer/type/device_type10', { devices_username: devices_username, devices_detail: devices_detail });
            } else {
                res.render('./layer/type/device_type11', { devices_username: devices_username, devices_detail: devices_detail });
            }
        })
    })
});

module.exports = router;