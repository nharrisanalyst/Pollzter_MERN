var express = require('express');
var router = express.Router();


var Users = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
   let user = req.params.user;

   
});

module.exports = router;
