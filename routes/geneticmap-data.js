var express = require('express');
var router = express.Router();

/* GET about listing. */
router.get('/geneticmap-data', function(req, res, next) {
        res.render('geneticmap-data', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
