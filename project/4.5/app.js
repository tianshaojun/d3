var data = [
    { date: '11/06/2017', num: 20 },
    { date: '11/07/2017', num: 37 },
    { date: '11/08/2017', num: 25 },
    { date: '11/09/2017', num: 45 },
    { date: '11/10/2017', num: 23 },
    { date: '11/11/2017', num: 33 },
    { date: '11/12/2017', num: 49 },
    { date: '11/01/2017', num: 40 },
    { date: '11/02/2017', num: 36 },
    { date: '11/03/2017', num: 27 }
]

var time_parse = d3.timeParse('%m/%d/%Y');
var time_format = d3.timeFormat('%Y-%m-%d');

data.forEach(function(e, i){
    data[i].date = time_parse(e.date);
})

var chart_width = 1200;
var chart_height = 400;

var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height)

// create Scales
var padding = 50;

var x_scale = d3.scaleTime()
    .domain([
            d3.min(data, function(d) {
            return d.date
        }), 
            d3.max(data, function (d) {
            return d.date
        })
    ])
    .range([padding, chart_width - padding * 2])

var y_scale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
        return d.num
    })])
    .range([padding, chart_height - padding])

var r_scale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
        return d.num
    })])
    .range([5, 30])

var a_scale = d3.scaleSqrt()
    .domain([0, d3.max(data, function(d) {
        return d.num
    })])
    .range([0,25])

svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
        return x_scale(d.date)
    })
    .attr('cy', function (d) {
        return y_scale(d.num)
    })
    .attr('r', function (d) {
        return r_scale(d.num)
    })
    .attr('fill', '#d1ab0e')

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function (d) {
        return time_format(d.date)
    })
    .attr('x', function (d) {
        return x_scale(d.date)
    })
    .attr('y', function (d) {
        return y_scale(d.num)
    })