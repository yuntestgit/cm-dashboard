var express = require('express');
var router = express.Router();

//增加引用函式
const threshold = require('../utility/threshold');

//接收POST請求
router.post('/', function (req, res, next) {

    var mac = req.body.mac;
    var id = req.body.id;
    var ans;

    threshold.cancelwarning(mac,id).then(data=>{
        // console.log(data);
        if(data==1){
            ans="排除完成";
            res.send(ans);
        }else{
            ans="排除失敗";
            res.send(ans);
        }
    })

});

module.exports = router;