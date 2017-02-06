ymaps.ready(init);

var map,
		marker;

function init(){

	map = new ymaps.Map("map", {
			center: [55.792131, 37.696452],
			zoom: 16
	});
	marker = new ymaps.Placemark([55.792131, 37.696452], {hintContent: 'Ветер авто'}, {
		iconLayout: 'default#image',
		iconImageHref: '../../images/map_marker.png',
		iconImageSize: [46, 68],
		iconImageOffset: [-22, -68]
	});
	map.geoObjects.add(marker);
	map.behaviors.disable('scrollZoom')
}

