const express = require('express');
const router = express.Router();

/* GET news-tools listing. */
router.get('/news-tools', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('news-tools', { title: 'Sunflower Genome Database' });
});

module.exports = router;
