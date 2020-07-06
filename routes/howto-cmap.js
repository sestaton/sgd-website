const express = require('express');
const router = express.Router();

/* GET howto-cmap listing. */
router.get('/howto-cmap', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('howto-cmap', { title: 'Sunflower Genome Database' });
});

module.exports = router;
