var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
      res.render('stress/index', { title: 'Genomics of abiotic stress in wild and cultivated sunflowers' });
});

router.get('/about-genomics-of-abiotic-stress', function(req, res, next) {
	res.render('stress/about-genomics-of-abiotic-stress', { title: 'Genomics of abiotic stress in wild and cultivated sunflowers' });
});

router.get('/about-sunflowers', function(req, res, next) {
	res.render('stress/about-sunflowers', { title: 'Genomics of abiotic stress in wild and cultivated sunflowers' });
});

router.get('/experimental-approaches', function(req, res, next) {
	res.render('stress/experimental-approaches', { title: 'Genomics of abiotic stress in wild and cultivated sunflowers' });
});

router.get('/ge3ls-research', function(req, res, next) {
	res.render('stress/ge3ls-research', { title: 'Genomics of abiotic stress in wild and cultivated sunflowers' });
});

router.get('/rationale-significance', function(req, res, next) {
	res.render('stress/rationale-significance', { title: 'Genomics of abiotic stress in wild and cultivated sunflowers' });
});

router.get('/research-support', function(req, res, next) {
        res.render('stress/research-support', { title: 'Genomics of abiotic stress in wild and cultivated sunflowers' });
});

router.get('/research-team', function(req, res, next) {
        res.render('stress/research-team', { title: 'Genomics of abiotic stress in wild and cultivated sunflowers' });
});

router.get('/scientific-outcomes', function(req, res, next) {
        res.render('stress/scientific-outcomes', { title: 'Genomics of abiotic stress in wild and cultivated sunflowers' });
});

router.get('/the-challenge', function(req, res, next) {
        res.render('stress/the-challenge', { title: 'Genomics of abiotic stress in wild and cultivated sunflowers' });
});

module.exports = router;

