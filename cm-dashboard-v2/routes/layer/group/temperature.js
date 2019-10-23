var express = require('express');
var router = express.Router();
const layer = require('../../utility/layer');

router.post('/', function(req, res, next) {
    var teamid = req.body.groupid;
    layer.teamcheck(teamid).then(tc => {

        var muti_data=new Array();
        var muti_name=new Array();
        
    	var array_mac=JSON.parse(tc[0].Devicemac);

        layer.group_devices_name(array_mac).then(name => {
        //console.log(muti_data[i]);
            muti_name=name;
            layer.group_devices_detail(array_mac).then(data => {
               //console.log("bed.js:"+tc+","+r);
                muti_data=data;
                res.render('./layer/group/temperature', {teamid:teamid, muti_mac: array_mac,muti_data:muti_data,muti_name:muti_name});
            });
        });
    });
});

module.exports = router;