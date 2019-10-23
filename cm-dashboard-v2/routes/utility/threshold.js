'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
//  修改告警值資料(床)
//---------------------------------------------
var modify_bed = async function (mac,head,foot,bed) {
    console.log("threshold-data-bed");
    var result = [];
    var threshold_bed;
    var sqlstring_bed;
    threshold_bed = "[\""+head+"\",\""+foot+"\",\""+bed+"\"]";
    if(head=="NULL" && foot=="NULL" && bed=="NULL"){
        sqlstring_bed = "UPDATE `Devices` SET `Threshold`= NULL WHERE `Mac` = '"+mac+"'";
    }else{
        sqlstring_bed = "UPDATE `Devices` SET `Threshold`= '"+threshold_bed+"' WHERE `Mac` = '"+mac+"'";
    }
    // console.log(sqlstring_bed);
    //取得資料
    await sql.query(sqlstring_bed)
        .then((data) => {
            result = data.affectedRows;
        }, (error) => {
            result = -1;
        });

    //回傳物件
    return result;
}
//---------------------------------------------
//  修改告警值資料(睡眠帶)
//---------------------------------------------
var modify_sleeptape = async function (mac,breath,heartbreak,turnoff) {
    console.log("threshold-data-sleeptape");
    var result = [];
    var threshold_sleeptape;
    var sqlstring_sleeptape;
    threshold_sleeptape = "[\""+breath+"\",\""+heartbreak+"\",\""+turnoff+"\"]";
    if(breath=="NULL" && heartbreak=="NULL" && turnoff=="NULL"){
        sqlstring_sleeptape = "UPDATE `Devices` SET `Threshold`= NULL WHERE `Mac` = '"+mac+"'";
    }else{
        sqlstring_sleeptape = "UPDATE `Devices` SET `Threshold`= '"+threshold_sleeptape+"' WHERE `Mac` = '"+mac+"'";
    }
    // console.log(sqlstring_sleeptape);
    //取得資料
    await sql.query(sqlstring_sleeptape)
        .then((data) => {
            result = data.affectedRows;
        }, (error) => {
            result = -1;
        });

    //回傳物件
    return result;
}
//---------------------------------------------
//  修改告警值資料(加濕器)
//---------------------------------------------
var modify_humidifier = async function (mac,wet,wat) {
    console.log("threshold-data-humidifier");
    var result = [];
    var threshold_humidifier;
    var sqlstring_humidifier;
    threshold_humidifier = "[\""+wet+"\",\""+wat+"\"]";
    if(wet=="NULL" && wat=="NULL"){
        sqlstring_humidifier = "UPDATE `Devices` SET `Threshold`= NULL WHERE `Mac` = '"+mac+"'";
    }else{
        sqlstring_humidifier = "UPDATE `Devices` SET `Threshold`= '"+threshold_humidifier+"' WHERE `Mac` = '"+mac+"'";
    }
    // console.log(sqlstring_humidifier);
    //取得資料
    await sql.query(sqlstring_humidifier)
        .then((data) => {
            result = data.affectedRows;
        }, (error) => {
            result = -1;
        });

    //回傳物件
    return result;
}
//---------------------------------------------
//  修改告警值資料(血壓計)
//---------------------------------------------
var modify_bloodpressure = async function (mac,sbp,dbp,heartrate) {
    console.log("threshold-data-bloodpressure");
    var result = [];
    var threshold_bloodpressure;
    var sqlstring_bloodpressure;
    threshold_bloodpressure = "[\""+sbp+"\",\""+dbp+"\",\""+heartrate+"\"]";
    if(sbp=="NULL" && dbp=="NULL" && heartrate=="NULL"){
        sqlstring_bloodpressure = "UPDATE `Devices` SET `Threshold`= NULL WHERE `Mac` = '"+mac+"'";
    }else{
        sqlstring_bloodpressure = "UPDATE `Devices` SET `Threshold`= '"+threshold_bloodpressure+"' WHERE `Mac` = '"+mac+"'";
    }
    // console.log(sqlstring_bloodpressure);
    //取得資料
    await sql.query(sqlstring_bloodpressure)
        .then((data) => {
            result = data.affectedRows;
        }, (error) => {
            result = -1;
        });

    //回傳物件
    return result;
}
//---------------------------------------------
//  修改告警值資料(血糖計)
//---------------------------------------------
var modify_bloodsugar = async function (mac,glucose) {
    console.log("threshold-data-bloodsugar");
    var result = [];
    var threshold_bloodsugar;
    var sqlstring_bloodsugar;
    threshold_bloodsugar = "[\""+glucose+"\"]";
    if(glucose=="NULL"){
        sqlstring_bloodsugar = "UPDATE `Devices` SET `Threshold`= NULL WHERE `Mac` = '"+mac+"'";
    }else{
        sqlstring_bloodsugar = "UPDATE `Devices` SET `Threshold`= '"+threshold_bloodsugar+"' WHERE `Mac` = '"+mac+"'";
    }
    // console.log(sqlstring_bloodsugar);
    //取得資料
    await sql.query(sqlstring_bloodsugar)
        .then((data) => {
            result = data.affectedRows;
        }, (error) => {
            result = -1;
        });

    //回傳物件
    return result;
}
//---------------------------------------------
//  修改告警值資料(額溫計)
//---------------------------------------------
var modify_temperature = async function (mac,temperature) {
    console.log("threshold-data-temperature");
    var result = [];
    var threshold_temperature;
    var sqlstring_temperature;
    threshold_temperature = "[\""+temperature+"\"]";
    if(temperature=="NULL"){
        sqlstring_temperature = "UPDATE `Devices` SET `Threshold`= NULL WHERE `Mac` = '"+mac+"'";
    }else{
        sqlstring_temperature = "UPDATE `Devices` SET `Threshold`= '"+threshold_temperature+"' WHERE `Mac` = '"+mac+"'";
    }
    // console.log(sqlstring_temperature);
    //取得資料
    await sql.query(sqlstring_temperature)
        .then((data) => {
            result = data.affectedRows;
        }, (error) => {
            result = -1;
        });

    //回傳物件
    return result;
}
//---------------------------------------------
//  修改告警值資料(感知照明)
//---------------------------------------------
var modify_light = async function (mac,light,colorvalue,wat) {
    console.log("threshold-data-light");
    var result = [];
    var threshold_light;
    var sqlstring_light;
    threshold_light = "[\""+light+"\",\""+colorvalue+"\",\""+wat+"\"]";
    if(light=="NULL" && colorvalue=="NULL" && wat=="NULL"){
        sqlstring_light = "UPDATE `Devices` SET `Threshold`= NULL WHERE `Mac` = '"+mac+"'";
    }else{
        sqlstring_light = "UPDATE `Devices` SET `Threshold`= '"+threshold_light+"' WHERE `Mac` = '"+mac+"'";
    }
    // console.log(sqlstring_light);
    //取得資料
    await sql.query(sqlstring_light)
        .then((data) => {
            result = data.affectedRows;
        }, (error) => {
            result = -1;
        });

    //回傳物件
    return result;
}
//---------------------------------------------
//  修改告警值資料(脂肪計))
//---------------------------------------------
var modify_fat = async function (mac,fat,water,muscle,bone) {
    console.log("threshold-data-fat");
    var result = [];
    var threshold_fat;
    var sqlstring_fat;
    threshold_fat= "[\""+fat+"\",\""+water+"\",\""+muscle+"\",\""+bone+"\"]";
    if(fat=="NULL" && water=="NULL" && muscle=="NULL" && bone=="NULL"){
        sqlstring_fat = "UPDATE `Devices` SET `Threshold`= NULL WHERE `Mac` = '"+mac+"'";
    }else{
        sqlstring_fat = "UPDATE `Devices` SET `Threshold`= '"+threshold_fat+"' WHERE `Mac` = '"+mac+"'";
    }
    // console.log(sqlstring_fat);
    //取得資料
    await sql.query(sqlstring_fat)
        .then((data) => {
            result = data.affectedRows;
        }, (error) => {
            result = -1;
        });

    //回傳物件
    return result;
}
//---------------------------------------------
//  修改告警值資料(空氣質量)
//---------------------------------------------
var modify_airquality = async function (mac,wet,temp,pm,co2,cha,tvoc,wat) {
    console.log("threshold-data-airquality");
    var result = [];
    var threshold_airquality;
    var sqlstring_airquality;
    threshold_airquality = "[\""+wet+"\",\""+temp+"\",\""+pm+"\",\""+co2+"\",\""+cha+"\",\""+tvoc+"\",\""+wat+"\"]";
    if(wet=="NULL" && temp=="NULL" && co2=="NULL" && cha=="NULL" && tvoc=="NULL" && wat=="NULL"){
        sqlstring_airquality = "UPDATE `Devices` SET `Threshold`= NULL WHERE `Mac` = '"+mac+"'";
    }else{
        sqlstring_airquality = "UPDATE `Devices` SET `Threshold`= '"+threshold_airquality+"' WHERE `Mac` = '"+mac+"'";
    }
    // console.log(sqlstring_airquality);
    //取得資料
    await sql.query(sqlstring_airquality)
        .then((data) => {
            result = data.affectedRows;
        }, (error) => {
            result = -1;
        });

    //回傳物件
    return result;
}
//---------------------------------------------
//  告警資料核銷
//---------------------------------------------
var cancelwarning = async function (mac,id) {
    console.log("threshold-data-cancelwarning");
    var result = [];
    var sqlstring = "UPDATE `"+mac+"` SET `Status`= 1 WHERE `id`= '"+id+"'";
    // console.log(sqlstring);
    //取得資料
    await sql.query(sqlstring)
        .then((data) => {
            result = data.affectedRows;
        }, (error) => {
            result = -1;
        });

    //回傳物件
    return result;
}
//匯出
module.exports = {modify_bed,modify_sleeptape,modify_fat,modify_bloodpressure,modify_light,modify_humidifier,modify_airquality,modify_bloodsugar,modify_temperature,cancelwarning};