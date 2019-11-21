//vendors
import $ from "jquery";

import 'bootstrap';
//pages

import "./pages/home/home";
//custom components
import CounterInput from "./components/number-input/number-input";
import FileUpload from "./components/file-upload/file-upload";
import RangeDatepicker from "./components/datepicker/datepicker";
import FileInput from "./components/file-input/file-input";
import Rating from "./components/rating/rating";
import multistepForm from "./components/multistep-form/multistep-form";

//charts
import donutChart from "./components/charts/donut/donut";
import lineChart from "./components/charts/line/line";
import barChart from "./components/charts/bar/bar";
//data
import barData from "./assets/data/bar-data"
import lineData from "./assets/data/line-data"
import donutData from "./assets/data/donut-data"

window.$ = window.jQuery = $;

//init datepicker
let rangeDatepickers = document.querySelectorAll('.input-daterange input');
rangeDatepickers.forEach((el) => {
	new RangeDatepicker(el);
});

//init file upload
let fileUploads = document.querySelectorAll('.file-loader input[type="file"]');
fileUploads.forEach((el) => {
	new FileUpload(el);
});

//init file input
let fileInputs = document.querySelectorAll('.input-group input[type="file"]');
fileInputs.forEach((el) => {
	new FileInput(el);
});

//init counter inputs
let counterInputs = document.querySelectorAll(".input-number .form-control");
counterInputs.forEach((el) => {
	new CounterInput(el);
});

//init rating
let ratings = document.querySelectorAll(".rating");
ratings.forEach((el) => {
	new Rating(el);
});

//init tooltips
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
});

//init multistep form
let multistepForms = document.querySelectorAll(".multistep-form");
multistepForms.forEach((el) => {
	new multistepForm(el);
});

//init chart(donut)
let donutCharts = document.querySelectorAll(".chart-donut .chart");
donutCharts.forEach((el) => {
	new donutChart(el, donutData);
});

//init chart(line)
let colors = ['#063dc7', '#90c706'];
let lineCharts = document.querySelectorAll(".chart-line .chart");
lineCharts.forEach((el, i) => {
	new lineChart(el, lineData, colors[i]);
});

//init chart(bar)
let barCharts = document.querySelectorAll(".chart-bar .chart");
barCharts.forEach((el) => {
	new barChart(el, barData);
});


//charts (responsive)
function chartSizing() {
	let svgs = document.querySelectorAll('.chart svg');

	svgs.forEach((el) => {
		// console.log(el, el.getAttribute('viewBox'), '0 0 ' + el.getBoundingClientRect().width + ' ' + el.getBoundingClientRect().height);
		let texts = el.querySelectorAll('.xAxis .tick text, .yAxis .tick text, .xAxisTitle');
		let xTexts = el.querySelectorAll('.xAxis .tick text:not(.xAxisIcon)');
		let factor = 960 / el.getBoundingClientRect().width;
		let fontSize = 'font-size:' + (factor * 12) + 'px;';
		let isMobileView = ((window.innerWidth < 1470 && window.innerWidth > 991) || window.innerWidth < 768);

		texts.forEach((_el) => {
			_el.setAttribute('style', fontSize);
		});

		xTexts.forEach((_el) => {
			_el.setAttribute('style', fontSize);
		});

		let barChartTexts = el.querySelectorAll('.chart-bar .xAxis .tick text:not(.xAxisIcon)');
		let barChartIconText = el.querySelectorAll('.chart-bar .xAxis .tick .xAxisIcon');
		let barChartIconCircle = el.querySelectorAll('.chart-bar .xAxis .tick circle');

		if (isMobileView) {
			barChartTexts.forEach((_el) => {
				_el.setAttribute('visibility', 'hidden')
			});
			barChartIconText.forEach((_el) => {
				_el.setAttribute('style', 'font-size:' + (factor * 20) + 'px;transform: translate(0, 10px);')
			});
			barChartIconCircle.forEach((_el) => {
				_el.setAttribute('style', 'transform: translate(0, -6px);r: 25;')
			});
		} else {
			barChartTexts.forEach((_el) => {
				_el.setAttribute('visibility', 'visible')
			});
			barChartIconText.forEach((_el) => {
				_el.setAttribute('style', fontSize)
			});
			barChartIconCircle.forEach((_el) => {
				_el.setAttribute('style', '')
			});
		}

		let lineChartTexts = el.querySelectorAll('.chart-line .xAxis .tick text');
		const weekDay = ["Days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

		if (isMobileView) {
			lineChartTexts.forEach((_el, i) => {
				_el.innerHTML = weekDay[i].substring(0, 3);
			});
		}else{
			lineChartTexts.forEach((_el, i) => {
				_el.innerHTML = weekDay[i];
			});
		}

		// el.attr('viewBox', '0 0 ' + el.innerWidth + ' ' + el.innerHeight);
	})

}

$(document).ready(function () {
	chartSizing();

	window.addEventListener('resize', chartSizing);
});

