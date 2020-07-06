const express = require('express');
const router = express.Router();

/* GET news-expression listing. */
router.get('/news-expression', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('news-expression', { title: 'Sunflower Genome Database' });
});

module.exports = router;
