var express = require('express');
var router = express.Router();

/* GET news-browser listing. */
router.get('/news-browser', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('news-browser', { title: 'Sunflower Genome Database' });
});

module.exports = router;
