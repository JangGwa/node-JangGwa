var co = require('co');
var ZhihuModel = require('../models/zhihu');

exports.judgeLoad = ($) => {
  if ($('#error').length) {
    return {
      success: false,
      status: 500,
      msg: 'IP被限'
    }
  } else {
    return {
      success: true
    }
  }
}

exports.handleHeaders = (result) => {
  if (result.headers['set-cookie']) {
    let cookies = '';
    result.headers['set-cookie'].forEach(r => {
      const cookie = r.split(';')[0]
      let cookiee = cookie.concat('; ');
      // const name = cookie.split('=')[0]
      // const value = cookie.replace(`${name}=`, '')
      cookies = cookies.concat(cookiee);
    })
    return cookies;
  }
}

exports.isLogined = (params) => co(function* () {
  yield ZhihuModel.findOne({phone_num: params.phone_num});
})