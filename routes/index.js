var express = require('express');
var router = express.Router();

// 如果手动引入ejs:
// var ejs = require('ejs');
// var path = require('path');
// var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '无影有记' });

  // 如果手动引入ejs:
  // var pathString = path.join(__dirname, '../views/index.ejs');
  // var content = fs.readFileSync(pathString, 'utf-8');
  // var html = ejs.render(content, {title: 'hello world'});
  // res.send(html);
});

module.exports = router;
