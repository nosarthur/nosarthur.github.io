
var data = [[0.12, 0.2, 0], [0.2, 0.8, 0], // black dots
            [0.8, 0.25, 0], [0.6, 0.4, 0], [0.67, 0.23, 0],
            [0.89, 0.9, 1], [0.6, 0.8, 1], // white dots
            [0.62, 0.6, 1], [0.33, 0.4,1], [0.35, 0.1, 1]];

var margin = {top: 10, right: 15, bottom: 50, left: 50},
    width  = 300,
    height = 300;

var xScale = d3.scale.linear()
                     .domain([0, 1])
                     .range([0, width]);

var yScale = d3.scale.linear()
                     .domain([0, 1])
                     .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .ticks(1)
    .orient("bottom");

var xAxis2 = d3.svg.axis()
    .scale(xScale)
    .ticks(0)
    .orient("top");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .ticks(1)
    .orient("left");

var yAxis2 = d3.svg.axis()
    .scale(yScale)
    .ticks(0)
    .orient("right");

var svg = d3.select("#dots").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append('g')
   .attr('class', 'x axis')
   .attr("transform", "translate(0," + height + ")")
   .call(xAxis);
svg.append('g')
   .attr('class', 'x axis')
   .call(xAxis2);
svg.append("g")
   .attr("class", "y axis")
   .call(yAxis);
svg.append("g")
   .attr("class", "y axis 2")
   .attr("transform", "translate(" + width+ ",0)")
   .call(yAxis2);


svg.append("text")
   .attr("class", "x label")
   .attr("text-anchor", "middle")
   .attr("x", width/2)
   .attr("y", height + margin.top + 30)
   .text("x\u2081");

svg.append("text")
   .attr("text-anchor", "middle") 
   .attr("x", -margin.left/2)
   .attr("y", height/2)
   .text("x\u2082");

svg.selectAll('circle')
   .data(data)
   .enter()
   .append('circle')
   .attr('cx', function(d){ return xScale(d[0]);})
   .attr('cy', function(d){ return yScale(d[1]);})
   .attr('fill', function(d){ return d[2]==1? 'white':'black';})
   .attr('stroke', 'black')
   .attr('r', 5);


