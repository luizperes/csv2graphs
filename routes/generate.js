var express = require('express');
var router = express.Router();
const {
  makePaths
} = require('../scripts/helpers')

/* GET generate listing. */
router.get('/', function(req, res, next) {
  res.send(makePaths("blah", "jaca"));
});

module.exports = router;
