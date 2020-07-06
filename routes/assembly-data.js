const express = require('express');
const router = express.Router();

/* GET about listing. */
router.get('/assembly-data', function(req, res, next) {
        res.render('assembly-data', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
