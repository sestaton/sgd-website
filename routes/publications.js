const express = require('express');
const router = express.Router();

/* GET publications listing. */
router.get('/publications', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('publications', { title: 'Sunflower Genome Database' });
});

module.exports = router;
