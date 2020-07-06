const express = require('express');
const router = express.Router();

/* GET about listing. */
router.get('/assembly', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('assembly', { title: 'Sunflower Genome Database' });
});

module.exports = router;
