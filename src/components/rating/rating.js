export default function Rating(element) {
	if (!element) return;

	this.stars = element.querySelectorAll('.star')

	this.stars.forEach(el => {
		el.addEventListener('click', () => {
			this.stars.forEach(_el => _el.classList.remove('active'));
			el.classList.add('active')
		})
	})
}
