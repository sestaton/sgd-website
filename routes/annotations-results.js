const express = require('express');
const router = express.Router();

/* GET about listing. */
router.get('/annotations-results', function(req, res, next) {
	res.render('annotations-results', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
