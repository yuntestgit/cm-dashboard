var express = require('express');
var router = express.Router();

//增加引用函式
const setting = require('../utility/setting');

const system = require('../utility/system');
var mysql = require('mysql');

router.post('/', function (req, res, next) {
    var type = req.body.type;
    var value = req.body.value;
    var ans = "";

    switch (type) {
        case "floor":
            setting.create_floor(value).then(result => {
                if (result >= 0) {
                    ans = "新增樓層成功";
                    res.send(ans);
                } else {
                    ans = "新增樓層失敗";
                    res.send(ans);
                }
            })
            break;
        case "room":
            var floor = req.body.floor;
            setting.create_room(floor, value).then(result => {
                if (result >= 0) {
                    ans = "新增房號成功";
                    res.send(ans);
                } else {
                    ans = "新增房號失敗";
                    res.send(ans);
                }
            })
            break;
        case "user":
            var check=0;
            var account = req.body.account;
            var password = req.body.password;
            var username = req.body.username;
            var email = req.body.email;
            var phone = req.body.phone;
            var dblength=0;

            function getdata(pool_cre){
				pool_cre.getConnection(function(err,connection){
					if(err){
						console.log(err);
					};
					connection.query('SELECT * FROM User WHERE Account = ? ',[account], function (err, result, fields) {
						connection.destroy();
						if (err){
							console.log(err);
						};
						if(result[0] == undefined){
							check++;
						}else{
							createnewuser(0);
						}
						if(check == dblength){
							console.log("add");
							createnewuser(1);
						}
					});
				});
                
            }

            system.check().then( data => {
                console.log(data);
                dblength=data.length;
                console.log(dblength);
                for(x=0;x<data.length;x++){
                    var dbname=data[x].Cpname;
                    //建立連線
                    var pool_cre  = mysql.createPool({
                        user: 'brian',
                        password: '12345678',
                        host: 'database-1.cmh4h6xmubcg.ap-northeast-1.rds.amazonaws.com',
                        database: dbname
                    });
                    getdata(pool_cre);
                }
            });

            function createnewuser(status){
				if(status==0){
					ans = "新增使用者失敗";
					res.send(ans);
				}else{
					setting.create_user(account, password, username, email, phone).then(result => {
						if (result >= 0) {
							ans = "新增使用者成功";
							res.send(ans);
						} else {
							ans = "新增使用者失敗";
							res.send(ans);
						}
					})
				};
            }

            break;

        case "patient":
            var account = req.body.account;
            // var password = req.body.password;
            var username = req.body.username;
            var email = req.body.email;
            var phone = req.body.phone;
            var room = req.body.room;
            setting.create_patient(account, username, email, phone,room).then(result => {
                if (result >= 0) {
                    ans = "新增病患成功";
                    res.send(ans);
                } else {
                    ans = "新增病患失敗";
                    res.send(ans);
                }
            })
            break;
        case "device":
            var id = req.body.id; 
            var mac = req.body.mac;
            var name = req.body.name;
            var description = req.body.description;
            var room = req.body.room;
            var user = req.body.user;
            var service = req.body.service;
            var receive = req.body.receive;
            var send  = req.body.send ;
            setting.create_device(id,mac,name,description,room,user,service,receive,send).then(result => {
                // console.log(result);
                if (result >= 0) {
                    if(id==2 || id==3 || id==4 || id==5 || id==6 || id==7 || id==8 || id==11 || id==12){
                        setting.create_device_table(id,mac).then(result_t => {
                            console.log("result_t:"+result_t);
                            if (result_t == 0) {
                                setting.create_table_data(id,mac).then(result_default => {
                                    console.log("result_default:"+result_default);
                                    if (result_default == 1) {
                                        ans = "新增設備成功";
                                        res.send(ans);
                                    }else {
                                        ans = "新增設備失敗";
                                        res.send(ans);
                                    }
                                })
                            }else {
                                ans = "新增設備失敗";
                                res.send(ans);
                            }
                        })
                    }else{
                        ans = "新增設備成功";
                        res.send(ans);
                    }
                } else {
                    ans = "新增設備失敗";
                    res.send(ans);
                }
            })
            break;
        case "gateway":
            var checkn=0;
            var mac = req.body.mac;
            var name = req.body.name;
            var description = req.body.description;
            var floor = req.body.floor;
            var room = req.body.room;
            var device1 = req.body.device1;
            var device2 = req.body.device2;
            var device3 = req.body.device3;
            var device4 = req.body.device4;
            // console.log(mac+","+name+","+description+","+floor+","+device1+","+device2+","+device3+","+device4);

            // if(device1=="NULL"){
            //     checkn=checkn+1;
            // }else{
            //     setting.modify_device_status('on',device1).then(result1 => {
            //         if(result1 >= 0){
            //             checkn=checkn+1;
            //         }else{
            //             ans=ans+"裝置1連線失敗/";
            //             console.log("ans:"+ans);
            //         }
            //     })
            // }

            // if(device2=="NULL"){
            //     checkn=checkn+1;
            // }else{
            //     setting.modify_device_status('on',device2).then(result2 => {
            //         if(result2 >= 0){
            //             checkn=checkn+1;
            //         }else{
            //             ans=ans+"裝置2連線失敗/";
            //             console.log("ans:"+ans);
            //         }
            //     })
            // }

            // if(device3=="NULL"){
            //     checkn=checkn+1;
            // }else{
            //     setting.modify_device_status('on',device3).then(result3 => {
            //         if(result3 >= 0){
            //             checkn=checkn+1;
            //         }else{
            //             ans=ans+"裝置3連線失敗/";
            //             console.log("ans:"+ans);
            //         }
            //     })
            // }

            // if(device4=="NULL"){
            //     checkn=checkn+1;
            // }else{
            //     setting.modify_device_status('on',device4).then(result4 => {
            //         if(result4 >= 0){
            //             checkn=checkn+1;
            //         }else{
            //             ans=ans+"裝置4連線失敗/";
            //             console.log("ans:"+ans);
            //         }
            //     })
            // }

            // console.log(checkn);

            // if(checkn==4){
                setting.create_gateway(mac,name,description,floor,room,device1,device2,device3,device4).then(result　=>　{
                    if (result >= 0) {
                        ans = "新增閘道器成功";
                        res.send(ans);
                    } else {
                        ans = "新增閘道器失敗";
                        res.send(ans);
                    }
                })
            // }
            break;
        case "group":
            var teamname = req.body.teamname;
            var teamtype = req.body.teamtype;
            var teamarray = req.body.teamarray;
            setting.create_team(teamname,teamtype,teamarray).then(result => {
                if (result >= 0) {
                    ans = "新增群組成功";
                    res.send(ans);
                } else {
                    ans = "新增群組失敗";
                    res.send(ans);
                }
            })
            break;
        default:
            break;
    }
});
module.exports = router;    