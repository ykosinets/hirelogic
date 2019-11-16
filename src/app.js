//vendors
import $ from "jquery";

import 'bootstrap';
//pages

import "./pages/home/home";
//custom
import CounterInput from "./components/number-input/number-input";
import FileUpload from "./components/file-upload/file-upload";
import RangeDatepicker from "./components/datepicker/datepicker";
import FileInput from "./components/file-input/file-input";

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
let fileInput = document.querySelectorAll('.input-group input[type="file"]');
fileInput.forEach((el) => {
	new FileInput(el);
});

//init counter inputs
let counterInputs = document.querySelectorAll(".input-number .form-control");
counterInputs.forEach((el) => {
	new CounterInput(el);
});



