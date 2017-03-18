var express = require('express');
var router = express.Router();

//var template = require('pug').compileFile('views/index.pug')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Sunflower Genome Database' });
	//var html = template({ title: 'Sunflower Genome Database' });
	//res.send(html);
});

module.exports = router;
