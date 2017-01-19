var express = require('express'),
  	router  = express.Router();

router.get('/', function(req, res){
  res.render('index', {title: 'prefeitura'});
});

router.get('/morador', function(req, res){
  res.render('index1', {title: 'prefeitura'});
});

router.get('/veranista', function(req, res){
  res.render('index2', {title: 'prefeitura'});
});

router.get('/turista', function(req, res){
  res.render('index3', {title: 'prefeitura'});
});

module.exports = router;
