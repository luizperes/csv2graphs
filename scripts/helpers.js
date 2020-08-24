const d3node = require('d3-node');
if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill');
}

makePaths = (baseUrl, files) => {
  return files.split(";").map(file => `${baseUrl}/${file}.csv`);
}

downloadAllCSVs = (csvs, xaxis, yaxis) => {
  const d3n = new d3node();
  fn = (csv) => d3n.d3.csv(csv, (d) => {
    return {
      x: d[xaxis],
      y: d[yaxis]
    }
  });

  return Promise.all(csvs.map(csv => fn(csv)));
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
  downloadAllCSVs: downloadAllCSVs,
  generateGraph: generateGraph
}