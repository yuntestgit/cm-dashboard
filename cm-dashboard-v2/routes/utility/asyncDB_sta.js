'use strict';

//引用mysql模組
var mysql = require('mysql');

//建立資料庫連接池
const pool  = mysql.createPool({
    user: 'brian',
    password: '12345678',
    host: 'database-1.cmh4h6xmubcg.ap-northeast-1.rds.amazonaws.com',
    database: 'STA'
});

//產生可同步執行query物件的函式
// function query(sql, value) {
//     return new Promise((resolve, reject) => {
//         pool.query(sql, value, function (error, results, fields) {
//             if (error){
//                 reject(error);
//             }else{
//                 resolve(results);
//             }
//         });
        
//     });  
// }

function query(sql, value) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
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
module.exports = query;