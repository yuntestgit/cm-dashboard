var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    var name = req.session.name;; 

    if(name==null || name==undefined){
      name = '尚未登入';
    }

    res.render('./user/user_show', { name: name });
});

module.exports = router;