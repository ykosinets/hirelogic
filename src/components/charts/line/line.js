export default function lineChart(element, data, color) {
	if (!element || !data) return;

	color = color || '#063dc7';

	const weekDay = ["Days", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
	const getDay = (n) => {
		let weekDay = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
		return weekDay.indexOf(weekDay[n - 1]) >= 0 ? weekDay[n - 1] : "Days";
	};

// set the dimensions and margins of the graph
	let margin = {top: 50, right: 0, bottom: 50, left: 50},
		width = 910 - margin.left - margin.right,
		height = 640 - margin.top - margin.bottom;

	// set the ranges
	let x = d3.scaleLinear().range([0, width]);
	let y = d3.scaleLinear().range([height, 0]);

	// define the area
	let valueArea = d3.area()
		.curve(d3.curveCardinal)
		.x(function (d, i) {
			return x(i);
		})
		.y0(height)
		.y1(function (d) {
			return y(d.value);
		});

	let valueLine = d3.line()
		.curve(d3.curveCardinal)
		.x(function (d, i) {
			return x(i);
		})
		.y(function (d) {
			return y(d.value);
		});

	let svg = d3.select(element)
		.append("svg")
		.attr('preserveAspectRatio', 'xMinYMin meet')
		.attr('viewBox', '0 0 ' +  (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
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
		.attr("x2", 0).attr("y2", y(height))
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

	const xAxis = d3.axisBottom(xLabels);
	const yAxis = d3.axisLeft(y);

	// Add the X Axis
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis
			.tickSize(0)
			.tickPadding(30)
			.tickFormat((d) => d))
		.attr("class", "xAxis")
		.call(g => g.select(".domain").remove());

	// Add the Y Axis
	svg.append("g")
		.attr("class", "yAxis")
		.call(yAxis
			.ticks(5)
			.tickPadding(30)
			.tickSize(-width)
			.tickFormat((d) => d))
		.call(g => g.select(".domain").remove());

	// Add the line
	svg.append("path")
		.data([data])
		.attr("class", "line")
		.attr("stroke", color)
		.attr("d", valueLine);

	// Add the area.
	svg.append("path")
		.data([data])
		.attr("class", "area")
		.attr("fill", "url(#" + gradientId + ")")
		.attr("d", valueArea);


	svg.selectAll('.xAxis')
		.append('text')
		.attr('class', 'xAxisTitle')
		.attr("transform", `translate(0, 45)`)
		.text('Days');
}
