'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
//  樓層資料
//---------------------------------------------
var floor = async function(){   
    console.log("layer-floor-data");
    var result_floor=[];
    //取得資料
    await sql.query('SELECT * FROM Floor WHERE 1 ORDER BY Floor.Number ASC')
        .then((data) => {
            if(data.length >= 1){
                var flstr = JSON.stringify(data);
                var fljso = JSON.parse(flstr);
                result_floor = fljso;
            }else{
                result_floor = [{"Number":null}];
            } 
        }, (error) => {
            result_floor = null;
        });

    //回傳物件
    return result_floor;
}
//---------------------------------------------
//  房號資料
//---------------------------------------------
var room = async function(){   
    console.log("layer-room-data");
    var result_room=[];
    //取得資料
    await sql.query('SELECT * FROM Room WHERE 1 ORDER BY Room.FloorNumber ASC')
        .then((data) => {
            if(data.length >= 1){
                var rostr = JSON.stringify(data);
                var rojso = JSON.parse(rostr);
                result_room = rojso;
            }else{
                result_room = [{"id":null}];
            } 
        }, (error) => {
            result_room = null;
        });
    //回傳物件
    return result_room;
}
//---------------------------------------------
//  使用者資料
//---------------------------------------------
var user = async function(){   
    console.log("layer-user-data");
    var result_user=[];
    //取得資料
    await sql.query('SELECT * FROM User WHERE 1 ORDER BY User.Room ASC')
        .then((data) => {
            if(data.length >= 1){
                var usstr = JSON.stringify(data);
                var usjso = JSON.parse(usstr);
                result_user = usjso;
            }else{
                result_user = [{"id":null}];
            } 
        }, (error) => {
            result_user = null;
        });
    //回傳物件
    return result_user;
}
//---------------------------------------------
//  病患資料
//---------------------------------------------
var patient = async function(){   
    console.log("layer-patient-data");
    var result_patient=[];
    //取得資料
    await sql.query('SELECT * FROM User WHERE Role = 4 ORDER BY User.Room ASC')
        .then((data) => {
            if(data.length >= 1){
                var ptstr = JSON.stringify(data);
                var ptjso = JSON.parse(ptstr);
                result_patient = ptjso;
            }else{
                result_patient = [{"id":null}];
            } 
        }, (error) => {
            result_patient = null;
        });
    //回傳物件
    return result_patient;
}
//---------------------------------------------
//  以病患名稱與房號相符取得設備資料
//---------------------------------------------
var user_check_device = async function(){   
    console.log("layer-user-check-device");
    var result_user_check_device=[];
    //取得資料
    await sql.query('SELECT * FROM Devices WHERE Devicetype = 3 ORDER BY Devices.Mac ASC')
        .then((data) => {
            if(data.length >= 1){
                var chdstr = JSON.stringify(data);
                var chdjso = JSON.parse(chdstr);
                result_user_check_device = chdjso;
            }else{
                result_user_check_device = [{"id":null}];
            } 
        }, (error) => {
            result_user_check_device = null;
        });
    //回傳物件
    return result_user_check_device;
}
//---------------------------------------------
//  設備種類
//---------------------------------------------
var devicetype = async function(){   
    console.log("layer-devicetype-data");
    var result_devicetype=[];
    //取得資料
    await sql.query('SELECT * FROM Devicetype WHERE 1 ORDER BY Devicetype.id ASC')
        .then((data) => {
            if(data.length >= 1){
                var dtstr = JSON.stringify(data);
                var dtjso = JSON.parse(dtstr);
                result_devicetype = dtjso;
            }else{
                result_devicetype = null;
            } 
        }, (error) => {
            console.log(error);
            result_devicetype = null;
        });
    //回傳物件
    return result_devicetype;
}
//---------------------------------------------
//  設備資料
//---------------------------------------------
var devices = async function(room_nb){   
    console.log("layer-devices-data");
    // console.log(room_nb);
    var result_devices=[];
    //取得資料
    await sql.query('SELECT * FROM Devices WHERE RoomNumber = ? ORDER BY Devices.Username ASC',[room_nb])
        .then((data) => {
            if(data.length >= 1){
                var dvstr = JSON.stringify(data);
                var dvjso = JSON.parse(dvstr);
                result_devices = dvjso;
            }else{
                result_devices = [{"id":null}];
            } 
        }, (error) => {
            console.log(error);
            result_devices = null;
        });
    //回傳物件
    return result_devices;
}
//---------------------------------------------
//  設備資料>>mac
//---------------------------------------------
var devices_mac = async function(mac){   
    console.log("layer-devices-data-mac");
    var result_devices_mac=[];
    //取得資料
    await sql.query('SELECT * FROM Devices WHERE Mac = ? ',[mac])
        .then((data) => {
            if(data.length >= 1){
                var dvstr = JSON.stringify(data);
                var dvjso = JSON.parse(dvstr);
                result_devices_mac = dvjso;
            }else{
                result_devices_mac = [{"id":null}];
            } 
        }, (error) => {
            console.log(error);
            result_devices_mac = null;
        });
    //回傳物件
    return result_devices_mac;
}
//---------------------------------------------
//  設備即時資料
//---------------------------------------------
var devices_realtime_data = async function(newsql){   
    console.log("layer-devices-realtime-data");
    var result_devices_realtime_data=[];
    var device_realtime = newsql.substring(5);    
    //取得資料
    await sql.query(device_realtime)
        .then((data) => {
            if(data.length >= 1){
                var device_realtime_str = JSON.stringify(data);
                var device_realtime_jso = JSON.parse(device_realtime_str);
                result_devices_realtime_data = device_realtime_jso;
            }else{
                result_devices_realtime_data = [{"id":null}];
            } 
        }, (error) => {
            console.log(error);
            result_devices_realtime_data = null;
        });
    //回傳物件
    return result_devices_realtime_data;
}
//---------------------------------------------
//  設備>>>>使用者
//---------------------------------------------
var devices_username = async function(mac){   
    console.log("layer-devices-detail-username");
    var result_devices_username=[];
    //取得資料
    await sql.query('SELECT Username FROM Devices WHERE Mac = ? ',[mac])
        .then((data) => {
            if(data.length == 1){
                var device_username_str = JSON.stringify(data);
                var device_username_jso = JSON.parse(device_username_str);
                result_devices_username = device_username_jso;
            }else{
                result_devices_username = [{"id":null}];
            } 
        }, (error) => {
            result_devices_username = null;
        });
    //回傳物件
    return result_devices_username;
}
//---------------------------------------------
//  設備>>>患者
//---------------------------------------------
var devices_patient = async function(username){   
    console.log("layer-devices-detail-mac");
    var result_devices_mac=[];
    //取得資料
    await sql.query('SELECT Mac FROM Devices WHERE Username = ? ',[username])
        .then((data) => {
            if(data.length >= 1){
                var device_mac_str = JSON.stringify(data);
                var device_mac_jso = JSON.parse(device_mac_str);
                result_devices_mac = device_mac_jso;
            }else{
                result_devices_mac = [{"id":null}];
            } 
        }, (error) => {
            result_devices_mac = null;
        });
    //回傳物件
    return result_devices_mac;
}
//---------------------------------------------
//  設備>>>>詳細資料
//---------------------------------------------
var devices_detail = async function(mac){   
    console.log("layer-devices-detail-data");
    var result_devices_detail=[];
    var device_dit ="SELECT * FROM `" + mac + "` WHERE 1";
    // 取得設備詳細資料
    await sql.query(device_dit)
        .then((data) => {
            if(data.length >= 1){
                var device_detail_str = JSON.stringify(data);
                var device_detail_jso = JSON.parse(device_detail_str);
                result_devices_detail = device_detail_jso;
            }else{
                result_devices_detail = [{"id":null}];
            } 
        }, (error) => {
            console.log(error);
            result_devices_detail = null;
        });    
    //回傳物件
    return result_devices_detail;
}
//---------------------------------------------
//  設備>>陣列>>告警值
//---------------------------------------------
var devices_array_threshold = async function(array_mac_t){   
    console.log("layer-devices-threshold");
    var result_devices_array_threshold=[];
    for (var i=0;i<array_mac_t.length;i++){
        var device_ditt ="SELECT `Threshold` , `Devicetype` FROM `Devices` WHERE `Mac` =  '"+array_mac_t[i].Mac+"'";
        // 取得設備詳細資料
        await sql.query(device_ditt)
            .then((data) => {
                if(data.length >= 1){
                    var device_mac_tstr = JSON.stringify(data);
                    var device_mac_tjso = JSON.parse(device_mac_tstr);
                    result_devices_array_threshold[i] = device_mac_tjso;
                }else{
                    result_devices_array_threshold = [{"id":null}];
                } 
            }, (error) => {
                console.log(error);
                result_devices_array_threshold = null;
            });
    }
    //回傳物件
    return result_devices_array_threshold;
}
//---------------------------------------------
//  設備>>陣列>>詳細資料
//---------------------------------------------
var devices_array_detail = async function(array_mac_d){   
    console.log("layer-devices-array-detail-data");
    var result_devices_array_detail=[];
    for (var i=0;i<array_mac_d.length;i++){
        var device_dittt ="SELECT * FROM " + array_mac_d[i].Mac + " WHERE `Status`=0 ";
        // 取得設備詳細資料
        await sql.query(device_dittt)
            .then((data) => {
                if(data.length >= 1){
                    var device_detail_mac_str = JSON.stringify(data);
                    var device_detail_mac_jso = JSON.parse(device_detail_mac_str);
                    result_devices_array_detail[i] = device_detail_mac_jso;
                }else{
                    result_devices_array_detail = [{"id":null}];
                } 
            }, (error) => {
                console.log(error);
                result_devices_array_detail = null;
            });
    }
    //回傳物件
    return result_devices_array_detail;
}
//---------------------------------------------
//  群組資料
//---------------------------------------------
var team = async function () {
    console.log("layer-team-data");
    var result_team = [];
    //取得資料
    await sql.query('SELECT * FROM Team WHERE 1')
        .then((data) => {
            if (data.length >= 1) {
                var testr = JSON.stringify(data);
                var tejso = JSON.parse(testr);
                result_team = tejso;
            } else {
                result_team = [{ "id": null }];
            }
        }, (error) => {
            result_team = null;
        });
    //回傳物件
    return result_team;
}
//---------------------------------------------
//  群組核對資料
//---------------------------------------------
var teamcheck = async function (teamid) {
    console.log("layer-team-data-check");
    // console.log("teamid:"+teamid);
    var result_team_check = [];
    //取得資料
    await sql.query('SELECT * FROM Team WHERE Teamid = ? ',[teamid])
        .then((data) => {
            if (data.length = 1) {
                var testr1 = JSON.stringify(data);
                var tejso1 = JSON.parse(testr1);
                result_team_check = tejso1;
            } else {
                result_team_check = [{ "id": null }];
            }
        }, (error) => {
            result_team_check = null;
        });

    //回傳物件
    return result_team_check;
}
//---------------------------------------------
//  設備全資料
//---------------------------------------------
var deviceall = async function () {
    console.log("layer-devices-alldata");
    var result_deviceall = [];
    //取得資料
    await sql.query('SELECT * FROM Devices WHERE 1')
        .then((data) => {
            if (data.length >= 1) {
                var dvastr = JSON.stringify(data);
                var dvajso = JSON.parse(dvastr);
                result_deviceall = dvajso;
            } else {
                result_deviceall = [{ "id": null }];
            }
        }, (error) => {
            console.log(error);
            result_deviceall = null;
        });
    //回傳物件
    return result_deviceall;
}

