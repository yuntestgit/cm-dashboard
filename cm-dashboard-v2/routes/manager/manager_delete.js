var express = require('express');
var router = express.Router();

const system = require('../utility/system');

router.post('/', function (req, res, next) {

    var cpname = req.body.cpname;
    var ans;

    system.deletecompany(cpname).then( result =>{
        if (result >= 0) {      
            system.deletedb(cpname).then(resultdb=>{
                if(resultdb>=0){
                    ans = "刪除成功";
                    res.send(ans);
                }else{
                    ans = "刪除失敗";
                    res.send(ans);
                }
            })
        } else {
            ans = "刪除失敗";
            res.send(ans);
        }
    })


});
module.exports = router;