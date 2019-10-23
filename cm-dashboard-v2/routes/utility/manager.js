'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB_sta');

//---------------------------------------------
// 資料庫資料
//---------------------------------------------
var dbdata = async function(){   

    console.log("database-data");

    var result=[];

    //取得資料
    await sql('SELECT * FROM Company WHERE 1')
        .then((data) => {
            // console.log("data: "+data.length);
            if(data.length>0){
                var str = JSON.stringify(data);
                // console.log("str:\n"+str);
                var jso = JSON.parse(str);
                // console.log("jso:\n"+jso);
                result = jso;
            }else{
                result = null;
            } 
        }, (error) => {
            result = null;
        });
    
    //回傳物件
    return result;
}
//---------------------------------------------
// 授權帳號密碼資料
//---------------------------------------------
var userdata = async function(){   

    console.log("userdata-data");

    var result_u=[];

    //取得資料
    await sql('SELECT * FROM Userdata WHERE 1')
        .then((data) => {
            if(data.length>0){
                var str_u = JSON.stringify(data);
                var jso_u = JSON.parse(str_u);
                result_u = jso_u;
            }else{
                result_u = null;
            } 
        }, (error) => {
            result_u = null;
        });
    
    //回傳物件
    return result_u;
}

//匯出
module.exports = {dbdata,userdata};