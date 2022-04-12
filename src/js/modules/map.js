//================================================================================

// Перед wrapper
// <script src="https://api-maps.yandex.ru/2.1/?apikey=<your API key>&lang=it_it"></script>

// <div id="map" class="map"></div>

function mapAdd() {
	let center = [55.77241077714968, 37.679044499999975];
	let zoom = 16;

	function init() {
		let map = new ymaps.Map('map', {
			center: center,
			zoom: zoom,
		});
		let placemarkCustom = new ymaps.Placemark(center, {
			balloonContent: `
				<div class="balloon">
					<div class="balloon__address">м. Бауманская</div>
					<div class="balloon__contacts"><a href="tel:79999999999">+7 (999) 999-99-99</a></div>
				</div>
			`
		}, {
			iconLayout: 'default#image',
			iconImageHref: 'img/marker.svg',
			iconImageSize: [40, 40]
		});
		map.controls.remove('geolocationControl'); // удаляем геолокацию
		map.controls.remove('searchControl'); // удаляем поиск
		map.controls.remove('trafficControl'); // удаляем контроль трафика
		map.controls.remove('typeSelector'); // удаляем тип
		map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
		map.controls.remove('zoomControl'); // удаляем контрол зуммирования
		map.controls.remove('rulerControl'); // удаляем контрол правил
		//map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
		map.geoObjects.add(placemarkCustom);
		placemarkCustom.balloon.open();
	}

	ymaps.ready(init);
}
if (document.querySelector('#map')) {
	mapAdd();
}
//================================================================================