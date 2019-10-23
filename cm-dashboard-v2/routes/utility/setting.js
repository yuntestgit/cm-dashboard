'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

var sd = require('silly-datetime');

//---------------------------------------------
//  樓層資料
//---------------------------------------------
var floor = async function () {
    console.log("setting-floor-data");
    var result_floor = [];
    //取得資料
    await sql.query('SELECT * FROM Floor WHERE 1 ORDER BY Floor.Number ASC')
        .then((data) => {
            if (data.length >= 1) {
                var flstr = JSON.stringify(data);
                var fljso = JSON.parse(flstr);
                result_floor = fljso;
            } else {
                result_floor = [{"Number":null}];
            }
        }, (error) => {
            result_floor = null;
        });

    //回傳物件
    return result_floor;
}
//---------------------------------------------
//  新增樓層資料
//---------------------------------------------
var create_floor = async function (floor) {
    console.log("setting-floor-data-create");
    var result_floor_create;
    //取得資料
    await sql.query('INSERT INTO `Floor`(`Number`) VALUES (?)', [floor])
        .then((data) => {
            result_floor_create = data.affectedRows;
        }, (error) => {
            result_floor_create = -1;
        });
    //回傳物件
    return result_floor_create;
}
//---------------------------------------------
//  刪除樓層資料
//---------------------------------------------
var delete_floor = async function (floor) {
    console.log("setting-floor-data-delete");
    var result_floor_delete;
    //取得資料
    await sql.query('DELETE FROM `Floor` WHERE `Number` = ? ', [floor])
        .then((data) => {
            result_floor_delete = data.affectedRows;
        }, (error) => {
            result_floor_delete = -1;
        });
    //回傳物件
    return result_floor_delete;
}
//---------------------------------------------
//  房號資料
//---------------------------------------------
var room = async function () {
    console.log("setting-room-data");
    var result_room = [];
    //取得資料
    await sql.query('SELECT * FROM Room WHERE 1 ORDER BY Room.FloorNumber ASC')
        .then((data) => {
            if (data.length >= 1) {
                var rostr = JSON.stringify(data);
                var rojso = JSON.parse(rostr);
                result_room = rojso;
            } else {
                result_room = [{"id":null}];
            }
        }, (error) => {
            result_room = null;
        });
    //回傳物件
    return result_room;
}
//---------------------------------------------
//  新增房號資料
//---------------------------------------------
var create_room = async function (floor, room) {
    console.log("setting-room-data-create");
    var result_room_create;
    //取得資料
    await sql.query('INSERT INTO `Room`(`FloorNumber`, `Number`) VALUES (?,?)', [floor, room])
        .then((data) => {
            result_room_create = data.affectedRows;
        }, (error) => {
            result_room_create = -1;
        });
    //回傳物件
    return result_room_create;
}
//---------------------------------------------
//  刪除房號資料
//---------------------------------------------
var delete_room = async function (room) {
    console.log("setting-room-data-delete");
    var result_room_delete;
    //取得資料
    await sql.query('DELETE FROM `Room` WHERE `Number` = ? ', [room])
        .then((data) => {
            result_room_delete = data.affectedRows;
        }, (error) => {
            result_room_delete = -1;
        });
    //回傳物件
    return result_room_delete;
}
//---------------------------------------------
//  使用者資料
//---------------------------------------------
var user = async function () {
    console.log("setting-user-data");
    var result_user = [];
    //取得資料
    await sql.query('SELECT * FROM User WHERE 1 ORDER BY User.Room ASC')
        .then((data) => {
            if (data.length >= 1) {
                var usstr = JSON.stringify(data);
                var usjso = JSON.parse(usstr);
                result_user = usjso;
            } else {
                result_user = [{"id":null}];
            }
        }, (error) => {
            result_user = null;
        });
    //回傳物件
    return result_user;
}
//---------------------------------------------
//  新增使用者資料
//---------------------------------------------
var create_user = async function (account, password, username, email, phone) {
    console.log("setting-user-data-create");
    var result_user_create;
    //取得資料
    await sql.query('INSERT INTO `User`( `Account`, `Password`, `Username`, `Email`, `Phone`, `Role`) VALUES (?,?,?,?,?,3)', [account, password, username, email, phone])
        .then((data) => {
            result_user_create = data.affectedRows;
        }, (error) => {
            result_user_create = -1;
        });
    //回傳物件
    return result_user_create;
}
//---------------------------------------------
//  修改使用者資料
//---------------------------------------------
var modify_user = async function (account, password, username, email, phone) {
    console.log("setting-user-data-modify");
    var result_user_modify;
    //取得資料
    await sql.query('UPDATE `User` SET `Password`=?,`Username`=?,`Email`=?,`Phone`= ? WHERE `Account` = ?', [password, username, email, phone, account])
        .then((data) => {
            result_user_modify = data.affectedRows;
        }, (error) => {
            result_user_modify = -1;
        });
    //回傳物件
    return result_user_modify;
}
//---------------------------------------------
//  刪除使用者資料
//---------------------------------------------
var delete_user = async function (account) {
    console.log("setting-user-data-delete");
    var result_user_delete;
    //取得資料
    await sql.query('DELETE FROM `User` WHERE `Account` = ? ', [account])
        .then((data) => {
            result_user_delete = data.affectedRows;
        }, (error) => {
            result_user_delete = -1;
        });
    //回傳物件
    return result_user_delete;
}
//---------------------------------------------
//  新增病患資料
//---------------------------------------------
var create_patient = async function (account, username, email, phone, room) {
    console.log("setting-patient-data-create");
    var result_patient_create;
    var patient_sql;
    if (room == "") {
        //取得資料
        patient_sql="INSERT INTO User (Account, Password, Username, Email, Phone, Room, Role) VALUES ( '"+account+"', 'none' ,'"+username+"', '"+email+"', '"+phone+"', NULL, 4 )";
        await sql.query(patient_sql)
            .then((data) => {
                result_patient_create = data.affectedRows;
            }, (error) => {
                result_patient_create = -1;
            });
    } else {
        //取得資料
        patient_sql="INSERT INTO User (Account, Password, Username, Email, Phone, Room , Role) VALUES ( '"+account+"', 'none' ,'"+username+"', '"+email+"', '"+phone+"', '"+room+"',4 )";
        await sql.query(patient_sql)
            .then((data) => {
                result_patient_create = data.affectedRows;
            }, (error) => {
                result_patient_create = -1;
            });
    }
    //回傳物件
    return result_patient_create;
}
//---------------------------------------------
//  修改病患資料
//---------------------------------------------
var modify_patient = async function (account, password, username, email, phone, room) {
    console.log("setting-patient-data-modify");
    var result_patient_modify;
    if (room == "") {
        //取得資料
        await sql.query('UPDATE `User` SET `Password`=?,`Username`=?,`Email`=?,`Phone`= ? , `Room`= null WHERE `Account` = ?', [password, username, email, phone, account])
            .then((data) => {
                result_patient_modify = data.affectedRows;
            }, (error) => {
                result_patient_modify = -1;
            });
    } else {
        //取得資料
        await sql.query('UPDATE `User` SET `Password`=?,`Username`=?,`Email`=?,`Phone`= ?,`Room`= ? WHERE `Account` = ?', [password, username, email, phone, room, account])
            .then((data) => {
                result_patient_modify = data.affectedRows;
            }, (error) => {
                result_patient_modify = -1;
            });
    }
    //回傳物件
    return result_patient_modify;
}
//---------------------------------------------
//  刪除病患資料
//---------------------------------------------
var delete_patient = async function (account) {
    console.log("setting-patient-data-delete");
    var result_patinet_delete;
    //取得資料
    await sql.query('DELETE FROM `User` WHERE `Account` = ? ', [account])
        .then((data) => {
            result_patinet_delete = data.affectedRows;
        }, (error) => {
            result_patinet_delete = -1;
        });
    //回傳物件
    return result_patinet_delete;
}
//---------------------------------------------
//  以病患名稱與房號相符取得設備資料
//---------------------------------------------
var user_check_device = async function () {
    console.log("setting-user-check-device");
    var result_user_check_device = [];
    //取得資料
    await sql.query('SELECT * FROM Devices WHERE Devicetype = 2 ORDER BY Devices.Mac ASC')
        .then((data) => {
            if (data.length >= 1) {
                var chdstr = JSON.stringify(data);
                var chdjso = JSON.parse(chdstr);
                result_user_check_device = chdjso;
            } else {
                result_user_check_device = [{ "id": null }];
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
var devicetype = async function () {
    console.log("setting-devicetype-data");
    var result_devicetype = [];
    //取得資料
    await sql.query('SELECT * FROM Devicetype WHERE 1 ORDER BY Devicetype.id ASC')
        .then((data) => {
            if (data.length >= 1) {
                var dtstr = JSON.stringify(data);
                var dtjso = JSON.parse(dtstr);
                result_devicetype = dtjso;
            } else {
                result_devicetype = null;
            }
        }, (error) => {
            result_devicetype = null;
        });
    //回傳物件
    return result_devicetype;
}
//---------------------------------------------
//  設備資料
//---------------------------------------------
var devices = async function (type) {
    console.log("setting-devices-data");
    var result_devices = [];
    //取得資料
    await sql.query('SELECT * FROM Devices WHERE Devicetype = ? ORDER BY Devices.FloorNumber ASC', [type])
        .then((data) => {
            if (data.length >= 1) {
                var dvstr = JSON.stringify(data);
                var dvjso = JSON.parse(dvstr);
                result_devices = dvjso;
            } else {
                result_devices = [{ "id": null }];
            }
        }, (error) => {
            result_devices = null;
        });
    //回傳物件
    return result_devices;
}
//---------------------------------------------
//  設備全資料
//---------------------------------------------
var deviceall = async function () {
    console.log("setting-devices-alldata");
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
            result_deviceall = null;
        });
    //回傳物件
    return result_deviceall;
}
//---------------------------------------------
//  新增設備資料
//---------------------------------------------
var create_device = async function (id, mac, name, description, room, user, service, receive, send) {

    console.log("setting-device-data-create");
    // console.log(id + "/" + mac + "/" + name + "/" + description + "/" + room + "/" + user + "/" + service + "/" + receive + "/" + send);

    var floor = String(room).substring(0, 1);
    var result_device_create;

    if (room == "") {
        if (user == "") {
            await sql.query('INSERT INTO `Devices`(`Devicetype`, `Mac`, `Name`, `Description`,`ServiceUUID`, `ReceiveUUID`, `SendUUID`) VALUES (?,?,?,?,?,?,?)', [id, mac, name, description, service, receive, send])
                .then((data) => {
                    result_device_create = data.affectedRows;
                }, (error) => {
                    result_device_create = -1;
                });
        } else {
            await sql.query('INSERT INTO `Devices`(`Devicetype`, `Mac`, `Name`, `Description`, `Username`, `ServiceUUID`, `ReceiveUUID`, `SendUUID`) VALUES (?,?,?,?,?,?,?,?)', [id, mac, name, description, user, service, receive, send])
                .then((data) => {
                    result_device_create = data.affectedRows;
                }, (error) => {
                    result_device_create = -1;
                });
        }
    } else {
        if (user == "") {
            await sql.query('INSERT INTO `Devices`(`FloorNumber`, `RoomNumber`, `Devicetype`, `Mac`, `Name`, `Description`, `ServiceUUID`, `ReceiveUUID`, `SendUUID`) VALUES (?,?,?,?,?,?,?,?,?)', [floor, room, id, mac, name, description, service, receive, send])
                .then((data) => {
                    result_device_create = data.affectedRows;
                }, (error) => {
                    result_device_create = -1;
                });
        } else {
            await sql.query('INSERT INTO `Devices`(`FloorNumber`, `RoomNumber`, `Devicetype`, `Mac`, `Name`, `Description`, `Username`, `ServiceUUID`, `ReceiveUUID`, `SendUUID`) VALUES (?,?,?,?,?,?,?,?,?,?)', [floor, room, id, mac, name, description, user, service, receive, send])
                .then((data) => {
                    result_device_create = data.affectedRows;
                }, (error) => {
                    result_device_create = -1;
                });
        }
    }
    //回傳物件
    return result_device_create;
}
//---------------------------------------------
//  刪除設備資料
//---------------------------------------------
var delete_device = async function (mac) {
    console.log("setting-device-data-delete");
    var result_device_delete;
    //取得資料
    await sql.query('DELETE FROM `Devices` WHERE `Mac` = ? ', [mac])
        .then((data) => {
            result_device_delete = data.affectedRows;
        }, (error) => {
            result_device_delete = -1;
        });
    //回傳物件
    return result_device_delete;
}
//---------------------------------------------
//  修改設備資料
//---------------------------------------------
var modify_device = async function (mac, name, description, room, user) {
    console.log("setting-device-data-modify");
    // console.log(mac+"/"+name+"/"+description+"/"+room+"/"+user+"/");
    var floor;
    var result_device_modify;

    if (room == "") {
        if (user == "") {
            await sql.query('UPDATE `Devices` SET `Name`= ?,`Description`= ?, `Username`= NULL ,`RoomNumber`= NULL ,`FloorNumber`= NULL  WHERE `Mac`= ?', [name,description,mac])
                .then((data) => {
                    result_device_modify = data.affectedRows;
                }, (error) => {
                    result_device_modify = -1;
                });
        } else {
            await sql.query('UPDATE `Devices` SET `Name`= ?,`Description`= ?,`Username`= ? ,`RoomNumber`= NULL ,`FloorNumber`= NULL  WHERE `Mac`= ?', [name,description,user,mac])
                .then((data) => {
                    result_device_modify = data.affectedRows;
                }, (error) => {
                    result_device_modify = -1;
                });
        }
    } else {
        floor = String(room).substring(0, 1);
        if (user == "") {
            await sql.query('UPDATE `Devices` SET `FloorNumber`= ?,`RoomNumber`= ?,`Name`= ?,`Description`= ? , `Username`= NULL  WHERE `Mac`= ?', [floor,room,name,description,mac])
                .then((data) => {
                    result_device_modify = data.affectedRows;
                }, (error) => {
                    result_device_modify = -1;
                });
        } else {
            await sql.query('UPDATE `Devices` SET `FloorNumber`= ?,`RoomNumber`= ?,`Name`= ?,`Description`= ?, `Username`= ? WHERE `Mac`= ?', [floor,room,name,description,user,mac])
                .then((data) => {
                    result_device_modify = data.affectedRows;
                }, (error) => {
                    result_device_modify = -1;
                });
        }
    }
    //回傳物件
    return result_device_modify;
}
//---------------------------------------------
//  修改設備狀態
//---------------------------------------------
var modify_device_status = async function (action,maca) {
    console.log("setting-device-data-modify-status");

    var stal = maca.length-1;
    var mac = maca.substring(1,stal);

    var result_device_modify_status;

    await sql.query('UPDATE `Devices` SET `Status`= ? WHERE `Mac`= ?', [action,mac])
        .then((data) => {
            result_device_modify_status = data.affectedRows;
        }, (error) => {
            result_device_modify_status = -1;
        });
      
    //回傳物件
    return result_device_modify_status;
}
//---------------------------------------------
//  閘道器資料
//---------------------------------------------
var gateway = async function () {
    console.log("setting-gateway-data");
    var result_gateway = [];
    //取得資料
    await sql.query('SELECT * FROM Gateway WHERE 1')
        .then((data) => {
            if (data.length >= 1) {
                var gstr = JSON.stringify(data);
                var gjso = JSON.parse(gstr);
                result_gateway = gjso;
            } else {
                result_gateway = [{ "id": null,"Mac":null,"Name":null,"Floor":null,"Description":null,"Connectdevice1":null,"Connectdevice2":null,"Connectdevice3":null,"Connectdevice4":null}];
            }
        }, (error) => {
            result_gateway = null;
        });
    //回傳物件
    return result_gateway;
}
//---------------------------------------------
//  新增閘道器資料
//---------------------------------------------
var create_gateway = async function (mac,name,description,floor,room,device1,device2,device3,device4) {
    console.log("setting-gateway-data-create");
    // console.log(mac+","+name+","+description+","+floor+","+device1+","+device2+","+device3+","+device4);
    var result_gateway_create;
    var crt_gateway="INSERT INTO Gateway (Mac, Name, Description, Floor, Room, Connectdevice1, Connectdevice2, Connectdevice3, Connectdevice4) VALUES ( "+mac+" , "+name+" , "+description+" , "+floor+" , "+room+" , "+device1+" , "+device2+" , "+device3+" , "+device4+" )";
    // console.log(crt_gateway);
    //取得資料
    await sql.query(crt_gateway)
        .then((data) => {
            result_gateway_create = data.affectedRows;
        }, (error) => {
            result_gateway_create = -1;
    });
    //回傳物件
    return result_gateway_create;
}
//---------------------------------------------
//  修改閘道器資料
//---------------------------------------------
var modify_gateway = async function (mac,name,description,floor,device1,device2,device3,device4) {
    console.log("setting-gateway-data-modify");
    // console.log(mac+","+name+","+description+","+floor+","+device1+","+device2+","+device3+","+device4);
    var result_gateway_modify;
    var mdt_gateway="UPDATE Gateway SET Name = "+name+" ,Description= "+description+" ,Floor= "+floor+" ,Connectdevice1= "+device1+" ,Connectdevice2= "+device2+" ,Connectdevice3= "+device3+" ,Connectdevice4= "+device4+" WHERE Mac = '"+mac+"'";
    // console.log(mdt_gateway);
    //取得資料
    await sql.query(mdt_gateway)
        .then((data) => {
            result_gateway_modify = data.affectedRows;
        }, (error) => {
            result_gateway_modify = -1;
    });
    //回傳物件
    return result_gateway_modify;
}
//---------------------------------------------
//  刪除閘道器資料
//---------------------------------------------
var delete_gateway = async function (mac) {
    console.log("setting-gateway-data-delete");
    var result_gateway_delete;
    //取得資料
    await sql.query('DELETE FROM `Gateway` WHERE `Mac` = ? ', [mac])
        .then((data) => {
            result_gateway_delete = data.affectedRows;
        }, (error) => {
            result_gateway_delete = -1;
        });
    //回傳物件
    return result_gateway_delete;
}
//---------------------------------------------
//  新增設備資料表
//---------------------------------------------
var create_device_table = async function (id,mac) {
    console.log("setting-device-table-create");
    var result_device_create_table;
    var tablename;

    switch (id){
        case '2'://床
            tablename="CREATE TABLE "+mac+" (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,`Head` int(191) NOT NULL,`Foot` int(191) NOT NULL,`Bed` int(191) NOT NULL,`Time` varchar(191) NOT NULL,`Record` int(10) DEFAULT NULL,`Status` int(191) NOT NULL DEFAULT 0 COMMENT '狀態')";
            break;
        case '3'://睡眠帶
            tablename="CREATE TABLE "+mac+" (`id` int (11) NOT NULL  PRIMARY KEY AUTO_INCREMENT, `Breathe` int(191) NOT NULL, `Bloodoxygen` int(191) NOT NULL, `Heartrate` int(191) NOT NULL, `Time` varchar(191) NOT NULL,`Class` varchar(191) NOT NULL DEFAULT '"+mac+"',`Status` int(191) NOT NULL DEFAULT 0 COMMENT '狀態' )";
            break;
        case '4'://感知照明
            tablename="CREATE TABLE "+mac+" (`id` int (11) NOT NULL  PRIMARY KEY AUTO_INCREMENT, `Light` int(191) NOT NULL, `Colorvalue` int(191) NOT NULL, `Wat` int(191) NOT NULL, `Time` varchar(191) NOT NULL,`Status` int(191) NOT NULL DEFAULT 0 COMMENT '狀態' )";
            break;
        case '5'://加濕器
            tablename="CREATE TABLE "+mac+" (`id` int (11) NOT NULL  PRIMARY KEY AUTO_INCREMENT, `Wet` int(191) NOT NULL COMMENT '濕度' , `Wat` int(191) NOT NULL COMMENT '電量' , `Time` varchar(191) NOT NULL,`Status` int(191) NOT NULL DEFAULT 0 COMMENT '狀態' )";
            break;
        case '6'://空氣質量
            tablename="CREATE TABLE "+mac+" (`id` int (11) NOT NULL  PRIMARY KEY AUTO_INCREMENT, `Wet` int(191) NOT NULL, `Temperature` int(191) NOT NULL, `PM` int(191) NOT NULL COMMENT 'PM2.0' , `CO2` int(191) NOT NULL COMMENT '二氧化碳' , `CHA` int(191) NOT NULL COMMENT '甲醛' , `TVOC` int(191) NOT NULL COMMENT '揮發性氣體', `Wat` int(191) NOT NULL COMMENT '電量' , `Time` varchar(191) NOT NULL,`Status` int(191) NOT NULL DEFAULT 0 COMMENT '狀態' )";
            break;
        case '7':
            tablename="CREATE TABLE "+mac+" (`id` int (11) NOT NULL  PRIMARY KEY AUTO_INCREMENT, `SBP` int(191) UNSIGNED NOT NULL, `DBP` int(191) UNSIGNED NOT NULL, `Heartrate` int(191) UNSIGNED NOT NULL, `Time` varchar(191) NOT NULL,`Status` int(191) NOT NULL DEFAULT 0 COMMENT '狀態' )" 
            break;
        case '8'://脂肪計
            tablename="CREATE TABLE "+mac+" (`id` int (11) NOT NULL  PRIMARY KEY AUTO_INCREMENT, `Fat` int(191) NOT NULL, `Water` int(191) NOT NULL, `Muscle` int(191) NOT NULL, `Bone` int(191) NOT NULL, `Time` varchar(191) NOT NULL,`Status` int(191) NOT NULL DEFAULT 0 COMMENT '狀態' )";
            break;
        case '9'://電動桌
            tablename="";
            break;
        case '10'://電動沙發
            tablename="";
            break;
        case '11'://血糖計
            tablename="CREATE TABLE "+mac+" (`id` int (11) NOT NULL  PRIMARY KEY AUTO_INCREMENT, `Bloodglucose` int(191) NOT NULL, `Time` varchar(191) NOT NULL,`Status` int(191) NOT NULL DEFAULT 0 COMMENT '狀態' )";
            break;
        case '12'://額溫計
            tablename="CREATE TABLE "+mac+" (`id` int (11) NOT NULL  PRIMARY KEY AUTO_INCREMENT, `Temperature` int(191) NOT NULL, `Time` varchar(191) NOT NULL,`Status` int(191) NOT NULL DEFAULT 0 COMMENT '狀態' )";
            break;
        default:
            break;
    }

    await sql.query(tablename)
        .then((data) => {
            result_device_create_table = data.affectedRows;
        }, (error) => {
            result_device_create_table = -1;
        });
    //回傳物件
    return result_device_create_table;
}
//---------------------------------------------
//  新增設備資料表預設值
//---------------------------------------------
var create_table_data = async function (id,mac) {
    console.log("setting-device-table-data");
    var result_device_table_data;
    var defaultdata;
    var Current_time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    // console.log("id:"+id);
    // console.log("mac:"+mac);

    switch (id){
        case '2':
            defaultdata = "INSERT INTO `"+mac+"` ( `id` , `Head` , `Foot` , `Bed` , `Time` , `Record` ) VALUES (NULL, 0, 0, 0, '"+Current_time+"', NULL)";
            break;
        case '3':
            defaultdata = "INSERT INTO `"+mac+"` ( `id` , `Breathe` , `Bloodoxygen` , `Heartrate` , `Time` ) VALUES (NULL, 0, 0, 0, '"+Current_time+"')";
            break;
        case '4':
            defaultdata = "INSERT INTO `"+mac+"` ( `id` , `Light` , `Colorvalue` , `Wat` , `Time` ) VALUES (NULL, 0, 0, 0, '"+Current_time+"')";
            break;
        case '5':
            defaultdata = "INSERT INTO `"+mac+"` ( `id` , `Wat` , `Wet` , `Time` ) VALUES (NULL, 0, 0, '"+Current_time+"')";
            break;
        case '6':
            defaultdata = "INSERT INTO `"+mac+"` ( `id` , `Wat` , `Wet` , `Temperature` , `PM` , `CO2` , `CHA` , `TVOC` , `Time` ) VALUES (NULL, 0, 0, 0, 0, 0, 0, 0, '"+Current_time+"')";
            break;
        case '7':
            defaultdata = "INSERT INTO `"+mac+"` ( `id` , `SBP` , `DBP` , `Heartrate` , `Time` ) VALUES (NULL, 0, 0, 0, '"+Current_time+"')";
            break;
        case '8':
            defaultdata = "INSERT INTO `"+mac+"` ( `id` , `Fat` , `Water` , `Muscle` , `Bone` , `Time` ) VALUES (NULL, 0, 0, 0, 0, '"+Current_time+"')";
            break;
        case '9':
            defaultdata = "";
            break;
        case '10':
            defaultdata = "";
            break;
        case '11':
            defaultdata = "INSERT INTO `"+mac+"` ( `id` , `Bloodglucose` , `Time` ) VALUES (NULL, 0, '"+Current_time+"')";
            break;
        case '12':
            defaultdata = "INSERT INTO `"+mac+"` ( `id` , `Temperature` , `Time` ) VALUES (NULL, 0, '"+Current_time+"')";
            break;
        default:
            break;
    }

    // console.log(defaultdata);
    await sql.query(defaultdata)
        .then((data) => {
        // console.log(data);
            result_device_table_data = data.affectedRows;
        }, (error) => {
            result_device_table_data = -1;
        });
    //回傳物件
    return result_device_table_data;
}
//---------------------------------------------
//  刪除設備資料表
//---------------------------------------------
var delete_device_table = async function (value) {
    console.log("setting-device-table-delete");
    var result_device_delete_table;
    var deletesql = "DROP TABLE "+value+"";
    await sql.query(deletesql)
        .then((data) => {
            result_device_delete_table = data.affectedRows;
        }, (error) => {
            result_device_delete_table = -1;
        });
    //回傳物件
    return result_device_delete_table;
}
//---------------------------------------------
//  設備即時資料
//---------------------------------------------
var devices_realtime_data = async function (newsql) {
    console.log("setting-devices-realtime-data");
    var result_devices_realtime_data = [];
    var device_realtime = newsql.substring(5);
    //取得資料
    await sql.query(device_realtime)
        .then((data) => {
            if (data.length >= 1) {
                var device_realtime_str = JSON.stringify(data);
                var device_realtime_jso = JSON.parse(device_realtime_str);
                result_devices_realtime_data = device_realtime_jso;
            } else {
                result_devices_realtime_data = [{ "id": null }];
            }
        }, (error) => {
            result_devices_realtime_data = null;
        });
    //回傳物件
    return result_devices_realtime_data;
}
//---------------------------------------------
//  設備>>>>使用者
//---------------------------------------------
var devices_username = async function (mac) {
    console.log("setting-devices-detail-username");
    var result_devices_username = [];
    //取得資料
    await sql.query('SELECT Username FROM Devices WHERE Mac = ? ', [mac])
        .then((data) => {
            if (data.length == 1) {
                var device_username_str = JSON.stringify(data);
                var device_username_jso = JSON.parse(device_username_str);
                result_devices_username = device_username_jso;
            } else {
                result_devices_username = [{ "id": null }];
            }
        }, (error) => {
            result_devices_username = null;
        });
    //回傳物件
    return result_devices_username;
}
//---------------------------------------------
//  設備>>>>詳細資料
//---------------------------------------------
var devices_detail = async function (mac) {
    console.log("setting-devices-detail-data");
    var result_devices_detail = [];
    var device_dit = "SELECT * FROM `" + mac + "` WHERE 1";
    // 取得設備詳細資料
    await sql.query(device_dit)
        .then((data) => {
            if (data.length >= 1) {
                var device_detail_str = JSON.stringify(data);
                var device_detail_jso = JSON.parse(device_detail_str);
                result_devices_detail = device_detail_jso;
            } else {
                result_devices_detail = [{ "id": null }];
            }
        }, (error) => {
            result_devices_detail = null;
        });
    //回傳物件
    return result_devices_detail;
}
//---------------------------------------------
//  群組資料
//---------------------------------------------
var team = async function () {
    console.log("setting-team-data");
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
//  新增群組資料
//---------------------------------------------
var create_team = async function (teamname,teamtype,teamarray) {
    console.log("setting-team-data-create");
    var result_create_team ;
    var id = Math.random().toString(36).substring(7);
    
    //取得資料
    await sql.query('INSERT INTO `Team`(`Teamid`, `Teamname`, `Devicetype`, `Devicemac`) VALUES (?,?,?,?)',[id,teamname,teamtype,teamarray])
        .then((data_ctc) => {
        // console.log(data_ctc);
            result_create_team = data_ctc.affectedRows;
        }, (error) => {
            result_create_team = null;
        });
    //回傳物件
    return result_create_team;
}
//---------------------------------------------
//  刪除群組資料
//---------------------------------------------
var delete_team = async function (mac) {
    console.log("setting-team-data-delete");
    var result_delete_team;
    //取得資料
    await sql.query('DELETE FROM `Team` WHERE `Teamid` = ? ', [mac])
        .then((data) => {
            result_delete_team = data.affectedRows;
        }, (error) => {
            result_delete_team = -1;
        });
    //回傳物件
    return result_delete_team;
}
//---------------------------------------------
//  修改群組資料
//---------------------------------------------
var modify_team = async function (mac,teamname,teamtype,teamarray) {
    console.log("setting-team-data-modify");
    var result_modify_team;
    // var sql_md="UPDATE Team SET Teamname = "+teamname+" ,Devicetype = "+teamtype+" ,Devicemac = "+teamarray+" WHERE Teamid = "+mac
    //取得資料
    await sql.query('UPDATE `Team` SET `Teamname`= ? ,`Devicetype`= ? ,`Devicemac`= ? WHERE `Teamid`= ? ',[teamname,teamtype,teamarray,mac])
        .then((data_tmd) => {
        // console.log(data_tmd);
            result_modify_team = data_tmd.affectedRows;
        }, (error) => {
            result_modify_team = -1;
        });
    //回傳物件
    return result_modify_team;
}
//匯出
module.exports = { floor, create_floor, delete_floor, room, create_room, delete_room, user, create_user, modify_user, delete_user, create_patient, modify_patient, delete_patient, user_check_device, devicetype, devices,deviceall,create_device,delete_device,modify_device,modify_device_status,gateway,create_gateway,modify_gateway,delete_gateway,create_device_table,delete_device_table, devices_realtime_data, devices_username, devices_detail, team, create_team,delete_team,modify_team,create_table_data};