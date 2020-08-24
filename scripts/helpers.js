const d3node = require('d3-node');

makePaths = (baseUrl, files) => {
  return files.split(";").map(file => `${baseUrl}/${file}.csv`);
}

generateGraph = (data) => {
  const d3n = new d3node()
  d3n.createSVG(500,500)
  .append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "pink");
  return d3n.svgString();
}

module.exports = {
  makePaths: makePaths,
  generateGraph: generateGraph
}