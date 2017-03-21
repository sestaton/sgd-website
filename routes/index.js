var express = require('express');
var router = express.Router();
//var fs = require('fs');

//var template = require('pug').compileFile('views/index.pug')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Sunflower Genome Database' });
	//var html = template({ title: 'Sunflower Genome Database' });
	//res.send(html);
});

//module.exports = function(app) {
//    fs.readdirSync(__dirname).forEach(function(file) {
//	    if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
//		return;
//	    var name = file.substr(0, file.indexOf('.'));
//	    require('./' + name)(app);
//	});
//}

module.exports = router;
