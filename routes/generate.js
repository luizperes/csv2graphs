var express = require('express');
const d3node = require('d3-node')
var router = express.Router();

/* GET generate listing. */
router.get('/', function(req, res, next) {
  const d3n = new d3node()
  d3n.createSVG(500,500)
  .append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "pink");
  res.send(d3n.svgString());
});

module.exports = router;
