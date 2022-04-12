//================================================================================
const darkThemeMedia = matchMedia('(prefers-color-scheme: dark)');

const theme = document.querySelector('.theme');
const themeRadios = theme.querySelectorAll('.theme__radio');

const isAuto = theme.classList.contains('theme--auto');

function setupTheme() {
	// Получаем сохраненную схему
	let theme = getSavedTheme();

	// Если схемы нет, в зависимости от auto радио-кнопки, передаем нужное значение схемы
	theme === null ? isAuto ? theme = 'auto' : theme = getSystemTheme() : null

	// Настраиваем схему
	setTheme(theme);

	// Настраиваем схему при смене состояния радио-кнопки
	themeRadios.forEach(radio => {
		radio.addEventListener('change', (e) => {
			setTheme(e.target.value);
		});
	});
}

function setTheme(theme) {
	// Переключаем тему
	switchTheme(theme);
	// Если схема auto или auto кнопки нет, но схема равна пользовательской, то
	// очищаем  хранилище, иначе сохраняем новую схему
	if ((theme === 'auto') || (!isAuto && (theme === getSystemTheme()))) {
		clearTheme();
	} else {
		saveTheme(theme);
	}
}

function switchTheme(theme) {
	// Делаем активным соответствующую радио-кнопку
	document.querySelector(`.theme__radio[value=${theme}]`).checked = true;
	// Если схема auto, устанавливаем пользовательскую тему
	theme === 'auto' ? theme = getSystemTheme() : null;
	document.documentElement.setAttribute('data-theme', theme);
}

function getSavedTheme() {
	return localStorage.getItem('color-theme');
}

function getSystemTheme() {
	// true или false наличия темной пользовательской темы
	const darkTheme = darkThemeMedia.matches;
	return darkTheme ? 'dark' : 'light';
}

function saveTheme(theme) {
	localStorage.setItem('color-theme', theme);
}

function clearTheme() {
	localStorage.removeItem('color-theme');
}

setupTheme();
//================================================================================