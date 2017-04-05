var express = require('express');
var router = express.Router();

var app = express();

app.get('/', function(req, res, next) {
      //res.send('respond with a resource');
      //res.render('about', { title: 'Sunflower Genome Database' });
      console.log("Request to /blast app");
});

app.listen(4567);
module.exports = app;
//module.exports = router;