//---------------------------------------------
//  床>>>>>設備>>>>詳細資料
//---------------------------------------------
var bed_record = async function(mac){   
    console.log("layer-bed-record");
    var result_bed_record=[];
    var bed_rec ="(SELECT * FROM `" + mac + "` WHERE `Record`=1 ORDER BY `Time`  DESC LIMIT 1) UNION (SELECT * FROM `"+ mac + "`  WHERE `Record`=2 ORDER BY `Time`  DESC LIMIT 1)";
    // 取得設備詳細資料
    await sql.query(bed_rec)
        .then((data) => {
            //console.log(data);
            if(data.length >= 1){
                if (data[0].Record==1){
                    var device_detail_str = JSON.stringify(data);
                    var device_detail_jso = JSON.parse(device_detail_str);
                    result_bed_record = '['+device_detail_jso+',{"Record":null}]';
                }
                else{
                    var device_detail_str = JSON.stringify(data);
                    var device_detail_jso = JSON.parse(device_detail_str);
                    result_bed_record = '[{"Record":null},'+device_detail_jso+']';
                }
                
            }else{
                result_bed_record = [{"Record":null},{"Record":null}];
            } 
        }, (error) => {
            result_bed_record = null;
        });    
    //回傳物件
    return result_bed_record;
}
//---------------------------------------------
//  閘道器核對資料
//---------------------------------------------
var devices_gatewayMac = async function (mac) {
    console.log("layer-bed-gatewayMac");
    var result_bed_gateway = [];
    //取得資料
    await sql.query('SELECT * FROM Gateway WHERE Connectdevice1 = ? OR Connectdevice2 = ? OR Connectdevice3 = ? OR Connectdevice4 = ?',[mac,mac,mac,mac])
        .then((data) => {
            if (data.length >= 1) {
                var gbstr = JSON.stringify(data);
                var gbjso = JSON.parse(gbstr);
                result_bed_gateway = gbjso;
            } else {
                result_bed_gateway = [{Mac:"NULL"}];
            }
        }, (error) => {
            result_bed_gateway = null;
        });
    //回傳物件
    return result_bed_gateway;
}
//---------------------------------------------
//  新增排程資料
//---------------------------------------------
var calendar_create = async function (mac,startdate,startvalue,enddate,endvalue) {
    console.log("layer-bed-calendar-create");
    var result_bed_calendar_create = [];
    //取得資料
    await sql.query('INSERT INTO `Calendar`(`Devicemac`, `Startdate`, `Startvalue`, `Enddate`, `Endvalue`) VALUES (?,?,?,?,?)',[mac,startdate,startvalue,enddate,endvalue])
        .then((data) => {
            result_bed_calendar_create = data.affectedRows;
        }, (error) => {
            result_bed_calendar_create = -1;
        });
    //回傳物件
    return result_bed_calendar_create;
}
//---------------------------------------------
//  設備群組>>>>使用者
//---------------------------------------------
var group_devices_name = async function(array_mac){   
    console.log("layer-group-devices-detail-name");
    var result_group_devices_name=[];
    for (var i=0;i<array_mac.length;i++){
    //取得資料
        await sql.query('SELECT Name FROM Devices WHERE Mac = ? ',[array_mac[i]])
            .then((data) => {
                if(data.length == 1){
                    var device_name_str = JSON.stringify(data);
                    var device_name_jso = JSON.parse(device_name_str);
                    result_group_devices_name[i] = device_name_jso;
                }else{
                    result_group_devices_name = [{"id":null}];
                } 
            }, (error) => {
                result_group_devices_name = null;
            });
    }
    //回傳物件
    return result_group_devices_name;
}
//---------------------------------------------
//  群組設備>>>>詳細資料
//---------------------------------------------
var group_devices_detail = async function(array_mac){   
    console.log("layer-group-devices-detail-data");
    var result_group_devices_detail=[];
    for (var i=0;i<array_mac.length;i++){
        
        var device_dit ="SELECT * FROM " + array_mac[i] + " WHERE 1";
        
        // 取得設備詳細資料
        await sql.query(device_dit)
            .then((data) => {
                //console.log(data.length);
                if(data.length >= 1){
                    var device_detail_str = JSON.stringify(data);
                    var device_detail_jso = JSON.parse(device_detail_str);
                    result_group_devices_detail[i] = device_detail_jso;
                }else{
                    result_group_devices_detail = [{"id":null}];
                } 
            }, (error) => {
                console.log(error);
                result_group_devices_detail = null;
            });    
    }
    //回傳物件
    return result_group_devices_detail;
}
var group_devices_gatewayMac = async function (array_mac) {
    console.log("layer-bed-group-gatewayMac");
    var result_bed_group_gateway = [];
    for (var i=0;i<array_mac.length;i++){
        //取得資料
        await sql.query('SELECT * FROM Gateway WHERE Connectdevice1 = ? OR Connectdevice2 = ? OR Connectdevice3 = ? OR Connectdevice4 = ?',[array_mac[i],array_mac[i],array_mac[i],array_mac[i]])
            .then((data) => {
                if (data.length >= 1) {
                    var gbstr = JSON.stringify(data);
                    var gbjso = JSON.parse(gbstr);
                    result_bed_group_gateway[i] = gbjso;
                } else {
                    result_bed_group_gateway = [{ "Mac": "NONE" }];
                }
            }, (error) => {
                result_bed_group_gateway = [{ "Mac": "NONE" }];
            });
    }
    //回傳物件
    return result_bed_group_gateway;
}
//---------------------------------------------
//  陣列>患者>設備>睡眠帶
//---------------------------------------------
var patient_array_sleeptape = async function(patient_array){
    console.log("layer-patient-array-sleeptape");
    var result_array_sleeptape_threshold=[];
    for (var i=0;i<patient_array.length;i++){
        var patient_array_sql ="SELECT `Username` , `Mac` , `Threshold` FROM `Devices` WHERE  `Devicetype` = '3' && `Username` = '"+patient_array[i]+"'";
        // 取得設備詳細資料
        await sql.query(patient_array_sql)
            .then((data) => {
                if(data.length >= 1){
                    // console.log(data);
                    var device_sleeptape_mac_tstr = JSON.stringify(data);
                    var device_sleeptape_mac_tjso = JSON.parse(device_sleeptape_mac_tstr);
                    result_array_sleeptape_threshold[i] = device_sleeptape_mac_tjso;
                }else{
                    result_array_sleeptape_threshold[i] = [{"Threshold":"NULL","Mac":"NULL"}];
                } 
            }, (error) => {
                console.log(error);
                result_array_sleeptape_threshold = null;
            });
    }
    //回傳物件
    return result_array_sleeptape_threshold;
}
//---------------------------------------------
//  設備>>告警值
//---------------------------------------------
var devices_threshold = async function(mac){
    console.log("layer-devices-threshold");
    var result_devices_threshold=[];
    var device_ditt ="SELECT `Threshold` FROM `Devices` WHERE `Mac` = '"+mac+"'";
    // 取得設備詳細資料
    await sql.query(device_ditt).then((data) => {
        if(data.length >= 1){
            var device_mac_tstr = JSON.stringify(data);
            var device_mac_tjso = JSON.parse(device_mac_tstr);
            result_devices_threshold = device_mac_tjso;
        }else{
            result_devices_threshold = null;
        }
    },(error) => {
        console.log(error);
        result_devices_threshold = null;
    });
    //回傳物件
    return result_devices_threshold;
}
//---------------------------------------------
//  群組>>睡眠帶設備>>詳細資料
//---------------------------------------------
var group_devices_detail_sleeptape = async function(array_mac){
    // console.log(array_mac);
    console.log("layer-group-sleeptape-devices-detail-data");
    var result_group_devices_detail=[];
    for (var i=0;i<array_mac.length;i++){
        
        if(array_mac[i]=='NULL'){
            result_group_devices_detail[i] = [{"id":null}];
        }else{

            var device_dit ="SELECT * FROM " + array_mac[i] + " WHERE `Status`=0";
        
            // 取得設備詳細資料
            await sql.query(device_dit)
                .then((data) => {
                    // console.log(data.length);
                    if(data.length >= 1){
                        var device_detail_str = JSON.stringify(data);
                        var device_detail_jso = JSON.parse(device_detail_str);
                        result_group_devices_detail[i] = device_detail_jso;
                    }else{
                        result_group_devices_detail = [{"id":null}];
                    } 
                }, (error) => {
                    console.log(error);
                    result_group_devices_detail = null;
                });  
        }
    }
    //回傳物件
    return result_group_devices_detail;
}
//匯出
module.exports = {floor,room,user,patient,user_check_device,devicetype,devices,devices_mac,devices_threshold,devices_realtime_data,devices_username,devices_patient,devices_detail,team,teamcheck,devices_array_detail,devices_array_threshold,deviceall,bed_record,devices_gatewayMac,calendar_create,group_devices_detail,group_devices_gatewayMac,patient_array_sleeptape,group_devices_name,group_devices_detail_sleeptape};