var express = require('express');
var router = express.Router();

/* GET pag2013 listing. */
router.get('/pag2013', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('pag2013', { title: 'Sunflower Genome Database' });
});

module.exports = router;
