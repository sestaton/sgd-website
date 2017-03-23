var express = require('express');
var router = express.Router();

/* GET genespace listing. */
router.get('/genespace', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('genespace', { title: 'Sunflower Genome Database' });
});

module.exports = router;
