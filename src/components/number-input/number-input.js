export default function CounterInput(element) {
	if(!element) return;
	this.input = element;

	this.increment = () => {
		let val = getVal();
		let max = getMax();
		let step = getStep();
		if (val === max) return;
		this.input.value = val + step;
	};

	this.decrement = () => {
		let val = getVal();
		let min = getMin();
		let step = getStep();
		if (val === min) return;
		this.input.value = val - step;
	};

	this.getParent = (el, sel) => {
		while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel))) ;
		return el;
	};

	this.reset = () => {
		let val = getVal();
		let min = getMin();
		let max = getMax();
		if (val < min || (val !== 0 && !val)) this.input.value = min;
		if (val > max) this.input.value = max;
	};

	const getMax = () => {
		return parseInt(this.input.getAttribute('max'));
	};

	const getMin = () => {
		return parseInt(this.input.getAttribute('min'));
	};

	const getVal = () => {
		return parseInt(this.input.value);
	};

	const getStep = () => {
		return parseInt(this.input.getAttribute('step')) || 1;
	};


	this.init = () => {
		const wrapper = this.getParent(this.input, '.input-number');
		const plusButton = wrapper.querySelector('.btn-plus');
		const minusButton = wrapper.querySelector('.btn-minus');

		plusButton.addEventListener('click', this.increment);
		minusButton.addEventListener('click', this.decrement);

		this.input.addEventListener('blur', this.reset);
	};

	this.init();
}
