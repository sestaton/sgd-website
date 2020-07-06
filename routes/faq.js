const express = require('express');
const router = express.Router();

/* GET faq listing. */
router.get('/faq', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('faq', { title: 'Sunflower Genome Database' });
});

module.exports = router;
