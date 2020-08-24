# csv2graphs
Create SVG graphs from CSV files

### Working example

##### Files input
- [example1.csv](https://github.com/luizperes/csv2graphs/blob/master/examples/example1.csv)
- [example2.csv](https://github.com/luizperes/csv2graphs/blob/master/examples/example2.csv)

##### Request
`https://csv2graphs.herokuapp.com/generate?baseUrl=https%3A%2F%2Fraw.githubusercontent.com%2Fluizperes%2Fcsv2graphs%2Fmaster%2Fexamples&files=example1;example2&xaxis=date&yaxis=runtime`

##### Response
_// TODO: add generated SVG image_

### Usage:

`https://csv2graphs.herokuapp.com/generate?baseUrl=your-url&files=filenames&xaxis=xaxis-name&yaxis=yaxis-name`

##### baseUrl
Your server url with the path the include your file list.

##### files
The CSV files (separated by `;`, e.g `file1;file2`)

##### xaxis
The name of the xaxis column inside the CSV

##### yaxis
The name of the yaxis column inside the CSV

### Running project

install dependencies:
`npm install`

run the app:
`DEBUG=csv2graphs:* npm start`

or run in dev mode:
`npm run dev`

