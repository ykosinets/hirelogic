export default function lineChart(element, data, color) {
	if (!element || !data) return;

	color = color || '#063dc7';

	const weekDay = ["Days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const getDay = (n) => {
		let weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		return weekDay.indexOf(weekDay[n - 1]) >= 0 ? weekDay[n - 1] : "Days";
	};

// set the dimensions and margins of the graph
	let margin = {top: 20, right: 20, bottom: 30, left: 30},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// set the ranges
	let x = d3.scaleLinear().range([0, width]);
	let y = d3.scaleLinear().range([height, 0]);

	// define the area
	let area = d3.area()
		.curve(d3.curveCardinal)
		.x(function (d, i) {
			return x(i);
		})
		.y0(height)
		.y1(function (d) {
			return y(d.value);
		});

	let valueline = d3.line()
		.curve(d3.curveCardinal)
		.x(function (d, i) {
			return x(i);
		})
		.y(function (d) {
			return y(d.value);
		});

	// gridlines in x axis function
	function make_x_gridlines() {
		return d3.axisBottom(x)
			.ticks(5)
	}

	// gridlines in y axis function
	function make_y_gridlines() {
		return d3.axisLeft(y)
			.ticks(5)
	}


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
	let svg = d3.select(element)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	// Scale the range of the data
	x.domain(d3.extent(data, function (d, i) {
		return i;
	}));

	y.domain([0, d3.max(data, function (d) {
		return d.value;
	})]);

	// set the gradient
	let gradientId = "area-gradient" + color.replace('#', '-');
	svg.append("linearGradient")
		.attr("id", gradientId)
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("x1", 0).attr("y1", y(0))
		.attr("x2", 0).attr("y2", y(1000))
		.selectAll("stop")
		.data([
			{offset: "0%", color: color, opacity: 0},
			{offset: "100%", color: color, opacity: 1}
		])
		.enter().append("stop")
		.attr("offset", function (d) {
			return d.offset;
		})
		.attr("stop-color", function (d) {
			return d.color;
		})
		.attr("stop-opacity", function (d) {
			return d.opacity;
		});

	const xLabels = d3
		.scalePoint()
		.domain(weekDay)
		.range([0, width]);

	// Add the X Axis
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xLabels))
		.attr("class", "xAxis")
		.call(g => g.select(".domain").remove());

	// Add the Y Axis
	svg.append("g")
		.attr("class", "yAxis")
		.call(d3.axisLeft(y))
		.call(g => g.select(".domain").remove());

	// add the X gridlines
	svg.append("g")
		.attr("class", "grid")
		.attr("transform", "translate(0," + height + ")")
		.call(make_x_gridlines()
			.tickSize(0)
			.tickPadding(100)
			.tickFormat("")
		)
		.call(g => g.select(".domain").remove());

	// add the Y gridlines
	svg.append("g")
		.attr("class", "grid")
		.call(make_y_gridlines()
			.tickSize(-width)
			.tickFormat("")
		)
		.call(g => g.select(".domain").remove());

	// Add the line
	svg.append("path")
		.data([data])
		.attr("class", "line")
		.attr("stroke", color)
		.attr("d", valueline);

	// Add the area.
	svg.append("path")
		.data([data])
		.attr("class", "area")
		.attr("fill", "url(#" + gradientId + ")")
		.attr("d", area);

}
