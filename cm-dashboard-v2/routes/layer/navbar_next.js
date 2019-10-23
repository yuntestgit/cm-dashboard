var express = require('express');
var router = express.Router();

const layer = require('../utility/layer');

router.post('/', function (req, res, next) {

    var patient_n = req.body.navbar_name;
    var language = req.body.language;
    
    layer.devices_patient(patient_n).then(data=>{
        // console.log(data);

        layer.devices_array_detail(data).then(checkdata=>{
            // console.log(checkdata);

            layer.devices_array_threshold(data).then(checkthreshold=>{
                // console.log(checkthreshold);

                // for(th=0;th<checkthreshold.length;th++){
                //     for(ch=0;ch<checkdata.length;ch++){//所有資料
                //         if(th)
                //     }
                // }

                res.render('./layer/navbar_next',{mac:data,checkdata:checkdata,threshold:checkthreshold,language:language});

            })
        })
    })

});

module.exports = router;