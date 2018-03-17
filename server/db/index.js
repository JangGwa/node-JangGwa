var mongoose = require('mongoose');
var config = require('../config/default');

mongoose.connect(config.url, { useMongoClient: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('连接数据库成功');
})

db.on('error', error => {
  console.log('连接数据库失败', error)
  mongoose.disconnect();
})

db.on('close', () => {
  console.log('数据库断开，重新连接数据库');
  mongoose.connect(config.url, { server: { auto_reconnect: true } });
})