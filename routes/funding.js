var express = require('express');
var router = express.Router();

/* GET funding listing. */
router.get('/funding', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('funding', { title: 'Sunflower Genome Database' });
});

module.exports = router;
