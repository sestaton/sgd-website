var express = require('express');
var router = express.Router();

/* GET about listing. */
router.get('/geneticmap', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('geneticmap', { title: 'Sunflower Genome Database' });
});

module.exports = router;
