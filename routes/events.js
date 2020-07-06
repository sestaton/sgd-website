const express = require('express');
const router = express.Router();

/* GET events listing. */
router.get('/events', function(req, res, next) {
      //res.send('respond with a resource');
      res.render('events', { title: 'Sunflower Genome Database' });
});

module.exports = router;
