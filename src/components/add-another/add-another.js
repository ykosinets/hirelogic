export default function (element) {
	if (!element) return;

	this.element = element;
	this.template = document.querySelector('#' + element.dataset.target);

	if (!this.template) return;

	this.parent = this.element.parentNode;

	this.createTemplate = () => {
		let template = document.querySelector('#' + element.dataset.target);
		template = template.cloneNode(true);
		template.removeAttribute('id');
		template.querySelectorAll('input').forEach(el => {
			el.value = '';
		});
		return template;
	};

	this.element.addEventListener('click', () => {
		this.parent.parentNode.insertBefore(this.createTemplate(), this.parent);
	})
}
