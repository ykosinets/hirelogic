export default function fileInput(element) {
	if(!element) return;

	this.input = element;
	this.getParent = (el, sel) => {
		while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel))) ;
		return el;
	};

	this.input.onchange = () => {
		console.log(this.getParent(this.input, '.input-group').querySelector('input[type="text"]'));
		let textInput = this.getParent(this.input, '.input-group').querySelector('input[type="text"]');
		textInput.value = this.input.value.replace("C:\\fakepath\\", "");
	};
}
