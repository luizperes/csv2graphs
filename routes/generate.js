var express = require('express');
var router = express.Router();
const {
  makePaths
} = require('../scripts/helpers')

/* GET generate listing. */
router.get('/', function(req, res, next) {
  const baseUrl = req.query.baseUrl;
  const files = req.query.files;
  try {
    if (baseUrl !== undefined && files !== undefined) {
      const allPaths = makePaths(baseUrl, files);
      res.send(allPaths);
    } else {
      throw new Error("Expected query params 'baseUrl' and 'files'");
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router;
