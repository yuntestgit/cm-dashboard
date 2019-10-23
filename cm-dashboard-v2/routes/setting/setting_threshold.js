var express = require('express');
var router = express.Router();

//增加引用函式
const setting = require('../utility/setting');

router.post('/', function (req, res, next) {


  var id = req.body.id;
  // console.log(id);
  var type = req.body.type;
  // console.log(type);
  var language = req.body.language;
  setting.devices(id).then(device => {
    console.log(device);
    switch (id) {
      case '2':
          res.render("./setting/threshold/bed", { device_id: id, type: type, device: device ,language:language});
        break;
      case '3':
          res.render("./setting/threshold/sleeptape", { device_id: id, type: type, device: device ,language:language });
        break;
      case '4':
          res.render("./setting/threshold/light", { device_id: id, type: type, device: device ,language:language});
        break;
      case '5':
          res.render("./setting/threshold/humidifier", { device_id: id, type: type, device: device ,language:language});
        break;
      case '6':
          res.render("./setting/threshold/airquality", { device_id: id, type: type, device: device ,language:language});
        break;
      case '7':
          res.render("./setting/threshold/bloodpressure", { device_id: id, type: type, device: device ,language:language});
        break;
      case '8':
          res.render("./setting/threshold/fat", { device_id: id, type: type, device: device,language:language });
        break;
      case '9':
          res.render("./setting/threshold/electrictable", { device_id: id, type: type, device: device,language:language });
        break;
      case '10':
          res.render("./setting/threshold/electricsofa", { device_id: id, type: type, device: device ,language:language});
        break;
      case '11':
          res.render("./setting/threshold/bloodsugar", { device_id: id, type: type, device: device ,language:language});
        break;
      case '12':
          res.render("./setting/threshold/temperature", { device_id: id, type: type, device: device ,language:language});
        break;
      default:
        break;
    }
  });

});

module.exports = router;