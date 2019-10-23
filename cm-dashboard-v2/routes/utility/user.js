'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 資料庫綁定
//---------------------------------------------
var dbconnect = async function (dbname) {

    // var sqldb = " USE "+dbname;
    await sql.query_db(dbname).then(d=>{
        // console.log(dbname);
        console.log(d);
    })

}
//---------------------------------------------
// 使用者登入
//---------------------------------------------
var login = async function (dbname,account, password) {

    console.log("login_user");

    var result = [];

    //對比管理者資料
    await sql.query('SELECT * FROM User WHERE Account = ? AND Password = ?', [account, password])
        .then((data) => {
            // console.log("data: "+data.length);
            if (data.length == 1) {
                var manager_str = JSON.stringify(data);
                // console.log("str:\n"+str);
                var manager_jso = JSON.parse(manager_str);
                // console.log("jso:\n"+jso);
                result = manager_jso;

            } else {

                result = null;  

            }
        }, (error) => {
            result = null;
        });

    //回傳物件
    return result;
}

//匯出
module.exports = { login,dbconnect };