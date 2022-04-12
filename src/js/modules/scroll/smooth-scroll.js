//================================================================================

// data-smooth="offset" = для ссылки
//  @offset - дополнительный отступ (опционально)

// Всевозможные математические функции
// http://gizma.com/easing/

function smoothScroll() {
	const smoothArray = document.querySelectorAll('[data-smooth]');
	if (smoothArray.length) {
		smoothArray.forEach(smoothScrollInit);
		function smoothScrollInit(smoothItem) {
			// Дополнительный отступ (С учетом высоты шапки)
			const scrollOffset = smoothItem.getAttribute('data-smooth');
			smoothItem.addEventListener('click', smoothScrollAnim);

			function smoothScrollAnim(e) {
				const targetId = e.currentTarget.getAttribute('href');
				// Расстояние цели относительно верхней части страницы
				const targetPosition = document.querySelector(targetId).offsetTop;
				// Если элементы фиксированны, значит их Y === Y скролла страницы
				const startPosition = window.scrollY;
				// Расстояние между 2 элементами с учетом опционального отступа
				const distance = (targetPosition - scrollOffset) - startPosition;
				const duration = 1000;
				let start = null;

				window.requestAnimationFrame(scrollStep);

				function scrollStep(timestapm) {
					if (!start) start = timestapm;
					const progress = timestapm - start;
					window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
					if (progress < duration) window.requestAnimationFrame(scrollStep);
				}
				function easeInOutCubic(t, b, c, d) {
					t /= d / 2;
					if (t < 1) return c / 2 * t * t * t + b;
					t -= 2;
					return c / 2 * (t * t * t + 2) + b;
				};
			}
			// Кнопка "вверх"
			// if (smoothItem.classList.contains('page__up')) {
			// 	window.addEventListener('scroll', () => {
			// 		window.scrollY > 400 ? smoothItem.classList.add('active') :
			// 			smoothItem.classList.remove('active');
			// 	})
			// }
		}
	}
}
smoothScroll();

//================================================================================