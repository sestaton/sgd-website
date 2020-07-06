const express = require('express');
const router = express.Router();

/* GET diversity listing. */
router.get('/diversity', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('diversity', { title: 'Sunflower Genome Database' });
});

module.exports = router;
