//================================================================================

// data-spollers="id,accordion,index" - для родителя всех спойлеров
//  @id - id секции, с которой будут связаны aria-атрибуты
//  @accordion - является ли блок аккордеоном 
//   {true} - является
//   {false} - не является
//  @index - управление поведением спойлеров
//   {0...(maxCount)} - индекс открытого спойлера 
//   {all} - все спойлеры открыты !(accordion - false)!
//   {null} - все спойлеры закрыты !(accordion - false)!
// data-spoller = для кнопки спойдера, перед его контентом

// .active - для активного спойлера

import { slideUp, slideDown, slideToggle, focusTrap } from "../functions.js";

function spoilers() {
	const spoilersArray = document.querySelectorAll('[data-spoilers]');
	if (spoilersArray.length) {
		spoilersArray.forEach(spoilersInit);
		// Инициализация блоков спойлеров
		function spoilersInit(spoilersBlock) {
			const spoilersContents = [];
			const spoilersButtons = spoilersBlock.querySelectorAll('[data-spoiler]');
			// Добавление в массив контента, идущего за каждой кнопкой
			spoilersButtons.forEach(spoilersButton => {
				spoilersContents.push(spoilersButton.nextElementSibling);
			})
			spoilersInitBody(spoilersBlock, spoilersButtons, spoilersContents);
		}
		// Инициализация элементов блока
		function spoilersInitBody(spoilersBlock, spoilersButtons, spoilersContents) {
			// Строка с 3 параметрами селектора data-spoilers
			const spoilersData = spoilersBlock.dataset.spoilers.split(',');
			// Добавление атрибутов для каждой кнопки
			spoilersButtons.forEach((spoilersButton, index) => {
				spoilersButton.firstElementChild.setAttribute('id', `${spoilersData[0]}-btn-${index + 1}`);
				spoilersButton.firstElementChild.setAttribute('aria-expanded', false);
				spoilersButton.firstElementChild.setAttribute('aria-controls', `${spoilersData[0]}-cnt-${index + 1}`);
				// Если указан номер активной кнопки (0,1...)
				// Или указан параметр открытия всех кнопок (all)
				if (spoilersData[2] == index || spoilersData[2] == 'all') {
					// Стили открытой кнопки
					spoilersToggle(spoilersButton.firstElementChild, true, true);
				}
			});
			// Добавление атрибутов для каждого контент-блока
			spoilersContents.forEach((spoilersContent, index) => {
				spoilersContent.setAttribute('id', `${spoilersData[0]}-cnt-${index + 1}`);
				spoilersContent.setAttribute('role', 'region');
				spoilersContent.setAttribute('aria-labeledby', spoilersButtons[index].id);
				// Если контент находится по неактивной кнопкой
				// Или указан параметр закрытия всех кнопок (null)
				if (spoilersData[2] != index && spoilersData[2] != 'all') {
					slideUp(spoilersContent, 0);
				}
			});
			spoilersEvents(spoilersBlock, spoilersButtons, spoilersData);
		}
		// События элементов спойлера
		function spoilersEvents(spoilersBlock, spoilersButtons, spoilersData) {
			spoilersBlock.addEventListener('click', (e) => {
				// Если кликнули на спойлер
				if (e.target.closest('[data-spoiler]')) {
					const el = e.target.closest('[data-spoiler]').firstElementChild;
					// Если аккордеон
					if (spoilersData[1] === 'true') {
						const activebutton = spoilersBlock.querySelector('.active');
						if (!spoilersBlock.querySelectorAll('.slide').length) {
							if (el !== activebutton) {
								spoilersSetButtons(el, activebutton, true);
							}
						}
					} else {
						// Пока блок контента не прекратит анимаицю
						if (!el.parentElement.nextElementSibling.classList.contains('slide')) {
							spoilersSetButtons(el, null, false);
						}
					}
				}
			});
			spoilersBlock.addEventListener('keydown', (e) => {
				// Массив не из заголовоков, а дочерних кнопок
				const spoilersChilren = Array.from(spoilersButtons).map(spoilersButton => spoilersButton.firstElementChild);
				// Замкнутое перемещение с помощью ArrowUp и ArrowDown по самим кнопкам, а не всем фокус элементам
				if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { focusTrap(e, spoilersChilren, e.key === 'ArrowUp', false); }
				// Фокус на первый спойлер
				else if (e.key === 'Home') { spoilersChilren[0].focus(); }
				// Фокус на последний спойлер
				else if (e.key === 'End') { spoilersChilren[spoilersChilren.length - 1].focus(); }
			});
		}
		// Проверка типа спойлеров
		function spoilersSetButtons(newButton, oldButton, accordion) {
			// Если аккордеон
			if (accordion) {
				// Открываем новый спойлер 
				spoilersToggle(newButton, true, true);
				slideDown(newButton.parentElement.nextElementSibling, 300);
				// Закрываем старый спойлер 
				spoilersToggle(oldButton, false, true);
				slideUp(oldButton.parentElement.nextElementSibling, 300);
			} else {
				// В зависимости от состояния спойлера
				const expanded = newButton.classList.contains('active');
				spoilersToggle(newButton, !expanded, false);
				slideToggle(newButton.parentElement.nextElementSibling, 300);
			}
		}
		// Переключение стилей кнопки спойлера
		function spoilersToggle(spoilersButton, expanded, accordion) {
			spoilersButton.classList.toggle('active');
			spoilersButton.setAttribute('aria-expanded', expanded);
			// Если аккордеон
			if (accordion) {
				// Aria-disabled для открытой кнопки
				expanded ? spoilersButton.setAttribute('aria-disabled', true) :
					spoilersButton.removeAttribute('aria-disabled');
			}
		}
	}
}
spoilers();
//================================================================================