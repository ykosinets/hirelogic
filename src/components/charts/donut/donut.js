export default function donutChart(element, data) {
	if (!element || !data) return;

	let text = "";
	let gap = 20;
	let width = 200 + gap * 2;
	let height = 200 + gap * 2;
	let thickness = 5;

	let radius = Math.min(width, height) / 2;

	let svg = d3.select(element)
		.append('svg')
		.attr('class', 'pie')
		.attr('width', width)
		.attr('height', height)
		.attr('cornerRadius', 3);

	let arc = d3.arc()
		.innerRadius(radius - thickness)
		.outerRadius(radius);

	let textArc = d3.arc()
		.innerRadius(radius + gap)
		.outerRadius(radius + gap);

	let g = svg.append('g')
		.attr('transform', 'translate(' + ((width) / 2) + ',' + ((height) / 2) + ')');

	let pie = d3.pie()
		.value(function (d) {
			return d.value;
		})
		.sort(null);

	pie.padAngle(.05)(data);
	let arcs = pie(data);

	let path = g.selectAll('path')
		.data(pie(data))
		.enter()
		.append("g")
		.append('path')
		.attr('d', arc)
		.attr('fill', (d, i) => data[d.index].color)
		.each(function (d, i) {
			this._current = i;
		});

	g.append('text')
		.attr('text-anchor', 'middle')
		.attr('dy', '.35em')
		.text(text);

	let circles = g.selectAll(".circles")
		.data(pie(data));

	circles = circles.enter()
		.append("circle")
		.attr("class", "circles")
		.attr("r", 5)
		.attr("fill", "#000")
		.each(function (d) {
			let centroid = arc.centroid(d);
			d3.select(this)
				.attr('transform', 'translate(' + centroid[0] + ', ' + centroid[1] + ')')
				.attr('fill', data[d.index].color)
				.attr('dy', '.1em')
		})
		.merge(circles);

	let texts = g.selectAll(".texts")
		.data(pie(data));

	texts = texts.enter()
		.append('text')
		.attr('text-anchor', 'middle')
		.attr('dy', '.35em')
		.each(function (d) {
			let centroid = textArc.centroid(d);
			d3.select(this)
				.attr('transform', 'translate(' + centroid[0] + ', ' + centroid[1] + ')')
				.attr('fill', data[d.index].color)
				.attr('style', 'font-weight: 500;')
				.text(data[d.index].value + '%')
		})
}
