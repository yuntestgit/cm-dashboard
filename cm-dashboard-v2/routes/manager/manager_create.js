var express = require('express');
var router = express.Router();

const system = require('../utility/system');

router.post('/', function (req, res, next) {

    var cpname = req.body.cpname;
    var name = req.body.name;
    var ans;

    var flag = 0;

    // Math.random();// 0.2681560355715408
    //隨機小數
    // Math.random().toString(36);//0.jh5mobu22br
    //36是進位方式指定，從2到36進位
    //如果使用36進位就是等於10碼數字+26英文
    // Math.random().toString(36).substring(7);
    //從第7個字開始抓，所以是13 - 7 = 6 個隨機數字+字母
    var account = Math.random().toString(36).substring(7);
    var password = Math.random().toString(36).substring(7);

    var allsqlsettings = new Array;
    allsqlsettings = [
        "CREATE TABLE `Devices` (`id` int(191) NOT NULL COMMENT '識別碼',`FloorNumber` int(191) DEFAULT NULL COMMENT '樓層',`RoomNumber` int(191) DEFAULT NULL COMMENT '房號',`Devicetype` int(191) NOT NULL COMMENT '種類',`Mac` varchar(191) NOT NULL COMMENT '指紋',`Name` varchar(191) NOT NULL COMMENT '名稱',`Description` varchar(191) DEFAULT NULL COMMENT '敘述',`Username` varchar(191) DEFAULT NULL COMMENT '使用者',`ServiceUUID` varchar(191) NOT NULL COMMENT '服務',`ReceiveUUID` varchar(191) NOT NULL COMMENT '接收',`SendUUID` varchar(191) NOT NULL COMMENT '發送',`Status` varchar(191) NOT NULL DEFAULT 'off' COMMENT '狀態(on/off)', `Threshold` varchar(191) DEFAULT NULL COMMENT '告警值') ENGINE=InnoDB DEFAULT CHARSET=utf8 ; ",
        "CREATE TABLE `Devicetype` (`id` int(191) NOT NULL COMMENT '種類',`Device` varchar(191) NOT NULL COMMENT '名稱') ENGINE=InnoDB DEFAULT CHARSET=utf8;",
        "CREATE TABLE `Floor` (`Number` int(191) NOT NULL COMMENT '樓層') ENGINE=InnoDB DEFAULT CHARSET=utf8;",
        "CREATE TABLE `Gateway` (`id` int(191) NOT NULL,`Mac` varchar(191) NOT NULL COMMENT '識別碼',`Name` varchar(191) NOT NULL COMMENT '名稱',`Description` varchar(191) DEFAULT NULL COMMENT '描述',`Floor` int(191) DEFAULT 1 COMMENT '樓層',`Room` int(191) DEFAULT NULL,`Connectdevice1` varchar(191) DEFAULT NULL COMMENT '裝置1',`Connectdevice2` varchar(191) DEFAULT NULL COMMENT '裝置2',`Connectdevice3` varchar(191) DEFAULT NULL COMMENT '裝置3',`Connectdevice4` varchar(191) DEFAULT NULL COMMENT '裝置4') ENGINE=InnoDB DEFAULT CHARSET=utf8;",
        "CREATE TABLE `Role` ( `Role` int(191) NOT NULL COMMENT '權限',`Level` varchar(191) NOT NULL COMMENT '等級') ENGINE=InnoDB DEFAULT CHARSET=utf8;",
        "CREATE TABLE `Room` (`FloorNumber` int(191) NOT NULL COMMENT '樓層',`Number` int(191) NOT NULL COMMENT '房號') ENGINE=InnoDB DEFAULT CHARSET=utf8;",
        "CREATE TABLE `User` (`id` int(191) NOT NULL COMMENT '識別碼',`Account` varchar(191) NOT NULL COMMENT '帳號',`Password` varchar(191) NOT NULL COMMENT '密碼',`Username` varchar(191) NOT NULL COMMENT '姓名',`Email` varchar(191) NOT NULL COMMENT '電子信箱',`Phone` varchar(191) NOT NULL COMMENT '聯絡電話',`Room` int(191) DEFAULT NULL COMMENT '房號(病患)',`Role` int(191) NOT NULL DEFAULT 4 COMMENT '權限') ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;",
        "CREATE TABLE `Team` (`id` int(191) NOT NULL,`Teamid` varchar(191) NOT NULL,`Teamname` varchar(191) NOT NULL,`Devicetype` int(11) NOT NULL,`Devicemac` varchar(191) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
        "CREATE TABLE `Calendar` (`id` int(191) NOT NULL ,`Devicemac` varchar(191) NOT NULL COMMENT '設備識別碼',`Startdate` varchar(191) NOT NULL COMMENT '起始時間',`Startvalue_head` int(191) DEFAULT NULL COMMENT '起始值_頭部',`Startvalue_foot` int(191) DEFAULT NULL COMMENT '起始值_腿部',`Startvalue_bed` int(191) DEFAULT NULL COMMENT '起始值_床高') ENGINE=InnoDB DEFAULT CHARSET=utf8;",
        "ALTER TABLE `Devices` ADD PRIMARY KEY (`id`),ADD UNIQUE KEY `Mac` (`Mac`),ADD KEY `FloorNumber` (`FloorNumber`),ADD KEY `RoomNumber` (`RoomNumber`),ADD KEY `Type` (`Devicetype`),ADD KEY `Username` (`Username`);",
        "ALTER TABLE `Devicetype` ADD PRIMARY KEY (`id`);",
        "ALTER TABLE `Floor` ADD PRIMARY KEY (`Number`);",
        "ALTER TABLE `Calendar`ADD PRIMARY KEY (`id`);",
        "ALTER TABLE `Calendar` MODIFY `id` int(191) NOT NULL AUTO_INCREMENT;",
        "ALTER TABLE `Gateway` ADD PRIMARY KEY (`id`),  ADD UNIQUE KEY `Mac` (`Mac`),  ADD KEY `Floor` (`Floor`),  ADD KEY `Connectdevice1` (`Connectdevice1`),  ADD KEY `Connectdevice2` (`Connectdevice2`),  ADD KEY `Connectdevice3` (`Connectdevice3`),  ADD KEY `Connectdevice4` (`Connectdevice4`),  ADD KEY `Room` (`Room`);",
        "ALTER TABLE `Role` ADD PRIMARY KEY (`Role`),  ADD UNIQUE KEY `Role` (`Role`);",
        "ALTER TABLE `Room` ADD PRIMARY KEY (`Number`), ADD UNIQUE KEY `Number` (`Number`), ADD KEY `FloorNumber` (`FloorNumber`);",
        "ALTER TABLE `User` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `Account` (`Account`), ADD KEY `Role` (`Role`), ADD KEY `Room` (`Room`);",
        "ALTER TABLE `Devices` MODIFY `id` int(191) NOT NULL AUTO_INCREMENT COMMENT '識別碼' ;",
        "ALTER TABLE `Devicetype` MODIFY `id` int(191) NOT NULL AUTO_INCREMENT COMMENT '種類' ;",
        "ALTER TABLE `Floor` MODIFY `Number` int(191) NOT NULL AUTO_INCREMENT COMMENT '樓層' ;",
        "ALTER TABLE `Gateway`  MODIFY `id` int(191) NOT NULL AUTO_INCREMENT AUTO_INCREMENT;",
        "ALTER TABLE `User` MODIFY `id` int(191) NOT NULL AUTO_INCREMENT COMMENT '識別碼';",
        "ALTER TABLE `Devices` ADD CONSTRAINT `Devices_ibfk_1` FOREIGN KEY (`FloorNumber`) REFERENCES `Floor` (`Number`) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT `Devices_ibfk_2` FOREIGN KEY (`RoomNumber`) REFERENCES `Room` (`Number`) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT `Devices_ibfk_3` FOREIGN KEY (`Devicetype`) REFERENCES `Devicetype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;",
        "ALTER TABLE `Gateway` ADD CONSTRAINT `Gateway_ibfk_1` FOREIGN KEY (`Floor`) REFERENCES `Floor` (`Number`) ON DELETE SET NULL ON UPDATE SET NULL, ADD CONSTRAINT `Gateway_ibfk_2` FOREIGN KEY (`Room`) REFERENCES `Room` (`Number`) ON DELETE SET NULL ON UPDATE SET NULL;",
        "ALTER TABLE `Room` ADD CONSTRAINT `Room_ibfk_1` FOREIGN KEY (`FloorNumber`) REFERENCES `Floor` (`Number`) ON DELETE CASCADE ON UPDATE CASCADE;",
        "ALTER TABLE `User` ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`Role`) REFERENCES `Role` (`Role`) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT `User_ibfk_2` FOREIGN KEY (`Room`) REFERENCES `Room` (`Number`) ON DELETE SET NULL ON UPDATE SET NULL;",
        "ALTER TABLE `Team` ADD PRIMARY KEY (`id`) ,ADD UNIQUE KEY `Teamid` (`Teamid`), ADD KEY `Devicetype` (`Devicetype`);",
        "ALTER TABLE `Team` MODIFY `id` int(191) NOT NULL AUTO_INCREMENT",
        "INSERT INTO `Role` (`Role`, `Level`) VALUES(1, '管理者'),(2, '護理長'),(3, '護理師'),(4, '使用者');",
        "INSERT INTO `Devicetype` (`id`, `Device`) VALUES(1, '閘道器'),(2, '床'),(3, '睡眠帶'),(4, '感知照明'),(5, '加濕器'),(6, '空氣質量'),(7, '血壓計'),(8, '脂肪計'),(9, '電動桌'),(10, '電動沙發'),(11, '血糖計'),(12, '額溫計');",
        "INSERT INTO `User` (`id`, `Account`, `Password`, `Username`, `Email`, `Phone`, `Room`, `Role`) VALUES(1, '"+account+"', '"+password+"', '管理者', '', '', NULL, 3);",
    ]

    system.createcompany(cpname, name).then(result => {
        if (result >= 0) {

            system.createuser(account, password, cpname).then(result_u => {
                if (result_u >= 0) {

                    system.createdb(cpname).then(result_db => {
                        if (result_db >= 0) {
                            system.createtable(cpname, allsqlsettings[0]).then(result_tb0 => {
                                if (result_tb0 >= 0) {
                                    system.createtable(cpname, allsqlsettings[1]).then(result_tb1 => {
                                        if (result_tb1 >= 0) {
                                            system.createtable(cpname, allsqlsettings[2]).then(result_tb2 => {
                                                if (result_tb2 >= 0) {
                                                    system.createtable(cpname, allsqlsettings[3]).then(result_tb3 => {
                                                        if (result_tb3 >= 0) {
                                                            system.createtable(cpname, allsqlsettings[4]).then(result_tb4 => {
                                                                if (result_tb4 >= 0) {
                                                                    system.createtable(cpname, allsqlsettings[5]).then(result_tb5 => {
                                                                        if (result_tb5 >= 0) {
                                                                            system.createtable(cpname, allsqlsettings[6]).then(result_tb6 => {
                                                                                if (result_tb6 >= 0) {
                                                                                    system.createtable(cpname, allsqlsettings[7]).then(result_tb7 => {
                                                                                        if (result_tb7 >= 0) {
                                                                                            system.createtable(cpname, allsqlsettings[8]).then(result_tb8 => {
                                                                                                if (result_tb8 >= 0) {
                                                                                                    system.createtable(cpname, allsqlsettings[9]).then(result_tb9 => {
                                                                                                        if (result_tb9 >= 0) {
                                                                                                            system.createtable(cpname, allsqlsettings[10]).then(result_tb10 => {
                                                                                                                if (result_tb10 >= 0) {
                                                                                                                    system.createtable(cpname, allsqlsettings[11]).then(result_tb11 => {
                                                                                                                        if (result_tb11 >= 0) {
                                                                                                                            system.createtable(cpname, allsqlsettings[12]).then(result_tb12 => {
                                                                                                                                if (result_tb12 >= 0) {
                                                                                                                                    system.createtable(cpname, allsqlsettings[13]).then(result_tb13 => {
                                                                                                                                        if (result_tb13 >= 0) {
                                                                                                                                            system.createtable(cpname, allsqlsettings[14]).then(result_tb14 => {
                                                                                                                                                if (result_tb14 >= 0) {
                                                                                                                                                    system.createtable(cpname, allsqlsettings[15]).then(result_tb15 => {
                                                                                                                                                        if (result_tb15 >= 0) {
                                                                                                                                                            system.createtable(cpname, allsqlsettings[16]).then(result_tb16 => {
                                                                                                                                                                if (result_tb16 >= 0) {
                                                                                                                                                                    system.createtable(cpname, allsqlsettings[17]).then(result_tb17 => {
                                                                                                                                                                        if (result_tb17 >= 0) {
                                                                                                                                                                            system.createtable(cpname, allsqlsettings[18]).then(result_tb18 => {
                                                                                                                                                                                if (result_tb18 >= 0) {
                                                                                                                                                                                    system.createtable(cpname, allsqlsettings[19]).then(result_tb19 => {
                                                                                                                                                                                        if (result_tb19 >= 0) {
                                                                                                                                                                                            system.createtable(cpname, allsqlsettings[20]).then(result_tb20 => {
                                                                                                                                                                                                if (result_tb20 >= 0) {
                                                                                                                                                                                                    system.createtable(cpname, allsqlsettings[21]).then(result_tb21 => {
                                                                                                                                                                                                        if (result_tb21 >= 0) {
                                                                                                                                                                                                            system.createtable(cpname, allsqlsettings[22]).then(result_tb22 => {
                                                                                                                                                                                                                if (result_tb22 >= 0) {
                                                                                                                                                                                                                    system.createtable(cpname, allsqlsettings[23]).then(result_tb23 => {
                                                                                                                                                                                                                        if (result_tb23 >= 0) {
                                                                                                                                                                                                                            system.createtable(cpname, allsqlsettings[24]).then(result_tb24 => {
                                                                                                                                                                                                                                if (result_tb24 >= 0) {
                                                                                                                                                                                                                                    system.createtable(cpname, allsqlsettings[25]).then(result_tb25 => {
                                                                                                                                                                                                                                        if (result_tb25 >= 0) {
                                                                                                                                                                                                                                            system.createtable(cpname, allsqlsettings[26]).then(result_tb26 => {
                                                                                                                                                                                                                                                if (result_tb26 >= 0) {
                                                                                                                                                                                                                                                    system.createtable(cpname, allsqlsettings[27]).then(result_tb27 => {
                                                                                                                                                                                                                                                        if (result_tb27 >= 0) {
                                                                                                                                                                                                                                                            system.createtable(cpname, allsqlsettings[28]).then(result_tb28 => {
                                                                                                                                                                                                                                                                if (result_tb28 >= 0) {
                                                                                                                                                                                                                                                                    system.createtable(cpname, allsqlsettings[29]).then(result_tb29 => {
                                                                                                                                                                                                                                                                        if (result_tb29 >= 0) {
                                                                                                                                                                                                                                                                            system.createtable(cpname, allsqlsettings[30]).then(result_tb30 => {
                                                                                                                                                                                                                                                                                if (result_tb30 >= 0) {
                                                                                                                                                                                                                                                                                    system.createtable(cpname, allsqlsettings[31]).then(result_tb31 => {
                                                                                                                                                                                                                                                                                        if (result_tb31 >= 0) {
                                                                                                                                                                                                                                                                                            ans = "新增成功";
                                                                                                                                                                                                                                                                                            res.send(ans);
                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                            ans = "新增失敗";
                                                                                                                                                                                                                                                                                            res.send(ans);
                                                                                                                                                                                                                                                                                            console.log(31);
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                    ans = "新增失敗";
                                                                                                                                                                                                                                                                                    res.send(ans);
                                                                                                                                                                                                                                                                                    console.log(30);
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                            ans = "新增失敗";
                                                                                                                                                                                                                                                                            res.send(ans);
                                                                                                                                                                                                                                                                            console.log(29);
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                    ans = "新增失敗";
                                                                                                                                                                                                                                                                    res.send(ans);
                                                                                                                                                                                                                                                                    console.log(28);
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                            ans = "新增失敗";
                                                                                                                                                                                                                                                            res.send(ans);
                                                                                                                                                                                                                                                            console.log(27);
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                    ans = "新增失敗";
                                                                                                                                                                                                                                                    res.send(ans);
                                                                                                                                                                                                                                                    console.log(26);
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                            ans = "新增失敗";
                                                                                                                                                                                                                                            res.send(ans);
                                                                                                                                                                                                                                            console.log(25);
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                    ans = "新增失敗";
                                                                                                                                                                                                                                    res.send(ans);
                                                                                                                                                                                                                                    console.log(24);
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                            })
                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                            ans = "新增失敗";
                                                                                                                                                                                                                            res.send(ans);
                                                                                                                                                                                                                            console.log(23);
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                    })
                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                    ans = "新增失敗";
                                                                                                                                                                                                                    res.send(ans);
                                                                                                                                                                                                                    console.log(22);
                                                                                                                                                                                                                }
                                                                                                                                                                                                            })
                                                                                                                                                                                                        } else {
                                                                                                                                                                                                            ans = "新增失敗";
                                                                                                                                                                                                            res.send(ans);
                                                                                                                                                                                                            console.log(21);
                                                                                                                                                                                                        }
                                                                                                                                                                                                    })
                                                                                                                                                                                                } else {
                                                                                                                                                                                                    ans = "新增失敗";
                                                                                                                                                                                                    res.send(ans);
                                                                                                                                                                                                    console.log(20);
                                                                                                                                                                                                }
                                                                                                                                                                                            })
                                                                                                                                                                                        } else {
                                                                                                                                                                                            ans = "新增失敗";
                                                                                                                                                                                            res.send(ans);
                                                                                                                                                                                            console.log(19);
                                                                                                                                                                                        }
                                                                                                                                                                                    })
                                                                                                                                                                                } else {
                                                                                                                                                                                    ans = "新增失敗";
                                                                                                                                                                                    res.send(ans);
                                                                                                                                                                                    console.log(18);
                                                                                                                                                                                }
                                                                                                                                                                            })
                                                                                                                                                                        } else {
                                                                                                                                                                            ans = "新增失敗";
                                                                                                                                                                            res.send(ans);
                                                                                                                                                                            console.log(17);
                                                                                                                                                                        }
                                                                                                                                                                    })
                                                                                                                                                                } else {
                                                                                                                                                                    ans = "新增失敗";
                                                                                                                                                                    res.send(ans);
                                                                                                                                                                    console.log(16);
                                                                                                                                                                }
                                                                                                                                                            })
                                                                                                                                                        } else {
                                                                                                                                                            ans = "新增失敗";
                                                                                                                                                            res.send(ans);
                                                                                                                                                            console.log(15);
                                                                                                                                                        }
                                                                                                                                                    })
                                                                                                                                                } else {
                                                                                                                                                    ans = "新增失敗";
                                                                                                                                                    res.send(ans);
                                                                                                                                                    console.log(14);
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                        } else {
                                                                                                                                            ans = "新增失敗";
                                                                                                                                            res.send(ans);
                                                                                                                                            console.log(13);
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                } else {
                                                                                                                                    ans = "新增失敗";
                                                                                                                                    res.send(ans);
                                                                                                                                    console.log(12);
                                                                                                                                }
                                                                                                                            })
                                                                                                                        } else {
                                                                                                                            ans = "新增失敗";
                                                                                                                            res.send(ans);
                                                                                                                            console.log(11);
                                                                                                                        }
                                                                                                                    })
                                                                                                                } else {
                                                                                                                    ans = "新增失敗";
                                                                                                                    res.send(ans);
                                                                                                                    console.log(10);
                                                                                                                }
                                                                                                            })
                                                                                                        } else {
                                                                                                            ans = "新增失敗";
                                                                                                            res.send(ans);
                                                                                                            console.log(9);
                                                                                                        }
                                                                                                    })
                                                                                                } else {
                                                                                                    ans = "新增失敗";
                                                                                                    res.send(ans);
                                                                                                    console.log(8);
                                                                                                }
                                                                                            })
                                                                                        } else {
                                                                                            ans = "新增失敗";
                                                                                            res.send(ans);
                                                                                            console.log(7);
                                                                                        }
                                                                                    })
                                                                                } else {
                                                                                    ans = "新增失敗";
                                                                                    res.send(ans);
                                                                                    console.log(6);
                                                                                }
                                                                            })
                                                                        } else {
                                                                            ans = "新增失敗";
                                                                            res.send(ans);
                                                                            console.log(5);
                                                                        }
                                                                    })
                                                                } else {
                                                                    ans = "新增失敗";
                                                                    res.send(ans);
                                                                    console.log(4);
                                                                }
                                                            })
                                                        } else {
                                                            ans = "新增失敗";
                                                            res.send(ans);
                                                            console.log(3);
                                                        }
                                                    })
                                                } else {
                                                    ans = "新增失敗";
                                                    res.send(ans);
                                                    console.log(2);
                                                }
                                            })
                                        } else {
                                            ans = "新增失敗";
                                            res.send(ans);
                                            console.log(1);
                                        }
                                    })
                                } else {
                                    ans = "新增失敗";
                                    res.send(ans);
                                    console.log(0);
                                }
                            })
                        } else {
                            ans = "新增失敗";
                            res.send(ans);
                        }
                    })

                } else {
                    ans = "新增失敗";
                    res.send(ans);
                }
            })
        } else {
            ans = "新增失敗";
            res.send(ans);
        }
    })


});
module.exports = router;