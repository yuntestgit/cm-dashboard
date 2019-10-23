'use strict';

//引用mysql模組
var mysql = require('mysql');

//建立資料庫連接池
var pool_any  = mysql.createPool({
    user: 'brian',
    password: '12345678',
    host: 'database-1.cmh4h6xmubcg.ap-northeast-1.rds.amazonaws.com',
});
var pool_new  = mysql.createPool({
    user: 'brian',
    password: '12345678',
    host: 'database-1.cmh4h6xmubcg.ap-northeast-1.rds.amazonaws.com',
});

// console.log(pool);

//產生可同步執行query物件的函式
function query(sql, value) {
    return new Promise((resolve, reject) => {
        pool_any.getConnection(function(err, connection) {
            // console.log(pool.config.connectionConfig);
            if(err){
                reject(err);
                console.log(err);
            }else{
                connection.query(sql, value, ( err, rows) => {
                    connection.destroy();
                    if(err){
                        reject(err);
                        console.log(err);
                    }else{
                        resolve(rows);
                    }
                });
            };
        });
        if(value!="delete"){
            pool_new  = mysql.createPool({
                user: 'brian',
                password: '12345678',
                host: 'database-1.cmh4h6xmubcg.ap-northeast-1.rds.amazonaws.com',
                database: value
            });
        }
    });
};

function query_table(sql, value) {
    return new Promise((resolve, reject) => {
        pool_new.getConnection(function(err, connection) {
            // console.log(pool.config.connectionConfig);
            if(err){
                reject(err);
                console.log(err);
            }else{
                connection.query(sql, value, ( err, rows) => {
                    connection.destroy();
                    if(err){
                        reject(err);
                        console.log(err);
                    }else{
                        resolve(rows);
                    }
                });
            };
        });
    });
};

//匯出
module.exports = {query,query_table};