'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
//  新增馬達角度資料
//---------------------------------------------
var Insert_bed_data = async function (mac,headvalue,footvalue,bedvalue,Current_time) {
    console.log("control-bed-data-insert");
    //console.log(mac+","+angel);
    var result_bed_insert;
    var ins_bed="INSERT INTO "+ mac+" (Head, Foot, Bed,Time) VALUES ( "+headvalue+" , "+footvalue+" , "+bedvalue+" , '"+Current_time+"' )";
    console.log(ins_bed);
    //取得資料
    await sql.query(ins_bed)
        .then((data) => {
            result_bed_insert = data.affectedRows;
        }, (error) => {
            result_bed_insert = -1;
    });
    //回傳物件
    return result_bed_insert;
}
var Insert_bed_record = async function (mac,id,headvalue,footvalue,bedvalue,Current_time) {
    console.log("control-bed-record -insert");
    //console.log(mac+","+angel);
    var result_bed_record_insert;
    var ins_bed="INSERT INTO "+ mac+" (Head, Foot, Bed,Record ,Time) VALUES ( "+headvalue+" , "+footvalue+" , "+bedvalue+" , "+id+" , '"+Current_time+"' )";

    //取得資料
    await sql.query(ins_bed)
        .then((data) => {
            result_bed_record_insert = data.affectedRows;
        }, (error) => {
            result_bed_record_insert = -1;
    });
    //回傳物件
    return result_bed_record_insert;
}
module.exports = { Insert_bed_data,Insert_bed_record  };