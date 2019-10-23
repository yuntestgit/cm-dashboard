var express = require('express');
var router = express.Router();

//增加引用函式
const system = require('../utility/system');
var mysql = require('mysql');

const user = require('../utility/user');
const setting = require('../utility/setting');

router.post('/', function(req, res, next) {
    // var name = req.session.name;; 
    // if(name==null || name==undefined){
    //   name = '尚未登入';
    // }

    //取得帳號
    var account = req.body.account;
    //取得密碼    
    var password = req.body.password;
    var language = req.body.language;
    var userdata=[];

    function getdata(pool2){
        // pool2.query('SELECT * FROM User WHERE Account = ? AND Password = ?',[account,password], function (err, result, fields) {
        //     if (err){
        //         console.log(err);
        //     };
        //     if(result[0] != undefined ){
        //         // console.log(pool2.config.connectionConfig.database);
        //         databasename=pool2.config.connectionConfig.database;
        //         // console.log("dbname:"+databasename);
        //         console.log("----------------------");
        //         login(databasename);
        //     }
        // });
        pool2.getConnection(function(err, connection) {
            connection.query('SELECT * FROM User WHERE Account = ? AND Password = ?',[account,password], function (err, result, fields) {
                connection.destroy();
                if (err){
                    console.log(err);
                };
                if(result[0] != undefined ){
                    // console.log(pool2.config.connectionConfig.database);
                    databasename=pool2.config.connectionConfig.database;
                    // console.log("dbname:"+databasename);
                    console.log("----------------------");
                    login(databasename);
                }
            });
        });
    }

    system.check().then( data => {
        for(x=0;x<data.length;x++){
            var dbname=data[x].Cpname;
            //建立連線
            const pool2  = mysql.createPool({
                user: 'brian',
                password: '12345678',
                host: 'database-1.cmh4h6xmubcg.ap-northeast-1.rds.amazonaws.com',
                database: dbname
            });
            getdata(pool2);
        }
    });

    function login(dbname){
        console.log("show_show_dbname:"+dbname);
        user.login(dbname,account, password).then(d => {
            if (d == null) {
                // req.session.username = null;
                //傳至登入失敗
                res.render('loginfail');
            } else {
                setting.floor().then(floor =>{
                    // console.log(floor.length);
                    setting.room().then(room =>{
                        // console.log(room.length);
                        setting.devicetype().then( devicetype => {
                            // console.log(devicetype.length);
                            setting.user().then(user=>{
                                // console.log(user.length);
                                for(var filter=0;filter<user.length;filter++){
                                    if(user[filter].Role == 4){
                                        userdata.push(user[filter]);
                                    }
                                }
                                res.render('./setting/setting_show',{name:d,devicetype:devicetype,floor:floor,room:room,user:userdata,language:language});
                            })
                        })
                    })
                })
            }
        })
    }
    
});

module.exports = router;