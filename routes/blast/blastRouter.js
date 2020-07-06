const express = require('express');
const router = express.Router();

//var app = express();

router.get('/*:4567', function(req, res, next) {
      //res.send('respond with a resource');
      //res.render('about', { title: 'Sunflower Genome Database' });
      console.log("Request to /blast app");
});

//app.listen(4567);
//module.exports = app;
module.exports = router;
