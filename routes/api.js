var express = require('express'),
  router= express.Router(),
  crypto = require('crypto');


//GET
router.get('/', function(req,res,next){
        res.send('this is an endpoint for an api use an api end with authorization to get data')
        res.end();
})






module.exports = router;
