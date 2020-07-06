const express = require('express');
const router = express.Router();

/* GET pag2014 listing. */
router.get('/pag2014', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('pag2014', { title: 'Sunflower Genome Database' });
});

module.exports = router;
