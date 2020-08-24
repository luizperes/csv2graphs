var express = require('express');
var router = express.Router();
const {
  makePaths
} = require('../scripts/helpers')

/* GET generate listing. */
router.get('/', function(req, res, next) {
  const baseUrl = req.query.baseUrl;
  const files = req.query.files;
  const xaxis = req.query.xaxis;
  const yaxis = req.query.yaxis;
  try {
    if (![baseUrl, files, xaxis, yaxis].some(x => x === undefined)) {
      const allPaths = makePaths(baseUrl, files);
      res.send(allPaths);
    } else {
      throw new Error("Expected query params 'baseUrl', 'files', 'xaxis' and 'yaxis'");
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router;
