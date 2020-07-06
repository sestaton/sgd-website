const express = require('express');
const router = express.Router();

/* GET about listing. */
router.get('/annotations', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('annotations', { title: 'Sunflower Genome Database' });
});

module.exports = router;
