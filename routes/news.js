var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/news', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('news', { title: 'Sunflower Genome Database' });
});

module.exports = router;