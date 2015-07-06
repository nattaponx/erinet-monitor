var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'home.html'));
});

router.get('/home', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'home.html'));
});

router.get('/etv', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'etv.html'));
});

router.get('/pdc', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'pdc.html'));
});

router.get('/duc', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'duc.html'));
});

router.get('/performance', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'performance.html'));
});

router.get('/dashboard', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'dashboard.html'));
});

module.exports = router;
