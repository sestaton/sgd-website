var express = require('express');
var router = express.Router();

/* GET team listing. */
router.get('/team', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('team', { title: 'Sunflower Genome Database' });
});

module.exports = router;
