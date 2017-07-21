var express = require('express');
var router  = express.Router();
var auth    = require('../helpers/auth');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Food for today' ,stylesheets:["index.css"]});
});



module.exports = router;
