var express = require('express');
var router = express.Router();

/* GET about listing. */
router.get('/assembly-data', function(req, res, next) {
        res.render('assembly-data', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
