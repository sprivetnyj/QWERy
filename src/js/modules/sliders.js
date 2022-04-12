//================================================================================
import Swiper, { Navigation, Mousewheel, Keyboard, FreeMode, Parallax } from 'swiper';

// Autoplay 
// Navigation
// Pagination
// Controller
// Scrollbar
// Mousewheel
// Keyboard
// FreeMode
// Thumbs

import { isMobile } from './functions.js';

window.addEventListener("load", () => {
	sliders();
	sliderScroll();
});

function sliders() {
	if (document.querySelector('.slider-about')) {
		new Swiper('.slider-about', {
			modules: [Navigation, Parallax],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			navigation: {
				nextEl: '.slider-about .swiper-button-next',
				prevEl: '.slider-about .swiper-button-prev',
			},
			loop: true,
			parallax: true,
			speed: 900,
		});
	}
}
function sliderScroll() {
	const wrapper = document.querySelector('.page');
	if (document.querySelector('.page')) {
		const pageSlider = new Swiper('.page', {
			modules: [Mousewheel, Keyboard, FreeMode, Parallax],
			direction: 'vertical',
			speed: 900,
			mousewheel: true,
			slidesPerView: 'auto',
			keyboard: true,
			freeMode: false,
			parallax: true,
			init: false,
			on: {
				init: function () {
					setScrollType();
					menuSlider();
				},
				slideChange: function () {
					menuSliderRemove();
					if ((pageSlider.realIndex > 0) && (pageSlider.realIndex < menuLinks.length + 1)) {
						menuLinks[pageSlider.realIndex - 1].classList.add('active');
					}
				},
				resize: function () {
					setScrollType();
				}
			}
		});
		const menuLinks = document.querySelectorAll('.menu__link');
		function menuSlider() {
			const menuLogoArray = document.querySelectorAll('.logo__content');
			const heroScroll = document.querySelector('.hero__scroll');
			if (menuLogoArray.length) {
				menuLogoArray.forEach(menuLogo => {
					menuLogo.addEventListener('click', (e) => {
						menuSliderRemove();
						pageSlider.slideTo(0, 900);
						e.preventDefault();
					});
				});
			}
			if (heroScroll) {
				heroScroll.addEventListener('click', (e) => {
					menuSliderRemove();
					pageSlider.slideTo(1, 900);
					e.preventDefault();
				})
			}
			if (menuLinks.length) {
				if (pageSlider.realIndex > 0) {
					menuLinks[pageSlider.realIndex].classList.add('active');
				}
				menuLinks.forEach((menuLink, index) => {
					menuLink.addEventListener('click', (e) => {
						menuSliderRemove();
						pageSlider.slideTo(index + 1, 900);
						menuLinks[pageSlider.realIndex - 1].classList.add('active');
						e.preventDefault();
					});
				});
			}
		}
		function menuSliderRemove() {
			const menuLinkActive = document.querySelector('.menu__link.active');
			if (menuLinkActive) {
				menuLinkActive.classList.remove('active');
			}
		}
		function setScrollType() {
			if (isMobile.any()) {
				pageSlider.params.freeMode.enabled = true;
			} else {
				if (wrapper.classList.contains('free')) {
					wrapper.classList.remove('free');
					pageSlider.params.freeMode.enabled = false;
				}
				for (let index = 0; index < pageSlider.slides.length; index++) {
					const pageSlide = pageSlider.slides[index];
					const pageSlideBody = pageSlide.querySelector('.swiper-slide__body');
					if (pageSlideBody) {
						const pageSlideBodyHeight = pageSlideBody.offsetHeight;
						if (pageSlideBodyHeight > window.innerHeight) {
							wrapper.classList.add('free');
							pageSlider.params.freeMode.enabled = true;
							break;
						}
					}
				}
			}
		}
		pageSlider.init();
	}
}
//================================================================================