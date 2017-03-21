var express = require('express');
var router = express.Router();

/* GET about listing. */
router.get('/annotations-data', function(req, res, next) {
        res.render('annotations-data', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
