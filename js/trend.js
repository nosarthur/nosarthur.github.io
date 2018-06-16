
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(d3.time.format("%Y-%m-%d"))
    .ticks(4)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(4)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.rate); });

var svg = d3.select("#trend").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/assets/trend.csv", function(error, data) {
  if (error) throw error;
  data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.rate = +d.rate;
  });
//console.log(data);
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.rate; })]);
  svg.append("path")
      .attr("class", "line")
      .attr("d", line(data))
      .style('fill', 'none')
      .style('stroke-width', 2)
      .style('stroke', 'steelblue');
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
});
