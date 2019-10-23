var express = require('express');
var router = express.Router();

// 增加引用函式
var system = require('../utility/manager');

//接收GET請求
router.get('/', function(req, res, next) {
  
    // var name = req.session.name;

    // if(name==null || name==undefined){
    //   name = '尚未登入';
    // }

    system.dbdata().then(dbdata=>{
      console.log("dbdata:"+dbdata);
      res.render('./manager/manager_show', {Companyname:dbdata});
    });

});

module.exports = router;