//================================================================================

// data-popup="id" - для попапа
//  @id - id секции
// data-popup-close - закрывающий попап элемент
// data-popup-open="id" - кнопка открытия попапа
//  @id - id открывабщего попапа

// .popup--open - стиль открытого попапа
// ! Все попапы, кроме попапа после отправки формы, стоит добавлять в modules.js !

import { focusTrap, scrollLockToggle } from "../functions.js";

export function popup(formId = false) {
	// Если попапы не для форм
	if (!formId) {
		const popupOpenButtons = document.querySelectorAll('[data-popup-open]');
		if (popupOpenButtons.length) {
			popupOpenButtons.forEach(popupInit);
		}
	} else {
		const popupForm = document.querySelector(`[data-form="${formId}"]`);
		const popupSubmit = popupForm.querySelector('button[type="submit"]');
		popupInit(popupSubmit);
	}
	function popupInit(popupOpen) {
		// Получаем ID открываемого попапа
		let popupId = popupOpen.dataset.popupOpen;
		// Если попап для формы
		if (formId) { popupId = formId; }
		// Находим нужный попап по ID
		const popup = document.querySelector(`[data-popup="${popupId}"]`);
		// Если он есть
		if (popup) {
			// При наличии > 1 кнопки закрытия
			const popupClose = Array.from(popup.querySelectorAll('[data-popup-close]'));
			const popupWrapper = popup.firstElementChild;
			// Если попап для формы, сразу запускаем его появление
			formId ? popupStyles(popupClose[0]) : popupOpen.addEventListener('click', () => { popupStyles(popupClose[0]); });
			function popupStyles(popupElement) {
				// popupElement - фокусируемый элемент
				scrollLockToggle();
				popup.classList.toggle('popup--open');
				popupElement.focus();
				// В зависимости от элемента либо создаем события, либо удаляем их
				if (popupElement === popupOpen) {
					window.removeEventListener('keydown', popupKeyboard);
					popup.removeEventListener('click', popupCloseEvent);
				} else {
					window.addEventListener('keydown', popupKeyboard);
					popup.addEventListener('click', popupCloseEvent);
				}
			}
			function popupCloseEvent(e) {
				// Если кликнули вне попапа или на любую кнопку закрытия
				if (popupClose.includes(e.target) || e.target === popupWrapper) {
					popupStyles(popupOpen);
				}
			}
			function popupKeyboard(e) {
				if (e.key === 'Escape') { popupStyles(popupOpen); }
				// Tab (вперед) или Shift Tab (назад)
				if (e.key === 'Tab' || (e.shiftKey && e.key === 'Tab')) {
					focusTrap(e, popupWrapper, e.shiftKey && e.key === 'Tab');
				}
			}
		}
	}
}
//================================================================================