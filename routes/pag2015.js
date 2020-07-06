const express = require('express');
const router = express.Router();

/* GET pag2015 listing. */
router.get('/pag2015', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('pag2015', { title: 'Sunflower Genome Database' });
});

module.exports = router;
