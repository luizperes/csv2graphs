const d3node = require('d3-node');
if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill');
}

makeFiles = (files) => {
  return files.split(";");
}

makePaths = (baseUrl, files) => {
  return makeFiles(files).map(file => `${baseUrl}/${file}.csv`);
}

downloadAllCSVs = (csvs, xaxis, yaxis) => {
  const d3n = new d3node();
  const parseTime = d3n.d3.timeParse("%d-%b-%y");

  fn = (csv) => d3n.d3.csv(csv, (d) => {
    return {
      x: parseTime(d[xaxis]),
      y: d[yaxis]
    }
  });

  return Promise.all(csvs.map(csv => fn(csv)));
}

makeColor = (colors, i) => {
  if (colors !== undefined) {
    return colors.split(';')[i];
  }

  return 'steelblue';
}

generateGraph = (data, w, h, colors, files) => {
  const d3n = new d3node();
  const d3 = d3n.d3;
  const margin = ({top: 20, right: 30, bottom: 30, left: 40});
  const initWidth = (w || 500);
  const width = initWidth - margin.left - margin.right;
  const initHeight = (h || 500);
  const height = initHeight - margin.top - margin.bottom;
  const tickSize = 5;
  const lineWidth = 1.5;

  const svg = d3n.createSVG(initWidth + margin.right, initHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  const g = svg.append('g');

  const xScale = d3.scaleTime()
    .domain(d3.extent(data[0], d => d.x))
    .rangeRound([0, width]);
  const yScale = d3.scaleLinear()
    .domain([d3.min(data, d => d3.min(d, v => v.y)), d3.max(data, d => d3.max(d, v => v.y))])
    .rangeRound([height, 0]);
  const xAxis = d3.axisBottom(xScale)
    .tickSize(tickSize)
    .tickPadding(tickSize);
  const yAxis = d3.axisLeft(yScale)
    .tickSize(tickSize)
    .tickPadding(tickSize);
  
  const lineChart = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));
  
  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  g.append('g').call(yAxis);

  g.append('g')
    .attr('fill', 'none')
    .attr('stroke-width', lineWidth)
    .selectAll('path')
    .data(data)
    .enter().append("path")
    .attr('stroke', (d, i) => makeColor(colors, i))
    .attr('d', lineChart);
  
  fnText = (filename, i) => {
    g.append("text")
      .attr("transform", "translate(" + (width+3) + "," + (i+1) * 20 + ")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", makeColor(colors, i))
      .text(filename);
  };

  if (files !== undefined) {
    makeFiles(files).forEach(fnText);
  }

  return d3n.svgString();
}

module.exports = {
  makePaths: makePaths,
  downloadAllCSVs: downloadAllCSVs,
  generateGraph: generateGraph
}