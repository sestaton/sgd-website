const express = require('express');
const router = express.Router();

/* GET terms-and-conditions listing. */
router.get('/terms-and-conditions', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('terms-and-conditions', { title: 'Sunflower Genome Database' });
});

module.exports = router;
