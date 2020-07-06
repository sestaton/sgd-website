const express = require('express');
const router = express.Router();

/* GET about listing. */
router.get('/physicalmap-data', function(req, res, next) {
        res.render('physicalmap-data', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
