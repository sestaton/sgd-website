const express = require('express');
const router = express.Router();

/* GET news-annotation listing. */
router.get('/news-annotation-updates', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('news-annotation-updates', { title: 'Sunflower Genome Database' });
});

module.exports = router;
