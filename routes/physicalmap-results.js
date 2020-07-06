const express = require('express');
const router = express.Router();

/* GET about listing. */
router.get('/physicalmap-results', function(req, res, next) {
	res.render('physicalmap-results', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
