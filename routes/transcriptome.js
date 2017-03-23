var express = require('express');
var router = express.Router();

/* GET transcriptome listing. */
router.get('/transcriptome', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('transcriptome', { title: 'Sunflower Genome Database' });
});

module.exports = router;
