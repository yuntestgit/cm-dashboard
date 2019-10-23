var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/user_login_form');
var users = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//------------------------------------------------------------
// 增加引用模組
//------------------------------------------------------------
var user_login_form = require('./routes/user_login_form');
var user_login = require('./routes/user_login');
var user_logout = require('./routes/user_logout');
var user_show = require('./routes/user/user_show');

var manager_show = require('./routes/manager/manager_show');

var layer_show = require('./routes/layer/layer_show');
var layer_room = require('./routes/layer/layer_room');
var layer_device = require('./routes/layer/layer_device');
var layer_create = require('./routes/layer/layer_create');
var layer_modify = require('./routes/layer/layer_modify');
var layer_delete = require('./routes/layer/layer_delete');

var main_next = require('./routes/layer/main_next');
var navbar_next = require('./routes/layer/navbar_next');

var main_group = require('./routes/layer/main_group');
var navbar_group = require('./routes/layer/navbar_group');

var airquality = require('./routes/layer/type/airquality');
var bed = require('./routes/layer/type/bed');
var bloodpressure = require('./routes/layer/type/bloodpressure');
var fat = require('./routes/layer/type/fat');
var humidifier = require('./routes/layer/type/humidifier');
var light = require('./routes/layer/type/light');
var sleeptape = require('./routes/layer/type/sleeptape');
var bloodsugar = require('./routes/layer/type/bloodsugar');
var electrictable = require('./routes/layer/type/electrictable');
var electricsofa = require('./routes/layer/type/electricsofa');
var temperature = require('./routes/layer/type/temperature');

var group_airquality = require('./routes/layer/group/airquality');
var group_bed = require('./routes/layer/group/bed');
var group_bloodpressure = require('./routes/layer/group/bloodpressure');
var group_fat = require('./routes/layer/group/fat');
var group_humidifier = require('./routes/layer/group/humidifier');
var group_light = require('./routes/layer/group/light');
var group_sleeptape = require('./routes/layer/group/sleeptape');
var group_bloodsugar = require('./routes/layer/group/bloodsugar');
var group_electrictable = require('./routes/layer/group/electrictable');
var group_electricsofa = require('./routes/layer/group/electricsofa');
var group_temperature = require('./routes/layer/group/temperature');

var setting_show=require('./routes/setting/setting_show');
var setting_delete=require('./routes/setting/setting_delete');
var setting_create=require('./routes/setting/setting_create');
var setting_modify=require('./routes/setting/setting_modify');

var setting_show_manage=require('./routes/setting/setting_manage');
var setting_show_patient=require('./routes/setting/setting_patient');
var setting_show_device=require('./routes/setting/setting_device');
var setting_show_group=require('./routes/setting/setting_group');
var setting_show_threshold=require('./routes/setting/setting_threshold');

var connect_gateway=require('./routes/layer/connect_gateway');
var control_device=require('./routes/layer/control_device');

var createvalue_company=require('./routes/manager/manager_create')

var deletevalue_company=require('./routes/manager/manager_delete');

var create_schedule_value = require('./routes/layer/schedule_create');
var modify_schedule_value = require('./routes/layer/schedule_modify');
var delete_schedule_value = require('./routes/layer/schedule_delete');

var modify_threshold = require('./routes/setting/threshold_modify');
var cancel_warning = require('./routes/layer/cancel_warning');
var sessionAPI=require('./sessionAPI');


//--------------------------------------------------------------------
// 增加引用express-session
//--------------------------------------------------------------------
var session = require('express-session');
app.use(session({secret: '12345',
    name: 'testapp',  //這裡的name值得是cookie的name，預設cookie的name是：connect.sid
    cookie: {maxAge: 60000 }, //設定maxAge是80000ms，即80s後session和相應的cookie失效過期
    resave: false,
    saveUninitialized: true}
    ));

//-----------------------------------------
// 設定模組使用方式
//-----------------------------------------
app.use('/user/login/form', user_login_form);
app.use('/user/login', user_login);
app.use('/user/logout', user_logout);
app.use('/user/show', user_show);

app.use('/manager/manager_show',manager_show);

app.use('/layer/layer_show',layer_show);
app.use('/layer/layer_room',layer_room);
app.use('/layer/layer_device',layer_device);

app.use('/layer/main_next',main_next);
app.use('/layer/navbar_next',navbar_next);
app.use('/layer/create',layer_create);
app.use('/layer/modify',layer_modify);
app.use('/layer/delete',layer_delete);


app.use('/layer/main_group',main_group);
app.use('/layer/navbar_group',navbar_group);

app.use('/layer/type/bed',bed);
app.use('/layer/type/sleeptape',sleeptape);
app.use('/layer/type/light',light);
app.use('/layer/type/humidifier',humidifier);
app.use('/layer/type/airquality',airquality);
app.use('/layer/type/bloodpressure',bloodpressure);
app.use('/layer/type/fat',fat);
app.use('/layer/type/bloodsugar',bloodsugar);
app.use('/layer/type/electrictable',electrictable);
app.use('/layer/type/electricsofa',electricsofa);
app.use('/layer/type/temperature',temperature);

app.use('/layer/group/bed',group_bed);
app.use('/layer/group/sleeptape',group_sleeptape);
app.use('/layer/group/light',group_light);
app.use('/layer/group/humidifier',group_humidifier);
app.use('/layer/group/airquality',group_airquality);
app.use('/layer/group/bloodpressure',group_bloodpressure);
app.use('/layer/group/fat',group_fat);
app.use('/layer/group/bloodsugar',group_bloodsugar);
app.use('/layer/group/electrictable',group_electrictable);
app.use('/layer/group/electricsofa',group_electricsofa);
app.use('/layer/group/temperature',group_temperature);

app.use('/setting/show',setting_show);
app.use('/setting/delete',setting_delete);
app.use('/setting/create',setting_create);
app.use('/setting/modify',setting_modify);

app.use('/setting/show/manage',setting_show_manage);
app.use('/setting/show/patient',setting_show_patient);
app.use('/setting/show/device',setting_show_device);
app.use('/setting/show/group',setting_show_group);
app.use('/setting/show/threshold',setting_show_threshold);

app.use('/connect/gateway',connect_gateway);
app.use('/control/device',control_device);

app.use('/delete/company/company',deletevalue_company);
app.use('/create/company/company',createvalue_company);

app.use('/create/schedule',create_schedule_value);
app.use('/modify/schedule',modify_schedule_value);
app.use('/delete/schedule',delete_schedule_value);

app.use('/modify/threshold',modify_threshold);
app.use('/cancel/warning',cancel_warning);
app.use('/sessionAPI',sessionAPI);

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(process.env.PORT||2000,function(){
    var port =server.address().port;
    console.log("port:"+port);
})

module.exports = app;
