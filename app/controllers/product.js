/**
 * Created by zkw on 2017/1/7.
 */
var Product = require('../models/product');
exports.addProduct = function(req,res){
  var _product = req.body.product;
      var product = new Product(_product);
      product.save(function(err,product){
        if(err) console.log(err);
        res.redirect('/product/' + product.msg);
      })
};

exports.addProductPlan = function (req, res) {
  var id = req.params.id;
  var yid = req.params.yid;
  var _num = req.body.planNum;
  var numberPlan = Number(yid) + Number(_num);
  Product.findOne({msg: id})
      .exec(function (err, product) {
        product.update({plan: numberPlan}, function (err, product) {
          if(err) console.log(err);
          res.render('addSuccess', {
            title: '添加成功!'
          })
        });
      })
}

exports.updateProduct = function (req, res) {
  var id = req.params.id;
  var yid = req.params.yid;
  Product.findOne({msg: id})
      .exec(function (err, product) {
        res.render('updateProduct', {
          title: '添加今日生产计划', product: product,yid: yid,
        })
      })

}

exports.showAddProduct = function (req, res) {
  res.render('addProduct', {
    title: '添加产品信息'
  })
};

//需求详情页
exports.productDetail = function (req, res) {
  var id = req.params.id;
    Product
    //在line集合中查找issues字段id和issue集合的id相同的line
    //使用findOne,只取最后插入的一条
        .findOne({msg: id})
        .exec(function (err, product) {
          res.render('productDetail', {
            title: '产品详情', product: product
          })
        })
};

exports.seeProduct = function (req, res) {
  res.render('seeProduct');
};

exports.all = function (req, res) {
  var q = req.query.q;
  //当不存在p参数时，默认展示第一页数据
  var page = parseInt(req.query.p, 10) || 0;
  //每页显示的数据条数
  var count = 10;
  var index = page * count;
  //查找到业务线名字和关键词相同的所有业务
  if (q) {
    //正则匹配关键字
    Product.find({name: new RegExp(q + '.*', 'i')}, function (err, lines) {
      var lineLength = lines.length;
      var lineIdArray = [];
      //获取所有我所在的业务线的业务线id，组成数组
      for (var i = 0; i < lineLength; i++) {
        var lineId = lines[i]._id;
        lineIdArray.push(lineId);
      }
      //列表展示这些业务线的所有需求
      Product
          .find({belongLineId: {$in: lineIdArray}})
          .exec(function (err, issues) {
            //获取每页数据
            var results = issues.slice(index, index + count);
            if (err) {
              console.log(err)
            } else {
              res.render('productList', {
                q: q, title: '需求列表', currentPage: (page + 1), //向上舍入取整
                totalPage: Math.ceil(issues.length / count), products: results
              })
            }
          })
    })
  } else {
      Product
          .find({})
          .exec(function (err, product) {
            //获取每页数据
            var results = product.slice(index, index + count);
            if (err) {
              console.log(err)
            } else {
              res.render('productList', {
                title: '需求列表', currentPage: (page + 1), //向上舍入取整
                totalPage: Math.ceil(product.length / count), products: results
              })
            }
          })
    }
}