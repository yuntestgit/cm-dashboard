'use strict';

//引用操作資料庫的物件
const sql_sta = require('./asyncDB_sta');
const sql_any = require('./asyncDB_any');

//---------------------------------------------
// 列出所有護理院所
//---------------------------------------------
var check = async function () {

    console.log("system-check");

    var result = [];

    //對比管理者資料
    await sql_sta('SELECT * FROM Company WHERE 1 ')
        .then((data) => {
            // console.log(data);
            if (data.length > 0) {
                var str = JSON.stringify(data);
                // console.log("str:\n"+str);
                var jso = JSON.parse(str);
                // console.log("jso:\n"+jso);
                result = jso;
            } else {
                result = null;
            }
        }, (error) => {
            result = null;
        });
    //回傳物件
    return result;
}
//---------------------------------------------
// 刪除STA護理院所資料
//---------------------------------------------
var deletecompany = async function (cpname) {

    console.log("system-delete-company");

    var result_dc;
    //取得資料
    await sql_sta('DELETE FROM `Company` WHERE `Cpname` = ? ', [cpname])
        .then((data) => {
            result_dc = data.affectedRows;
        }, (error) => {
            result_dc = -1;
        });
    //回傳物件
    return result_dc;
}
//---------------------------------------------
// 刪除護理院所資料庫
//---------------------------------------------
var deletedb = async function (cpname) {

    console.log("system-delete-database");

    var result_db;

    var sql_d = "DROP DATABASE " + cpname;

    //取得資料
    await sql_any.query(sql_d,"delete")
        .then((data) => {
            result_db = data.affectedRows;
        }, (error) => {
            result_db = -1;
        });
    //回傳物件
    return result_db;
}
//---------------------------------------------
// 新增STA護理院所資料
//---------------------------------------------
var createcompany = async function (cpname, name) {

    console.log("system-create-company");

    var result_cc;
    //取得資料
    await sql_sta('INSERT INTO `Company` (`Name`, `Cpname`) VALUES (?,?)', [name, cpname])
        .then((data) => {
            result_cc = data.affectedRows;
        }, (error) => {
            result_cc = -1;
        });
    //回傳物件
    return result_cc;
}
//---------------------------------------------
// 新增STA護理院所授權帳號
//---------------------------------------------
var createuser = async function (account, password, cpname) {

    console.log("system-create-user");

    var result_cu;

    //取得資料
    await sql_sta('INSERT INTO `Userdata` (`Account`, `Password`, `Company`) VALUES (?,?,?)', [account, password, cpname])
        .then((data) => {
            result_cu = data.affectedRows;
        }, (error) => {
            result_cu = -1;
        });
    //回傳物件
    return result_cu;
}
//---------------------------------------------
// 新增護理院所資料庫
//---------------------------------------------
var createdb = async function (cpname) {

    console.log("system-create-database");

    var result_cdb;

    var sql_cdb = "CREATE DATABASE " + cpname + " CHARACTER SET utf8 COLLATE utf8_general_ci;";

    //取得資料
    await sql_any.query(sql_cdb,cpname)
        .then((data) => {
            result_cdb = data.affectedRows;
        }, (error) => {
            result_cdb = -1;
        });
    //回傳物件
    return result_cdb;
}
//---------------------------------------------
// 新增護理院所資料庫>資料表
//---------------------------------------------
var createtable = async function (cpname,sql_ctb) {

    console.log("system-create-table");

    var result_ctb;

    // var sqldb = " USE "+cpname;

    // await sql.query(sqldb).then(d=>{
    //     // console.log(dbname);
    //     // console.log(d);
    //     });

    //取得資料
    await sql_any.query_table(sql_ctb)
        .then((data) => {
            // console.log(data);
            result_ctb = data.affectedRows;
        }, (error) => {
            result_ctb = -1;
        });

    //回傳物件
    return result_ctb;
}

//匯出
module.exports = { check, deletecompany, deletedb, createcompany, createuser, createdb, createtable };