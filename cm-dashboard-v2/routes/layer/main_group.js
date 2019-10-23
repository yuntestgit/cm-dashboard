var express = require('express');
var router = express.Router();

//增加引用函式
const layer = require('../utility/layer');

router.post('/', function (req, res, next) {

    var teamid = req.body.groupid;
    var type = req.body.type;
    layer.room().then(r => {
        layer.patient().then(u => {
            layer.teamcheck(teamid).then(tc => {
                // console.log(tc);
                layer.deviceall().then(d => {
                    switch (type) {
                        case '2':
                            res.render('./layer/group/bed', { team: tc, room: r, patient: u, device: d });
                            break;
                        case 3:
                            break;
                        case 4:
                            break;
                        case 5:
                            break;
                        case 6:
                            break;
                        case 7:
                            break;
                        case 8:
                            break;
                        case 9:
                            break;
                        case 10:
                            break;
                        case 11:
                            break;
                        case 12:
                            break;
                        default:
                            break;
                    }
                })
            })
        })
    })

});

module.exports = router;