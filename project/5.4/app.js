var data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

//创建SVG元素
var chart_width = 800;
var chart_height = 400;
var bar_padding = 5;
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height)

var x_scale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, chart_width])
    .paddingInner(0.1)

var y_scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, chart_height])

//绑定数据和创建条形图
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return x_scale(i);
    })
    .attr('y', function (d) {
        return chart_height - y_scale(d);
    })
    .attr('width', x_scale.bandwidth())
    .attr('height', function (d) {
        return y_scale(d);
    })
    .attr('fill', '#7ed26d')
  
//添加label
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function (d) {
        return d;
    })
    .attr('x', function (d, i) {
        return x_scale(i) + x_scale.bandwidth() / 2;
    })
    .attr('y', function (d) {
        return chart_height - y_scale(d) + 15;
    })
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')

d3.select('.update').on('click', function () {
    // data.reverse();
    data[0] = 50;
    y_scale.domain([0, d3.max(data)]);

    svg.selectAll('rect')
        .data(data)
        .transition()
        .delay(function (d, i) {
            return i / data.length * 1000;
        })
        .duration(1000)
        .ease(d3.easeElasticOut)
        // .attr('opacity', Math.random())
        .attr('y', function (d) {
            return chart_height - y_scale(d);
        })
        .attr('height', function (d) {
            return y_scale(d)
        })

    svg.selectAll('text')
        .data(data)
        .transition()
        .delay(function (d, i) {
            return i / data.length * 1000;
        })
        .duration(1000)
        .ease(d3.easeElasticOut)
        .attr('y', function (d) {
            return chart_height - y_scale(d) + 15;
        })
        .text(function (d) {
            return d;
        })
})

// Add Data
d3.select('.add').on('click', function () {
    // Add New Data
    var new_num = Math.floor(Math.random() * d3.max(data))
    data.push(new_num);

    // Update Scales
    x_scale.domain(d3.range(data.length));
    y_scale.domain([0, d3.max(data, function (d) {
        return d;
    })])

    // Select Bars
    var bars = svg.selectAll('rect').data(data);

    // Add New Bar
    bars.enter()
        .append('rect')
        .attr('x', function (d, i) {
            return x_scale(i)
        })
        .attr('y', chart_height)
        .attr('width', x_scale.bandwidth())
        .attr('height', 0)
        .attr('fill', '#7ed26d')
        .merge(bars)
        .transition()
        .duration(1000)
        .attr('x', function (d, i) {
            return x_scale(i)
        })
        .attr('y', function (d) {
            return chart_height - y_scale(d);
        })
        .attr('width', x_scale.bandwidth())
        .attr('height', function (d) {
            return y_scale(d)
        })

    // Add new labels
    var labels = svg.selectAll('text').data(data)
    labels.enter()
        .append('text')
        .text(function (d) {
            return d;
        })
        .attr('x', function (d, i) {
            return x_scale(i) + x_scale.bandwidth() / 2;
        })
        .attr('y', chart_height)
        .attr('font-size', '14px')
        .attr('fill', '#fff')
        .attr('text-anchor', 'middle')
        .merge(labels)
        .transition()
        .duration(1000)
        .attr('x', function (d, i) {
            return x_scale(i) + x_scale.bandwidth() / 2;
        })
        .attr('y', function (d) {
            return chart_height - y_scale(d) + 15;
        })


})
