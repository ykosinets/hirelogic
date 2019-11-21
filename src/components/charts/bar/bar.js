export default function lineChart(element, data) {
	if (!element || !data) return;

	let icons = ['', '', '', '',''];

	const margin = {top: 20, right: 20, bottom: 40, left: 30};
	const svgWidth = 960;
	const svgHeight = 500;
	const width = svgWidth - margin.left - margin.right;
	const height = svgHeight - margin.top - margin.bottom;

	const svg = d3
		.select(element)
		.append('svg')
		.attr('preserveAspectRatio', 'xMinYMin meet')
		.attr('viewBox', '0 0 ' + width + ' ' + svgHeight);

	const graphArea = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	const x = d3.scaleBand()
		.rangeRound([0, width])
		.domain(data.map(d => d.name))
		.padding(0.4);

	const y = d3.scaleLinear()
		.range([height, 0])
		.domain([
			d3.min(data, d => d.value_1) - 5,
			d3.max(data, d => d.value_1) + 5
		])
		.nice();

	const xAxis = d3.axisBottom(x);
	const yAxis = d3.axisLeft(y);

	svg
		.append('g')
		.attr('class', 'xAxis')
		.attr("transform", `translate(0, ${height + 20})`)
		.call(xAxis
			.tickSize(0)
			.tickFormat((d) => {return d}))
		.call(g => g.select(".domain").remove());

	svg.selectAll('.xAxis .tick')
		.append('circle')
		.attr('r', 15)
		.attr('fill', '#f7f7fa')
		.attr("transform", `translate(0, -20)`);

	svg.selectAll('.xAxis')
		.append('text')
		.attr('class', 'xAxisTitle')
		.attr("transform", `translate(${margin.left}, 11)`)
		.text('Traits');

	svg.selectAll('.xAxis .tick')
		.append('text')
		.attr("transform", `translate(0, -12.8)`)
		.attr('style', 'font-family: icomoon; font-size: 1rem;')
		.attr('class', 'xAxisIcon')
		.attr('width', 20)
		.attr('height', 20)
		.each(function(d, i){
			this.innerHTML = icons[i];
		});

	svg
		.append('g')
		.attr('class', 'yAxis')
		.call(yAxis
			.tickSize(0)
			.ticks(5)
			.tickSize(-width)
			.tickPadding(10)
			.tickFormat((d) => d))
		.call(g => g.select(".domain").remove());

	const w = 16;
	const rx = w / 2;
	const ry = w / 2;

	graphArea
		.selectAll("bar")
		.data(data)
		.enter().append("path")
		.style("fill", "#063dc7")
		.attr("d", item => `
        M${x(item.name) + 30},${y(item.value_1) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${w - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - margin.top - margin.bottom + 2 - y(item.value_1) - ry}
        h${-(w)}Z
      `);

	graphArea
		.selectAll("bar")
		.data(data)
		.enter().append("path")
		.style("fill", "#90c706")
		.attr("d", item => `
        M${x(item.name) + 5},${y(item.value_2) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${w - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - margin.top - margin.bottom + 2 - y(item.value_2) - ry}
        h${-(w)}Z
      `);
}
