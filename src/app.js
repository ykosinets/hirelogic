//vendors
import $ from "jquery";

import 'bootstrap';
//pages

import "./pages/home/home";
//custom
import CounterInput from "./components/number-input/number-input";
import FileUpload from "./components/file-upload/file-upload";
import RangeDatepicker from "./components/datepicker/datepicker";

window.$ = window.jQuery = $;

//init datepicker
let rangeDatepickers = document.querySelectorAll('.input-daterange input');
rangeDatepickers.forEach((el) => {
	new RangeDatepicker(el);
});

//init file upload
let fileUploads = document.querySelectorAll('input[type="file"]');
fileUploads.forEach((el) => {
	new FileUpload(el);
});

//init counter inputs
let counterInputs = document.querySelectorAll(".input-number .form-control");
counterInputs.forEach((el) => {
	new CounterInput(el);
});



