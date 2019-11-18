export default function multistepForm(element) {
	if (!element) return;


	let currentTab = 0;
	const prevBtn = element.querySelector('.btn-prev');
	const nextBtn = element.querySelector('.btn-next');
	const inputs = element.querySelectorAll('input');


	this.showTab = (n) => {
		// This function will display the specified tab of the form ...
		let tabs = element.querySelectorAll(".tab");
		tabs[n].style.display = "block";
		// ... and fix the Previous/Next buttons:
		// ... and run a function that displays the correct step indicator:
		this.fixStepIndicator(n)
	};

	this.nextPrev = (n) => {
		// This function will figure out which tab to display
		let step = element.querySelectorAll(".tab");
		// Exit the function if any field in the current tab is invalid:
		if (n === 1 && !this.validateForm()) return false;
		// Hide the current tab:
		step[currentTab].style.display = "none";
		// Increase or decrease the current tab by 1:
		currentTab = currentTab + n;
		// if you have reached the end of the form... :
		if (currentTab >= step.length) {
			//...the form gets submitted:
			element.submit();
			return false;
		}
		// Otherwise, display the correct tab:
		this.showTab(currentTab);
	};

	this.validateForm = () => {
		// This function deals with validation of the form fields
		let tabs, currentTabInputs, i, valid = true;
		tabs = element.querySelectorAll(".tab");
		currentTabInputs = tabs[currentTab].querySelectorAll("input, textarea");
		// A loop that checks every input field in the current tab:
		for (i = 0; i < currentTabInputs.length; i++) {
			// If a field is empty...
			if (currentTabInputs[i].value === "") {
				// add an "is-invalid" class to the field:
				currentTabInputs[i].classList.add("is-invalid");
				// and set the current valid status to false:
				valid = false;
			}
		}
		// If the valid status is true, mark the step as finished and valid:
		if (valid) {
			element.querySelectorAll(".step")[currentTab].classList.add("finish");
		}
		return valid; // return the valid status
	};

	this.fixStepIndicator = (n) => {
		// This function removes the "active" class of all steps...
		let i, steps = element.querySelectorAll(".step");
		if (!steps.length) {
			let l = element.querySelectorAll(".tab").length;
			let html = '';
			for (let j = 0; j < l; j++) {
				html += '<span class="step"></span>';
			}
			element.querySelector(".step-indicator").innerHTML = html;
			steps = element.querySelectorAll(".step");
		}
		for (i = 0; i < steps.length; i++) {
			steps[i].classList.remove("active")
		}
		//... and adds the "active" class to the current step:
		steps[n].classList.add("active");
	};

	this.showTab(currentTab);

	prevBtn.addEventListener('click', () => {
		this.nextPrev(-1)
	});
	nextBtn.addEventListener('click', () => {
		this.nextPrev(1)
	});
	inputs.forEach((el) => {
		el.addEventListener('input', function () {
			this.classList.remove('is-invalid');
		});
	});
}
