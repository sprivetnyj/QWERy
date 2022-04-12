//================================================================================
import { modules } from "../modules.js";

// Подключение модуля
import "inputmask/dist/inputmask.min.js";

const inputMasks = document.querySelectorAll('input');
if (inputMasks.length) {
	inputMasks.forEach(input => {
		if (input.type === 'tel') {
			// Приводим placeholder к виду 7(999)-999-99-99)
			const mask = input.placeholder.replaceAll('_', '9');
			modules.inputmask = Inputmask({ "mask": mask, showMaskOnHover: false }).mask(input);
		}
	});
}
//================================================================================