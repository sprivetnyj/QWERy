//================================================================================

// data-validate - для поля формы
// data-error="text" = вывод блока ошибки под полем
//  @text - текст ошибки

// .focus - появляется при фокусировке на поле
// .error - появляется при ошибки на поле

import { popup } from "../components/popup.js";
import { modules } from "../modules.js";

export function fieldsInit() {
	// Получаем все поля с placeholder
	const formFields = document.querySelectorAll('input[placeholder],textarea[placeholder]');
	if (formFields.length) {
		// Создаем для каждого свой data-placeholder
		formFields.forEach(formField => {
			formField.dataset.placeholder = formField.placeholder;
		});
	}
	// Слушаем весь body на вхождение фокуса
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') && (targetElement.type !== 'tel')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = '';
			}
			formValidate.removeError(targetElement);
		}
	});
	// Слушаем весь body на выход фокуса
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder;
			}
			if (targetElement.hasAttribute('data-validate')) {
				formValidate.validateInput(targetElement);
			}
		}
	});
}
export let formValidate = {
	getErrors(form) {
		let error = 0;
		const formItemsRequired = form.querySelectorAll('[data-validate]');
		if (formItemsRequired.length) {
			formItemsRequired.forEach(formItemRequired => {
				if (formItemRequired.offsetParent !== null && !formItemRequired.disabled) {
					error += this.validateInput(formItemRequired);
				}
			});
		}
		return error;
	},
	validateInput(formItem) {
		let error = 0;
		if (formItem.type === 'email') {
			if (this.emailTest(formItem)) {
				this.addError(formItem);
				error++;
			} else {
				this.removeError(formItem);
			}
		} else if (formItem.type === 'tel') {
			let numbers = formItem.value;
			// Отслеживаем нужное кол-во введенных цифр
			numbers = numbers.replace(/[^0-9]/g, '');
			if (numbers.length < 11) {
				this.addError(formItem);
				error++;
			} else {
				this.removeError(formItem);
			}
		} else if (formItem.type === 'checkbox' && !formItem.checked) {
			this.addError(formItem);
			error++;
		} else {
			// Проверка на пустую строку
			if (formItem.value.trim() === '') {
				this.addError(formItem);
				error++;
			} else {
				this.removeError(formItem);
			}
		}
		return error;
	},
	addError(formItem) {
		formItem.classList.add('error');
		const inputError = formItem.parentElement.querySelector('.form__error');
		if (inputError) { formItem.parentElement.removeChild(inputError); }
		if (formItem.dataset.error) {
			formItem.parentElement.insertAdjacentHTML(
				'beforeend',
				`<div class = "form__error">${formItem.dataset.error}</div>`
			)
		}
	},
	formClean(form) {
		form.reset();
		const inputs = form.querySelectorAll('input,textarea');
		inputs.forEach(input => input.classList.remove('focus'));
	},
	removeError(formItem) {
		formItem.classList.remove('error');
		if (formItem.parentElement.querySelector('.form__error')) {
			formItem.parentElement.removeChild(formItem.parentElement.querySelector('.form__error'));
		}
	},
	// Стандартная проверка на валидный e-mail
	emailTest(formItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formItem.value);
	}
}
export function submit() {
	const forms = document.forms;
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', (e) => {
				const form = e.target;
				submitAction(form, e);
			});
		}
	}
	async function submitAction(form, e) {
		// Id попапа, появляющегося после отправки формы
		const popupId = form.dataset.form;
		const error = formValidate.getErrors(form);
		if (error === 0) {
			// Предотвращаем отправку формы в хэше
			e.preventDefault();
			// Запускаем попап по ID через модули
			modules.popup = popup(popupId);
			// Очищаем форму
			formValidate.formClean(form);
		} else {
			// Предотвращаем отправку формы в хэше
			e.preventDefault();
		}
	}
}
//================================================================================