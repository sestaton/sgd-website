const express = require('express');
const router = express.Router();

/* GET expression listing. */
router.get('/expression', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('expression', { title: 'Sunflower Genome Database' });
});

module.exports = router;
