const express = require('express');
const router = express.Router();

/* GET howto-geneexpression listing. */
router.get('/howto-geneexpression', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('howto-geneexpression', { title: 'Sunflower Genome Database' });
});

module.exports = router;
