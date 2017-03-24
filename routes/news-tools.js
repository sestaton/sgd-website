var express = require('express');
var router = express.Router();

/* GET news-tools listing. */
router.get('/news-tools', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('news-tools', { title: 'Sunflower Genome Database' });
});

module.exports = router;
