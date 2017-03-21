var express = require('express');
var router = express.Router();

/* GET about listing. */
router.get('/physicalmap-data', function(req, res, next) {
        res.render('physicalmap-data', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
