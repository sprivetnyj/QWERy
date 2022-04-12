//================================================================================

// data-tabs="id,index" - для родителя всех табов
//  @id - id секции, с которой будут связаны aria-атрибуты
//  @index - индекс открытого таба
// data-tabs-titles = для родителя всех заголовков
// data-tabs-body = для родителя всего контента

// .active - для активного заголовка таба
// .hidden - для скрытого контента таба

import { focusTrap } from "../functions.js";

function tabs() {
	const tabsArray = document.querySelectorAll('[data-tabs]');
	if (tabsArray.length) {
		tabsArray.forEach(tabsInit);
		// Инициализация блоков табов
		function tabsInit(tabsBlock) {
			const tabsTitles = Array.from(tabsBlock.querySelector('[data-tabs-titles]').children);
			const tabsBody = Array.from(tabsBlock.querySelector('[data-tabs-body]').children);
			tabsInitBody(tabsBlock, tabsTitles, tabsBody);
		}
		// Инициализация элементов блока
		function tabsInitBody(tabsBlock, tabsTitles, tabsBody) {
			// Строка с 2 параметрами селектора data-tabs
			const tabsData = tabsBlock.dataset.tabs.split(',');
			tabsBlock.querySelector('[data-tabs-titles]').setAttribute('role', 'tablist');
			// Добавление атрибутов для каждого заголовка
			tabsTitles.forEach((tabsTitle, index) => {
				tabsTitle.setAttribute('id', `${tabsData[0]}-tab-${index + 1}`);
				tabsTitle.setAttribute('role', 'tab');
				tabsTitle.setAttribute('tabindex', -1);
				tabsTitle.setAttribute('aria-selected', false);
				tabsTitle.setAttribute('aria-controls', `${tabsData[0]}-cnt-${index + 1}`);
			});
			// Добавление атрибутов для каждого контента
			tabsBody.forEach((tabsItem, index) => {
				tabsItem.setAttribute('id', `${tabsData[0]}-cnt-${index + 1}`);
				tabsItem.setAttribute('role', 'tabpanel');
				tabsItem.classList.add('hidden');
				tabsItem.setAttribute('aria-labelledby', tabsTitles[index].id);
			});
			// Отображение активного таба, включая заголовок и контент
			tabsToggle(tabsTitles[tabsData[1]], tabsBody[tabsData[1]], true);
			tabsEvents(tabsBlock, tabsTitles, tabsBody);
		}
		// События элементов таба
		function tabsEvents(tabsBlock, tabsTitles, tabsBody) {
			tabsBlock.addEventListener('click', (e) => {
				// Если кликнули на заголовок таба
				if (e.target.closest('[data-tabs-titles]') && (e.target.getAttribute('data-tabs-titles') === null)) {
					const newTitle = e.target;
					const oldTitle = tabsBlock.querySelector('.active');
					// Если кликнули не на текущий заголовок
					if (newTitle !== oldTitle) {
						tabsChange(newTitle, oldTitle, tabsBody);
					}
				}
			});
			tabsBlock.addEventListener('keydown', (e) => {
				// Если фокус на одном из заголовков
				if (document.activeElement.closest('[data-tabs-titles]')) {
					if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
						// Замыкаем перемещение
						focusTrap(e, tabsTitles, e.key === 'ArrowLeft', false);
						const newTitle = document.activeElement;
						const oldTitle = e.target;
						// Если кликнули не на текущий заголовок
						if (newTitle !== oldTitle) {
							tabsChange(newTitle, oldTitle, tabsBody);
						}
					} else if (e.key === 'End') {
						const newTitle = tabsTitles[tabsTitles.length - 1];
						const oldTitle = e.target;
						// Если кликнули не на текущий заголовок
						if (newTitle !== oldTitle) {
							newTitle.focus();
							tabsChange(newTitle, oldTitle, tabsBody);
						}
					} else if (e.key === 'Home') {
						const newTitle = tabsTitles[0];
						const oldTitle = e.target;
						// Если кликнули не на текущий заголовок
						if (newTitle !== oldTitle) {
							tabsTitles[0].focus();
							tabsChange(newTitle, oldTitle, tabsBody);
						}
					}
				}
			});
		}
		// Поиск контента старого и нового заголовка
		function tabsChange(newTitle, oldTitle, tabsBody) {
			const newBody = tabsBody.find(el => el.getAttribute('id') === newTitle.getAttribute('aria-controls'));
			const oldBody = tabsBody.find(el => !el.classList.contains('hidden'));
			tabsToggle(newTitle, newBody, true);
			tabsToggle(oldTitle, oldBody, false);
		}
		// Переключение стилей элементов таба
		function tabsToggle(tabsTitle, tabsBody, selected) {
			tabsTitle.classList.toggle('active');
			tabsTitle.setAttribute('aria-selected', selected);
			tabsBody.classList.toggle('hidden');
			selected ? tabsTitle.removeAttribute('tabindex') : tabsTitle.setAttribute('tabindex', -1);
		}
	}
}

tabs();
//================================================================================