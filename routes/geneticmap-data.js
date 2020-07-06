const express = require('express');
const router = express.Router();

/* GET about listing. */
router.get('/geneticmap-data', function(req, res, next) {
        res.render('geneticmap-data', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
