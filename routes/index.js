var express = require('express'),
  	router  = express.Router();

// site
router.use('/', require('./site'));

module.exports = router;
