var request = require('request-promise-native');
var cheerio = require('cheerio');
var ZhihuModel = require('../models/zhihu');

exports.zhihuLogin = async (req, res) => {
  // const cookiee = await CookieeModel.findOne({userId: 1});
  // console.log('cookiee', cookiee)
  // const isLogined = await this.isLogined(req.body);
  const cookie = Object.keys(req.cookies).map(key => `${key}=${req.cookies[key]};`).join(' ')
  const options = {
    url: 'https://www.zhihu.com/login/phone_num',
    form: req.body,
    headers: {
      'Origin': 'https://www.zhihu.com',
      'Host': 'www.zhihu.com',
      'Cookie': cookie,
      'X-Xsrftoken': ''
    }
  }
  let rs = await request.post(options).on('response', function(response) {
    // let cookies = utils.handleHeaders(response);
    // if (!cookiee) {
    //   CookieeModel.create({userId: 1, zhihuCookie: cookies})
    // }
    if (response.headers['set-cookie']) {
      response.headers['set-cookie'].forEach(r => {
        const cookie = r.split(';')[0]
        const name = cookie.split('=')[0]
        const value = cookie.replace(`${name}=`, '')
        res.cookie(name, value);
      })
    }
  })
  if (typeof(rs) === 'string') {
    try {
      rs = JSON.parse(rs);
    } catch(err) {
      console.log(err);
    }
  }
  if (rs.errcode) {
    res.json({success: false, data: rs.data})
  } else {
    res.json({success: true, data: rs})
  }
}

exports.zhihuTopic = async (req, res) => {
  const cookie = Object.keys(req.cookies).map(key => `${key}=${req.cookies[key]};`).join(' ');
  const options = {
    url: 'https://www.zhihu.com/topic',
    method: 'GET',
    headers: {
      'Cookie': cookie
    }
  }
  // const rs = await request(options, function(err, res, body) {
  //   const $ = cheerio.load(body);
  //   $('.zm-topic-cat-item').map((item, index) => {
  //     // console.log('id', $(item).text())
  //   })
  // });
  const rs = await request(options);
  const $ = cheerio.load(rs);
  let topics = []
  $('.zm-topic-cat-item').each((k, topic) => {
    topics.push({
      topicId: $(topic).data('id'),
      urlToken: Number($(topic).data('href').replace('/topic/', '')),
      name: $(topic).text()
    })
  })
  res.json({success: true, data: topics})
}