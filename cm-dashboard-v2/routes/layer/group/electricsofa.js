var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.render('./layer/type/electricsofa');
});

module.exports = router;