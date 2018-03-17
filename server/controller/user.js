var co = require('co');
var request = require('request-promise-native');
var cheerio = require('cheerio');
var sha1 = require('sha1');
var UserModel = require('../models/user');
var utils = require('../utils');

exports.init = (req, res) => {
  request('https://www.zhihu.com', function (error, response, body) {
    if (error) {
      res.json({success: false, message: error})
    } else {
      if (req.headers.cookie) {
        Object.keys(req.cookies).map(key => {
          res.clearCookie(key);
        })
      }
      const $ = cheerio.load(body)
      res.json({
        headers: body.headers,
        data: {
          xsrf: $('input[name=_xsrf]').val()
        },
        success: true
      })
    }
  });
}

exports.getCaptcha = async (req, res) => {
  const time = Date.now();
  const options = {
    encoding: null,
    method: 'get',
    url: `https://www.zhihu.com/captcha.gif?r=${time}&type=login`,
  }
  request(options, (err, response, body) => {
    if (response.headers['set-cookie']) {
      response.headers['set-cookie'].forEach(r => {
        const cookie = r.split(';')[0]
        const name = cookie.split('=')[0]
        const value = cookie.replace(`${name}=`, '')
        res.cookie(name, value, {
          httpOnly: true
        });
      })
    }
    res.send(body)
  })
}

// 用户注册
exports.register = (req, res) => co(function* () {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.json({success: false, message: '参数错误'});
  }
  let user = yield UserModel.findOne({
    username
  });
  if (user) {
    res.json({success: false, message: '用户已存在'});
  } else {
    let result = yield UserModel.create({
      username, password: sha1(password)
    })
    if (result) {
      let person = {username: username, password: sha1(password)};
      delete person.password;
      console.log('sdf', person);
      req.session.user = person;
      res.json({success: true, message: '用户创建成功'})
    } else {
      res.json({success: false, message: '用户创建失败'})
    }
  }
})

// 用户登录
exports.login = (req, res) => co(function* () {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.json({success: false, message: '参数错误'});
    return;
  }
  let user = yield UserModel.findOne({
    username
  })
  if (user) {
    if (user.password === sha1(password)) {
      res.json({success: true, message: '登录成功'});
    } else {
      res.json({success: false, message: '密码错误'})
    }
  } else {
    res.json({success: false, message: '没有该用户'});
  }
})