var express = require('express');
var router = express.Router();

//增加引用函式
const setting = require('../utility/setting');

/* GET home page. */
router.post('/', function (req, res) {
  var language = req.body.language;
  var userdata=[];

  setting.user().then(user => {
    for (var filter = 0; filter < user.length; filter++) {
      if (user[filter].Role == 3) {
        userdata.push(user[filter]);
      }
    }
    res.render('./setting/setting_manage',{user:userdata,language:language});
  });

});

module.exports = router;