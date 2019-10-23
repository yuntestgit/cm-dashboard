var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    console.log("API IN");
    if (req.session.language) {//检查用户是否已经登录
        //打印session的值
        var language=req.session.language;
        console.log(language);
    } else {
        req.session.language = "0";
        var language=req.session.language;
        console.log(req.session);
    }
    res.send("asd");
});

module.exports = router;