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
new RangeDatepicker();

//init file upload
new FileUpload();

//init counter inputs
let counterInputs = document.querySelectorAll(".input-number .form-control");
counterInputs.forEach((el) => {
	new CounterInput(el);
});



