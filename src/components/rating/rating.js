export default function Rating(element) {
	if (!element) return;

	let isActive = false;
	let ratingInput = element.querySelector('input');
	this.stars = element.querySelectorAll('.star');

	this.stars.forEach(el => {
		el.addEventListener('click', (e) => {
			isActive = el.classList.contains('active');
			let li = e.target.parentElement;
			const index = [...li.parentElement.children].indexOf(li);
			this.stars.forEach(_el => _el.classList.remove('active'));

			if (isActive || index === -1) {
				el.classList.remove('active');
				ratingInput.value = 0;
			} else {
				el.classList.add('active');
				ratingInput.value = Math.abs(5 - index);
			}
		})
	})
}
