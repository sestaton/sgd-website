const express = require('express');
const router = express.Router();

/* GET about listing. */
router.get('/geneticmap-results', function(req, res, next) {
	res.render('geneticmap-results', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
