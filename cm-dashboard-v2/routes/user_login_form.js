var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    
    res.render('./user_login_form', { title: "護聯網平台" });
});

module.exports = router;