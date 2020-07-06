const express = require('express');
const router = express.Router();

/* GET news-annotation listing. */
router.get('/news-annotation', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('news-annotation', { title: 'Sunflower Genome Database' });
});

module.exports = router;
