var axios = require('axios');
var request = require('request');
var superagent = require('superagent');
var co = require('co');

exports.fetchFinance = (req, res) => {
  axios.get('http://web.juhe.cn:8080/finance/stock/hs?gid=sh600689&key=32f4f3950a19f7673e6dec674f862601')
  .then(response => {
    if (response.data.resultcode === '200') {
      res.json({
        success: true, data: response.data
      });
    } else {
      res.json({
        success: false,
        message: '获取资源错误'
      });
    }
  })
}
