const express = require('express');
const router = express.Router();

/* GET howto-blast listing. */
router.get('/howto-blast', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('howto-blast', { title: 'Sunflower Genome Database' });
});

module.exports = router;
