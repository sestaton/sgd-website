var express = require('express');
var router = express.Router();

/* GET transcriptome listing. */
router.get('/transcriptome-accessions', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('transcriptome-accessions', { title: 'Sunflower Genome Database' });
});

module.exports = router;
