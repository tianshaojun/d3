var a = d3.scaleLinear()
    .domain([0.4344,0.0912])
    .range([0,100])
    .nice()

var b = d3.scaleLinear()
    .domain([0,10])
    .rangeRound([0,100])

b(5) // 50
b(4.55) // 45

var c = d3.scaleLinear()
    .domain([5,10])
    .range([50,100])
    .clamp(true)

c(6) // 60
c(3) // 50

var d = d3.scalePow() // y = m * x^k + b
    .exponent(0.5)
    .domain([0,100])
    .range([0,30])

d(0); // 0
d(50); // 21.21...
d(100); // 30

var e = d3.scaleSqrt()
    .domain([0,100])
    .range([0,30])

e(0); // 0
e(50); // 21.21...
e(100); //30


