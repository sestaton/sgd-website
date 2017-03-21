var express = require('express');
var router = express.Router();

/* GET about listing. */
router.get('/physicalmap-results', function(req, res, next) {
	res.render('physicalmap-results', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
