var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/login', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

router.get('/login_failed', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'login_failed.html'));
});

router.get('/', requireAuth, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'home.html'));
});

router.get('/home', requireAuth, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'home.html'));
});

router.get('/etv', requireAuth, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'etv.html'));
});

router.get('/pdc', requireAuth, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'pdc.html'));
});

router.get('/duc', requireAuth, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'duc.html'));
});

router.get('/performance', requireAuth, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'performance.html'));
});

router.get('/dashboard', requireAuth, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'dashboard.html'));
});


module.exports = router;


function requireAuth(req, res, next){

  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  else
  	next();

}


