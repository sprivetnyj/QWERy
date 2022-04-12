//================================================================================

// Проверка поддержки WebP
export function isWebp() {
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

// Проерка мобильного браузера
export let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

// Исправление наложения нижней панели на смартфонах
export function fullVHfix() {
	const fullScreens = document.querySelectorAll('[data-fullscreen]');
	if (fullScreens.length && isMobile.any()) {
		window.addEventListener('resize', fixHeight);
		document.documentElement.classList.add('touch');
		function fixHeight() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
		fixHeight();
	}
}

// Замыкание фокуса 
export function focusTrap(e, el, key, focus = true, target = false) {
	// focusTrap(e,el,key,focus,target)
	//  @e - event
	//  @el - массив элементов для замыкания
	//  @key - отрицательное сочетание клавиш
	//  @focus - найти ли все дочерние фокус элементы
	//   {true} - найти
	//   {false} - не искать 
	//  @target - дополнительный элемент в фокус массив
	//   {true} - добавлять
	//   {false} - не обавлять
	// Все возможные фокус элементы
	const focusElements = ['a[href]:not([tabindex^="-"])', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden]):not([tabindex^="-"])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'area[href]', 'iframe', 'object', 'embed', '[contenteditable]'];
	const focusElement = !focus ? Array.from(el) : Array.from(el.querySelectorAll(focusElements));
	if (target) { focusElement.push(target); }
	const index = focusElement.indexOf(e.target);
	const direction = key ? -1 : 1;
	const length = focusElement.length;
	const newIndex = (index + length + direction) % length;
	focusElement[newIndex].focus();
	e.preventDefault();
}

// Начисляемый счетчик для цифр
export function counter(counterItem) {
	let start = null;
	const duration = 2000;
	const value = counterItem.getAttribute('data-counter');
	window.requestAnimationFrame(counterAnim);
	function counterAnim(timestapm) {
		if (!start) start = timestapm;
		const progress = Math.round(timestapm - start);
		counterItem.textContent = Math.round(easeInOutCubic(progress, 0, value, duration));
		if (progress < duration) window.requestAnimationFrame(counterAnim);
	}
	function easeInOutCubic(t, b, c, d) {
		return c * t / d + b;
	};
}

// Блокировка скролла 
export function scrollLockToggle(boolean) {
	const lockPaddingElements = document.querySelectorAll('[data-lp]');
	let paddingOffset = window.innerWidth - document.querySelector('.wrapper').offsetWidth;
	// Возникает баг, в котором paddingOffset равен -1, что не добавляется в style
	paddingOffset < 0 ? paddingOffset = 0 : null;
	lockPaddingElements.forEach(el => { el.style.paddingRight = `${paddingOffset}px`; });
	document.documentElement.classList.toggle("lock");
}

// Блокировка скролла 
export function headerScroll() {
	// data-header-scroll="show,point" - для header
	//  @show - скрывать ли шапку при скроле или нет
	//   {true} - скрывать
	//   {false} - не скрывать
	//  @point - со скольки пикселей прокрутки начинать

	// .scroll - при сколле страницы
	// .show - при обратном от header скролле

	const header = document.querySelector('header.header[data-header-scroll]');
	if (header) {
		const headerData = header.dataset.headerScroll.split(',');
		const headerShow = headerData[0] === 'true';
		const startPoint = headerData[1];
		let scrollDirection = 0;
		document.addEventListener("scroll", () => {
			const scrollTop = window.scrollY;
			if (scrollTop >= startPoint) {
				!header.classList.contains('scroll') ? header.classList.add('scroll') : null;
				if (headerShow) {
					if (scrollTop > scrollDirection) {
						header.classList.contains('show') ? header.classList.remove('show') : null;
					} else {
						!header.classList.contains('show') ? header.classList.add('show') : null;
					}
				}
			} else {
				header.classList.contains('scroll') ? header.classList.remove('scroll') : null;
				if (headerShow) {
					header.classList.contains('show') ? header.classList.remove('show') : null;
				}
			}
			scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
		});
	}
}

// Скрыть объект
export let slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('slide')) {
		target.classList.add('slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('slide');
			document.dispatchEvent(new CustomEvent("slideUpDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}

// Расскрыть объект
export let slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('slide')) {
		target.classList.add('slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('slide');
			document.dispatchEvent(new CustomEvent("slideDownDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}

// Выбрать состояние скрытия или раскрытия объекта
export let slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return slideDown(target, duration);
	} else {
		return slideUp(target, duration);
	}
}
//================================================================================