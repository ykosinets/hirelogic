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

//init multistep form
let donutCharts = document.querySelectorAll(".chart-donut .chart");
donutCharts.forEach((el) => {
	new donutChart(el);
});



