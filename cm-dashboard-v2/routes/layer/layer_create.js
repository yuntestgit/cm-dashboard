var express = require('express');
var router = express.Router();

//增加引用函式
const setting = require('../utility/setting');

const system = require('../utility/system');
var mysql = require('mysql');

router.post('/', function (req, res, next) {
    var type = req.body.type;
    var value = req.body.value;
    var ans = "";

    setting.create_floor(value).then(result => {
        if (result >= 0) {
            ans = "新增樓層成功";
            res.send(ans);
        } else {
            ans = "新增樓層失敗";
            res.send(ans);
        }
    })
        
});
module.exports = router;    