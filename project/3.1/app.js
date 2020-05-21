// var el = d3.select('body')
//     .append('p')
//     // .attr('class', 'foo bar')
//     .classed('foo', true)
//     .classed('bar', true)
//     .text('Hello World')
//     .style('color', 'blue');
// console.log(el);
// d3.selectAll('p');


function generate(dataset) {
    // var dataset = [10, 20, 30, 40, 50];
    var el = d3.select('body')
        // .selectAll('body')
        .select('p')
        .data(dataset)
        .enter()
        .append('div')
        .text(function (d) {
            return d;
        })
        .style('color', function (d) {
            if (d > 25) {
                return 'red';
            } else {
                return 'blue';
            }
        })
        .attr('class', function (d) {
            if (d > 25) {
                return 'foo';
            } else {
                return 'bar';
            }
        })
        .classed('a', function (d) {
            return d < 25;
        });
    console.log(el);
}

d3.csv('data.csv').then(function(data){
    console.log(data);
    // generate(data.columns);
})

d3.json('data.json').then(function(data){
    console.log(data);
    generate(data);
})


