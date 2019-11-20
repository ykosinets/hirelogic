var RadarChart = {
	draw: function (id, d, options) {
		var cfg = {
			radius: 5,
			w: 600,
			h: 600,
			factor: 1,
			factorLegend: 1,
			levels: 3,
			maxValue: 0,
			radians: 2 * Math.PI,
			opacityArea: 1,
			ToRight: 5,
			TranslateX: 100,
			TranslateY: 100,
			ExtraWidthX: 0,
			ExtraWidthY: 0,
			color: d3.scaleOrdinal().range(["#063dc7", "#90c706"])
		};

		if ('undefined' !== typeof options) {
			for (var i in options) {
				if ('undefined' !== typeof options[i]) {
					cfg[i] = options[i];
				}
			}
		}

		cfg.maxValue = 100;

		var dataValues = [];
		var allAxis = (d[0].map(function (i, j) {
			return i.area
		}));
		var total = allAxis.length;
		var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
		var Format = d3.format('%');
		var tooltip = d3.select("body").append("div").attr("class", "toolTip");
		var series = 0;
		d3.select(id).select("svg").remove();

		var svg = d3.select(id)
			.append("svg");

		var g = svg
			.attr("width", cfg.w + cfg.ExtraWidthX)
			.attr("height", cfg.h + cfg.ExtraWidthY)
			.append("g")
			.attr("transform", "translate(" + ((cfg.w + cfg.ExtraWidthX)/2) + "," + (cfg.TranslateY + cfg.ExtraWidthY)/2 + ")")

		var axisWrapper = g
			.append("g")
			.attr("class", "axis-wrapper");

		var axisSeparators = axisWrapper
			.append("g")
			.attr("class", "axis-separation-lines");

		var axisDirections = axisWrapper
			.append("g")
			.attr("class", "axis-direction-lines");

		var areasWrapper = g
			.append("g")
			.attr("class", "areas-wrapper");

		var circlesWrapper = g
			.append("g")
			.attr("class", "circles-wrapper");

		svg
			.append("defs");


		// Circular axis
		for (var j = 0; j < cfg.levels; j++) {
			var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
			axisSeparators.selectAll(".levels")
				.data(allAxis)
				.enter()
				.append("svg:line")
				.attr("x1", function (d, i) {
					return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
				})
				.attr("y1", function (d, i) {
					return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
				})
				.attr("x2", function (d, i) {
					return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total));
				})
				.attr("y2", function (d, i) {
					return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total));
				})
				.attr("class", "line")
				.attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
		}


		var axis = axisDirections.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

		axis.append("line")
			.attr("x1", cfg.w / 2)
			.attr("y1", cfg.h / 2)
			.attr("x2", function (d, i) {
				return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
			})
			.attr("y2", function (d, i) {
				return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
			})
			.attr("class", "line")


		// labels
		axis.append("text")
			.attr("class", "legend")
			.text(function (d) {
				return d
			})
			.attr("text-anchor", "middle")
			.attr("dy", "1.5em")
			.attr("transform", function (d, i) {
				return "translate(0, -10)"
			})
			.attr("x", function (d, i) {
				return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total);
			})
			.attr("y", function (d, i) {
				return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total);
			});

		// labels info
		axis.append("rect")
			.style("width", "60px")
			.style("height", "30px")
			.style("fill", "f00")
			.attr("class", "legend-info")
			.attr("x", function (d, i) {
				return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total);
			})
			.attr("y", function (d, i) {
				return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total);
			});

		g.selectAll('.circles-wrapper ').each(function(){

		});

		axis.append("circle")
			.attr('r', 12)
			.style("fill", "url(#avatar-" + series + ")")
			.attr("class", "legend-info")
			.attr("cx", function (d, i) {
				return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total);
			})
			.attr("cy", function (d, i) {
				return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total);
			});


		// gradients and polygons
		d.forEach(function (y, x) {
			dataValues = [];
			g.selectAll(".nodes")
				.data(y, function (j, i) {
					dataValues.push([
						cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
						cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
					]);
				});
			dataValues.push(dataValues[0]);


			let gradientId = "area-gradient-" + series;
			d3.select('defs')
				.append("radialGradient")
				.attr("r", Math.max(cfg.h/2, cfg.w/2))
				.attr("fx", cfg.h/2)
				.attr("fy", cfg.w/2)
				.attr("cx", cfg.h/2)
				.attr("cy", cfg.w/2)
				.attr("id", gradientId)
				.attr("gradientUnits", "userSpaceOnUse")
				.attr("x1", 0).attr("y1", 0)
				.attr("x2", cfg.h).attr("y2", cfg.w)
				.selectAll("stop")
				.data([
					{offset: "0%", color: cfg.color(series), opacity: .4},
					{offset: "100%", color: cfg.color(series), opacity: 1}
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


			areasWrapper.selectAll(".area")
				.data([dataValues])
				.enter()
				.append("polygon")
				.attr("class", "radar-chart-serie" + series)
				.style("stroke-width", "2px")
				.style("stroke-dasharray", "5 5")
				.style("stroke", "rgba(0,0,0,.2)")
				.attr("points", function (d) {
					var str = "";
					for (var pti = 0; pti < d.length; pti++) {
						str = str + d[pti][0] + "," + d[pti][1] + " ";
					}
					return str;
				})
				.style("fill", function (j, i) {
					return "url(#area-gradient-" + series + ")"
				})
				.style("fill-opacity", cfg.opacityArea)
				.on('mouseover', function (d) {
					var z = "polygon." + d3.select(this).attr("class");
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", 0.5);
					g.selectAll(z)
						.transition(200)
						.style("fill-opacity", 1);
				})
				.on('mouseout', function () {
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", cfg.opacityArea);
				});
			series++;
		});
		series = 0;

		// patterns
		d.forEach(function(y, x){
			var pattern = svg.select('defs')
				.append('pattern')
				.attr('x', 0)
				.attr('y', 0)
				.attr('width', 24)
				.attr('height', 24)
				.attr('id', 'avatar-' + series);

			pattern.append('image')
				.attr('x', 0)
				.attr('y', 0)
				.attr('width', 24)
				.attr('height', 24)
				.attr('href', './images/avatar-' + series + '.jpg');
			series++;
		});
		series = 0;


		// dots
		d.forEach(function (y, x) {
			circlesWrapper.selectAll(".nodes")
				.data(y).enter()
				.append("svg:circle")
				.attr("class", "radar-chart-serie" + series)
				.attr('r', cfg.radius)
				.attr("alt", function (j) {
					return Math.max(j.value, 0)
				})
				.attr("cx", function (j, i) {
					dataValues.push([
						cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
						cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
					]);
					return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
				})
				.attr("cy", function (j, i) {
					return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
				})
				.attr("data-id", function (j) {
					return j.area
				})
				.style("stroke", "#fff")
				.style("stroke-width", "2.2")
				.style("fill", cfg.color(series)).style("fill-opacity", .9)
				.on('mouseover', function (d) {
					tooltip
						.style("left", d3.event.pageX - 40 + "px")
						.style("top", d3.event.pageY - 80 + "px")
						.style("display", "inline-block")
						.html((d.area) + "<br><span>" + (d.value) + "</span>");
				})
				.on("mouseout", function (d) {
					tooltip.style("display", "none");
				});

			series++;
		});
	}
};


export default function spiderChart(element, data) {
	if (!element || !data) return;

	data = [
		[
			{area: "Intelligence Quoficient", value: 10},
			{area: "Emotional Intelligence", value: 47},
			{area: "Personality Job Fit", value: 80},
			{area: "Red Flag Scoring", value: 55},
			{area: "Organizational Culture Fit", value: 75}
		], [
			{area: "Intelligence Quoficient", value: 58},
			{area: "Emotional Intelligence", value: 91},
			{area: "Personality Job Fit", value: 56},
			{area: "Red Flag Scoring", value: 97},
			{area: "Organizational Culture Fit", value: 55}
		]
	];

	var width = 200,
		height = 200;

// Config for the Radar chart
	var config = {
		w: width,
		h: height,
		maxValue: 100,
		levels: 3,
		ExtraWidthX: 300,
		ExtraWidthY: 300
	};

	//Call function to draw the Radar chart
	RadarChart.draw(element, data, config);
}
