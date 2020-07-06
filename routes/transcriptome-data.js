const express = require('express');
const router = express.Router();

/* GET transcriptome listing. */
router.get('/transcriptome-data', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('transcriptome-data', { title: 'Sunflower Genome Database' });
});

module.exports = router;
