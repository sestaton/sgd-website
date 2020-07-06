const express = require('express');
const router = express.Router();

/* GET pag2016 listing. */
router.get('/pag2016', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('pag2016', { title: 'Sunflower Genome Database' });
});

module.exports = router;
