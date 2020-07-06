const express = require('express');
const router = express.Router();

/* GET howto-jbrowse listing. */
router.get('/howto-jbrowse', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('howto-jbrowse', { title: 'Sunflower Genome Database' });
});

module.exports = router;
