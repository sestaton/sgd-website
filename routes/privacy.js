const express = require('express');
const router = express.Router();

/* GET privacy listing. */
router.get('/privacy', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('privacy', { title: 'Sunflower Genome Database' });
});

module.exports = router;
