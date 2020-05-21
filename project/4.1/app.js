// var data = [10,20,30,40,50];
var data = [];

for (var i = 0; i < 20; i++) {
    var num = Math.floor(Math.random() * 50);
    data.push(num);
}
console.log(data);

// d3.select('#chart')
//     .selectAll('div')
//     .data(data)
//     .enter()
//     .append('div')
//     .attr('class', 'bar')
//     .style('height', function (d) {
//         var height = d * 3;
//         return height + 'px';
//     })

//创建SVG元素
var chart_width = 800;
var chart_height = 400;
var bar_padding = 5;
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height)

//绑定数据和创建条形图
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
        return i * (chart_width / data.length);
    })
    .attr('y', function(d) {
        return chart_height - d * 5;
    })
    .attr('width', chart_width / data.length - bar_padding)
    .attr('height', function(d) {
        return d * 5;
    })
    .attr('fill', '#7ed26d')

//添加label
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {
        return d;
    })
    .attr('x', function(d, i) {
        return i * (chart_width / data.length) + (chart_width / data.length - bar_padding) / 2
    })
    .attr('y', function(d) {
        return chart_height - d * 5 + 15;
    })
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')