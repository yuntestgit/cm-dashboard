'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
//---------------------------------------------
//  新增行事曆事件
//---------------------------------------------
var create = async function (mac,startdate,startvaluehead,startvaluefoot,startvaluebed) {
    console.log("create-schedule");
    var result_create;
    //取得資料
    var sqll = "INSERT INTO `Calendar`( `Devicemac`, `Startdate`, `Startvalue_head`, `Startvalue_foot`, `Startvalue_bed`) VALUES ( '"+mac+"' , '"+startdate+"' , "+startvaluehead+" , "+startvaluefoot+" , "+startvaluebed+" );";
    // await sql.query('INSERT INTO `Calendar`(`Devicemac`, `Startdate`, `Startvalue_head`, `Startvalue_foot`, `Startvalue_bed`) VALUES (?,?,?,?,?)', [mac,startdate,startvaluehead,startvaluefoot,startvaluebed])
    await sql.query(sqll)    
        .then((data) => {
            // console.log(data);
                result_create = data.affectedRows;
            }, (error) => {
            // console.log(error);
                result_create = -1;
    });
    //回傳物件
    return result_create;
}

var calendar_check = async function(mac){
    console.log("calendar-check");
    var result_check;
    //取得資料
    await sql.query('SELECT * FROM `Calendar` WHERE `Devicemac` = ? ORDER BY `Calendar`.`Startdate` ASC ',[mac])
        .then((data) => {
        // console.log(data);
            if (data.length >= 1) {
                var ccstr = JSON.stringify(data);
                var ccjso = JSON.parse(ccstr);
                result_check = ccjso;
            } else {
                result_check = [{"id":null}];
            }
        }, (error) => {
            result_check = null;
    });
    //回傳物件
    return result_check;
}

var modify = async function (mac,id,startdate,startvaluehead,startvaluefoot,startvaluebed) {
    console.log("modify-schedule");
    var result_modify;
    //取得資料
    var sqlu =" UPDATE `Calendar` SET `Devicemac`= '"+mac+"' ,`Startdate`= '"+startdate+"' ,`Startvalue_head`= "+startvaluehead+" ,`Startvalue_foot`= "+startvaluefoot+" ,`Startvalue_bed`= "+startvaluebed+" WHERE `id` = '"+id+"' ;";
    // console.log(sqlu);
    await sql.query(sqlu)    
        .then((data) => {
            // console.log(data);
                if(data.affectedRows==1){
                    result_modify = 1;
                }else{
                    result_modify = -1;
                }  
            }, (error) => {
            // console.log(error);
                result_modify = -1;
    });
    //回傳物件
    return result_modify;
}

var remove = async function (mac,id) {
    console.log("delete-schedule");
    var result_delete;
    //取得資料
    await sql.query('DELETE FROM `Calendar` WHERE `id` = ? && `Devicemac` = ?',[id,mac])    
        .then((data) => {
            // console.log(data);
                if(data.affectedRows==1){
                    result_delete = 1;
                }else{
                    result_delete = -1;
                }  
            }, (error) => {
            // console.log(error);
                result_delete= -1;
    });
    //回傳物件
    return result_delete;
}

module.exports = { create,calendar_check,modify,remove};