var request = require('request-promise-native');
var urlencode = require('urlencode');
var cheerio = require('cheerio');
var axios = require('axios');

exports.getTv = async (req, res) => {
  const options = {
    url: 'https://mapp.youku.com/front/action2?topicurl=filter&pageurl=getMacData&p=1&c=97&a=&g=&r=0&u=0&pt=0&d=4&s=1&av=0&ag=0&sg=&mt=&lg=&q=&pr=&h=',
    method: 'GET',
  }
  const rs = await request(options);
  const $ = cheerio.load(rs);
  let films= []
  let titles= []
  $('.l-detail-t').each((k, title) => {
    let str = $(title).text()
    str = str.replace(/\s+/g,"");
    let urlStr = urlencode(str);
    titles.push(urlStr)
    films.push({
      title: str,
      img: '',
      score: 0
    })
  })

  $('.pic img').each((k, img) => {
    films[k].img = 'http:' + $(img).attr('src')
  })

  // for(let i=0;i < 1; i++) {
  const searchOptions = {
    url: 'https://www.baidu.com/s?wd=%E6%96%B0%E4%B8%89%E5%9B%BD%E8%B1%86%E7%93%A3%E8%AF%84%E5%88%86',
    method: 'GET'
  }
  let b = [];
  request(searchOptions, (err, response, body) => {
    res.send({data: body})
  })
  // let a = await request(searchOptions)
  // const $1 = cheerio.load(a);
  // $1('.op_exactqa_s_answer').each((k, title) => {
  //   console.log('sdf')
  //   let c = $1(title).text();
  //   b.push(c)
  // })

  //   let score = JSON.parse(s)
  //   console.log("sdfdsf", score)
  //   films[i].score = score.subjects[0]
  // }

  // res.json({success: true, data: b});
}