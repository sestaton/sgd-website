const express = require('express');
const router = express.Router();

/* GET variants listing. */
router.get('/variants', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('variants', { title: 'Sunflower Genome Database' });
});

module.exports = router;
