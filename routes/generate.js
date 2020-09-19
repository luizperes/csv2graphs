var express = require('express');
var router = express.Router();
const {
  makePaths,
  downloadAllCSVs,
  generateGraph
} = require('../scripts/helpers')

/* GET generate listing. */
router.get('/', function(req, res, next) {
  const baseUrl = req.query.baseUrl;
  const files = req.query.files;
  const xaxis = req.query.xaxis;
  const yaxis = req.query.yaxis;
  const width = req.query.width;
  const height = req.query.height;
  const colors = req.query.colors;
  const sfmd = req.query.sfmd;
  const filter = req.query.filter;
  const filterv = req.query.filterv;
  const group = req.query.group;
  const timeParse = req.query.timeParse;
  try {
    const sfmdObj = { sfmd: sfmd, filter: filter, filterv: filterv, group: group };
    if (sfmd !== undefined && group === undefined) {
      throw new Error("Whenever 'sfmd' is set, 'group' must also be set");
    }
    if (typeof filter !== typeof filterv) {
      throw new Error("'filter' and 'filterv' should either be both set or both not set.")
    }
    if (![baseUrl, files, xaxis, yaxis].some(x => x === undefined)) {
      const allPaths = makePaths(baseUrl, files);
      downloadAllCSVs(allPaths, xaxis, yaxis, sfmdObj, timeParse).then((values) => {
        const graph = generateGraph(values, width, height, colors, files);
        res.setHeader('content-type', 'image/svg+xml');
        res.status(200).send(graph);
      });
    } else {
      throw new Error("Expected query params 'baseUrl', 'files', 'xaxis' and 'yaxis'");
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router;
