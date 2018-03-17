var express = require('express');
var userController = require('../controller/user')
var zhihuController = require('../controller/zhihu')
var filmController = require('../controller/film')
var financeController = require('../controller/finance')

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.send('hello, ridu');
})

router.get('/init', userController.init);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/getCaptcha', userController.getCaptcha)

router.get('/fetchfinance', financeController.fetchFinance)

router.post('/zhihu/login', zhihuController.zhihuLogin);

router.get('/zhihu/topic', zhihuController.zhihuTopic);

router.get('/film/tv', filmController.getTv);

module.exports = router;
