var express = require('express');
var router = express.Router();

/* GET about listing. */
router.get('/assembly-results', function(req, res, next) {
	res.render('assembly-results', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
