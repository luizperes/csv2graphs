# csv2graphs
Create SVG graphs from CSV files

### Working example #1

##### Files input
- [example1.csv](https://github.com/luizperes/csv2graphs/blob/master/examples/example1.csv)
- [example2.csv](https://github.com/luizperes/csv2graphs/blob/master/examples/example2.csv)

##### Request
`https://csv2graphs.herokuapp.com/generate?baseUrl=https%3A%2F%2Fraw.githubusercontent.com%2Fluizperes%2Fcsv2graphs%2Fmaster%2Fexamples&files=example2;example1&xaxis=date&yaxis=runtime&width=500&height=400&colors=green;blue`

##### Response
![SVG Response 1](https://csv2graphs.herokuapp.com/generate?baseUrl=https%3A%2F%2Fraw.githubusercontent.com%2Fluizperes%2Fcsv2graphs%2Fmaster%2Fexamples&files=example1;example2&xaxis=date&yaxis=runtime&width=500&height=400&colors=green;blue)

### Working example #2

##### Files input
- [results.csv](https://cs-git-research.cs.surrey.sfu.ca/cameron/parabix-devel/-/blob/37b50d37e0d39e4300f0d4055fce4f808e365a75/tests/perf/artifacts/results.csv)

##### Request
`https://csv2graphs.herokuapp.com/generate?baseUrl=https%3A%2F%2Fcs-git-research.cs.surrey.sfu.ca%2Fcameron%2Fparabix-devel%2F-%2Fraw%2F37b50d37e0d39e4300f0d4055fce4f808e365a75%2Ftests%2Fperf%2Fartifacts&files=results&xaxis=datetime&yaxis=runtime&sfmd=yes&group=host_cpu&filter=test_name&filterv=sherlock&width=500&height=400&colors=green;red&timeParse=%25m%2F%25d%2F%25Y`

##### Response
![SVG Response 2](https://csv2graphs.herokuapp.com/generate?baseUrl=https%3A%2F%2Fcs-git-research.cs.surrey.sfu.ca%2Fcameron%2Fparabix-devel%2F-%2Fraw%2F37b50d37e0d39e4300f0d4055fce4f808e365a75%2Ftests%2Fperf%2Fartifacts&files=results&xaxis=datetime&yaxis=runtime&sfmd=yes&group=host_cpu&filter=test_name&filterv=sherlock&width=500&height=400&colors=green;red&timeParse=%25m%2F%25d%2F%25Y)

### Usage:

`https://csv2graphs.herokuapp.com/generate?baseUrl=your-url&files=filenames&xaxis=xaxis-name&yaxis=yaxis-name`

##### baseUrl
Your server url with the path the include your file list.

##### files
The CSV files (separated by `;`, e.g `file1;file2`).

##### xaxis
The name of the xaxis column inside the CSV.

##### yaxis
The name of the yaxis column inside the CSV.

#### Optional parameters

##### width
The desired width.

##### height
The desired height.

##### colors
The desired colors for each of the lines (separated by `;`, e.g `color1;color2`).

##### sfmd
Single file, multiple data. Set it to `true` in case you only have one csv file with multiple data and will use `filter` and `group`.

##### group
Group by column name. It **must** be specified whenever `sfmd` is set.

##### filter
Filter by column name. It **may** be specified whenever `sfmd` is set.

##### filterv
Value for the filter `column`. **Must** be defined whenever `filter` is defined.

##### timeParse
The pattern of the date to parse (JS style).

### Running project

install dependencies:
`npm install`

run the app:
`DEBUG=csv2graphs:* npm start`

or run in dev mode:
`npm run dev`

