var express = require('express');
var router = express.Router();

// 增加引用函式
const system = require('./utility/system');
var mysql = require('mysql');

var databasename='';

const user = require('./utility/user');
const manager = require('./utility/manager');
const layer = require('./utility/layer');
const setting = require('./utility/setting');

//接收POST請求
router.post('/', function (req, res, next) {

    console.log("user-login");

    //取得帳號
    var account = req.body.account;
    //取得密碼    
    var password = req.body.password;
    //var language = req.body.language;
    var language = 1;
    var role;

    //確認設備Mac的SQL
    var oldsql="";
    var newsql="";

    var flag=0;
    var dbcount=0;

    function getdata(pool1){
         // pool1.query('SELECT * FROM User WHERE Account = ? AND Password = ?',[account,password], function (err, result, fields) {
        //     if (err){
        //         console.log(err);
        //     };
        //     // console.log(result);
        //     if(result[0] != undefined ){
        //         databasename=pool1.config.connectionConfig.database;
        //         console.log("----------------------");
        //         login(databasename);
        //     }else{
        //         flag++;
        //         if(flag==dbcount){
        //             //傳至登入失敗
        //             res.render('loginfail');
        //         }
        //     }
        // });
        pool1.getConnection(function(err, connection) {
            if(err){
                console.log(err);
            };
            connection.query('SELECT * FROM User WHERE Account = ? AND Password = ?',[account,password], function (err, result, fields) {
                connection.destroy();
                if (err){
                    console.log(err);
                };
                // console.log(result);
                if(result[0] != undefined ){
                    databasename=pool1.config.connectionConfig.database;
                    console.log("----------------------");
                    login(databasename);
                }else{
                    flag++;
                    if(flag==dbcount){
                        //傳至登入失敗
                        res.render('loginfail');
                    }
                }
            });
        });
    }

    system.check().then( data => {
        // console.log(data);
        dbcount = data.length;
        for(x=0;x<dbcount;x++){
            var dbname=data[x].Cpname;
            //建立連線
            const pool1  = mysql.createPool({
                user: 'brian',
                password: '12345678',
                host: 'database-1.cmh4h6xmubcg.ap-northeast-1.rds.amazonaws.com',
                database: dbname
            });
            getdata(pool1);
        }
        
    });

    function login(dbname){
        console.log(dbname);
        user.dbconnect(dbname).then(zero=>{
            if(dbname=="STA"){
                manager.dbdata().then(w => {
                    manager.userdata().then(t=>{
                        res.render('./manager/manager_show',{Company:w,User:t});
                    })
                })
            }else{
                user.login(dbname,account, password).then(d => {
                    if (d == null) {
                        // req.session.username = null;
                        //傳至登入失敗
                        res.render('loginfail');
                    } else {
                        // req.session.username = d.username;
                        var s = JSON.parse(JSON.stringify(d));
                        role = s[0].Role;
                        //導向管理者
                        if (role == 1) {
                            manager.floordata().then(f => {
                                // console.log("Floor:"+f);
                            })
                            res.render('./manager/manager_show', { user: d });
                        //導向護理長
                        } else if (role == 2) {
                            // res.render('./user/user_show', {user:d}); 
                        //導向護理師
                        } else if (role == 3) {
                            layer.floor().then(lf => {
                                // console.log(lf.length);
                                layer.room().then(lr=>{
                                    // console.log(lr.length);
                                    layer.patient().then(pa=>{//原>user()
                                        // console.log(pa.length);

                                        var patient_name_array=[];
                                        for(p=0;p<pa.length;p++){
                                            patient_name_array.push(pa[p].Username);
                                        }

                                        layer.user_check_device().then(ch=>{
                                            console.log(ch);
                                            var newsql="";
                                            if(ch[0].id!=null){
                                                for(var usercount=0;usercount<pa.length;usercount++){
                                                    for(var devicecount=0;devicecount<ch.length;devicecount++){
                                                        if(pa[usercount].Username==ch[devicecount].Username){
                                                            oldsql="(SELECT * FROM `"+ch[devicecount].Mac+"` ORDER BY `"+ch[devicecount].Mac+"`.`Time` DESC LIMIT 1)" ;
                                                            newsql= newsql+"UNION"+oldsql;
                                                        }
                                                    } 
                                                }
                                                layer.devices_realtime_data(newsql).then(devicerealtime => {
                                                    console.log(devicerealtime);
                                                    layer.team().then(group=>{
                                                        layer.deviceall().then(deviceall=>{
                                                            // console.log(deviceall.length);
                                                            var sleeptape_mac_array=[];
                                                            // console.log(patient_name_array);
                                                            layer.patient_array_sleeptape(patient_name_array).then(sleeptape_threshold=>{
                                                                console.log(sleeptape_threshold);
                                                                for(sla=0;sla<sleeptape_threshold.length;sla++){
                                                                    sleeptape_mac_array.push(sleeptape_threshold[sla][0].Mac);
                                                                }
        
                                                                layer.devicetype().then(type=>{
                                                                    // console.log(type.length);
        
                                                                    // console.log(sleeptape_mac_array);
                                                                    layer.group_devices_detail_sleeptape(sleeptape_mac_array).then(detail_sleeptape => {
                                                                        // console.log(detail_sleeptape);
                                                                        res.render('./layer/layer_show', { user: d, floor: lf, room: lr, threshold:sleeptape_threshold, sleeptape_detail:detail_sleeptape, patient: pa, checkdevice: ch, realtime: devicerealtime, device:deviceall, group:group,type:type,language:language});
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            }else{
                                                var devicerealtime=null;
                                                console.log(devicerealtime);
                                                layer.team().then(group=>{
                                                    layer.deviceall().then(deviceall=>{
                                                        // console.log(deviceall.length);    
                                                        var sleeptape_mac_array=[];
                                                        // console.log(patient_name_array);
                                                        layer.patient_array_sleeptape(patient_name_array).then(sleeptape_threshold=>{
                                                            console.log(sleeptape_threshold);
                                                            for(sla=0;sla<sleeptape_threshold.length;sla++){
                                                                sleeptape_mac_array.push(sleeptape_threshold[sla][0].Mac);
                                                            }
        
                                                            layer.devicetype().then(type=>{
                                                                // console.log(type.length);
        
                                                                // console.log(sleeptape_mac_array);
                                                                layer.group_devices_detail_sleeptape(sleeptape_mac_array).then(detail_sleeptape => {
                                                                    // console.log(detail_sleeptape);
                                                                    res.render('./layer/layer_show', { user: d, floor: lf, room: lr, threshold:sleeptape_threshold, sleeptape_detail:detail_sleeptape, patient: pa, checkdevice: ch, realtime: devicerealtime, device:deviceall, group:group,type:type,language:language});
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            }

                                            // layer.devices_realtime_data(newsql).then(devicerealtime => {
                                            //     console.log(devicerealtime);
                                            //     layer.team().then(group=>{
                                            //         layer.deviceall().then(deviceall=>{
                                            //             // console.log(deviceall.length);

                                            //             var sleeptape_mac_array=[];
                                            //             // console.log(patient_name_array);
                                            //             layer.patient_array_sleeptape(patient_name_array).then(sleeptape_threshold=>{
                                            //                 console.log(sleeptape_threshold);
                                            //                 for(sla=0;sla<sleeptape_threshold.length;sla++){
                                            //                     sleeptape_mac_array.push(sleeptape_threshold[sla][0].Mac);
                                            //                 }

                                            //                 layer.devicetype().then(type=>{
                                            //                     // console.log(type.length);

                                            //                     // console.log(sleeptape_mac_array);
                                            //                     layer.group_devices_detail_sleeptape(sleeptape_mac_array).then(detail_sleeptape => {
                                            //                         // console.log(detail_sleeptape);
                                            //                         res.render('./layer/layer_show', { user: d, floor: lf, room: lr, threshold:sleeptape_threshold, sleeptape_detail:detail_sleeptape, patient: pa, checkdevice: ch, realtime: devicerealtime, device:deviceall, group:group,type:type});
                                            //                     })
                                            //                 })
                                            //             })
                                            //         })
                                            //     })
                                            // })
                                        })
                                    })
                                })
                            })
                        //導向使用者
                        } else {
                            res.render('./user/user_show', { user: d });
                        }
                    }
                })
            }
        })
    }

});

module.exports = router;