// ФУНКЦИИ =======================================================================

import * as functions from "./modules/functions.js";

// Проверка поддержки WebP
functions.isWebp();

// Исправление наложения нижней панели на смартфонах
// functions.fullVHfix();

// Скролл фиксированного header
// functions.headerScroll();

// КОМПОНЕНТЫ ====================================================================

// Бургер меню
import "./modules/components/headerMenu.js";

// Попап
// import { popup } from "./modules/components/popup.js"; popup();

// Выпадающий список
// import "./modules/components/select.js";

// Спойлеры
// import "./modules/components/spoilers.js";

// Табы
// import "./modules/components/tabs.js";

// Тултипы
// import "./modules/components/tooltip.js";

// РАБОТА С ФОРМАМИ ==============================================================

import * as form from "./modules/forms/forms.js";

// Валидация формы
form.fieldsInit();

// Отправка формы
form.submit();

// Маски для полей
// import "./modules/forms/inputmask.js";

// СКРОЛЛ ========================================================================

// Анимация при скролле
import "./modules/scroll/anim-scroll.js";

// Плавный скролл
// import "./modules/scroll/smooth-scroll.js";

// Кастомный скроллбар (data-simplebar)
// import SimpleBar from 'simplebar';

// ПРОЧЕЕ ========================================================================

// Динамический адаптив
import "./modules/dynamic-adapt.js";

// Параллакс мышью
// import "./modules/parallax-mouse.js";

// Слайдеры Swiper
import "./modules/sliders.js";

// Переключатель темы
// import "./modules/theme.js";

// Яндекс карта
// import "./modules/map.js";

//================================================================================

// Свои скрипты
import "./modules/script.js";
