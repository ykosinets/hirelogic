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
import spiderChart from "./components/charts/spider/spider";
//data
import barData from "./assets/data/bar-data"
import lineData from "./assets/data/line-data"
import donutData from "./assets/data/donut-data"
import spiderData from "./assets/data/spider-data"

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

//init chart(spider)
let spiderCharts = document.querySelectorAll(".chart-spider .chart");
spiderCharts.forEach((el) => {
	new spiderChart(el, spiderData);
});



