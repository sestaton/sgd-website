var express = require('express');
var router = express.Router();

/* GET about listing. */
router.get('/', function(req, res, next) {
      //res.send('respond with a resource');
	res.render('contact', { title: 'Sunflower Genome Database' });
});

module.exports = router;
