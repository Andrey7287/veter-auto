'use strict';

/* Make jQuery available in global */
console.log(`jQuery ${$.fn.jquery} is loaded`);
window.$ = $;
window.jQuery = $;

/* Import project styles and components */
import './modules/jquery-ui-1.9.2.custom.min';
import './modules/datepicker-ru';
import './modules/ravno';
import '../sass/css.scss';
import Menu from './modules/menu';
import Footer from './modules/footer';
import OnResize from './modules/resize';
import scrollup from './modules/scrollup';
import 'script!picturefill/dist/picturefill.min';


/* Define project components and variables */
var menu = new Menu(),
		footer = new Footer(),
		resizeAdaptiveMenu = new OnResize(),
		resizeAlignGreed = new OnResize(true),
		isMap = $('#map').is('#map'),
		isSlider = $('.slider').is('.slider'),
		mobileView = window.matchMedia("(max-width: 992px)").matches,
		scrollTiming = 0;

/***********************
********* MENU *********
************************/

function adaptiveMenu(){
	if ( mobileView ) {
		menu.initBurger();
		menu.initMobile();
	} else {
		menu.destructMobile();
	}
}

resizeAdaptiveMenu.bind(adaptiveMenu);

/***********************
******** FOOTER ********
************************/

$(window).on('load', function(){
	footer.fixFooter();
});

/**********************
********* MAP *********
***********************/

if ( isMap ) {

	require.ensure([], (require) => {
		require('./modules/map');
	});

}

/***********************
******** SLIDER ********
************************/


if ( isSlider ) {

	require.ensure([], (require) => {
		require('script!slick-carousel/slick/slick.js');
		$('.slider-main').slick({
			prevArrow: $('.left'),
			nextArrow: $('.right'),
			dots: true,
			appendDots: $('.slider-dots'),
			slidesToShow: 2
		});
		$('.slider-card').slick({
			arrows: false
		});
	});

}

/************************
******* Scroll Up *******
*************************/

$(document).scroll(function(){

	if ( !scrollTiming ) {

		scrollTiming = setTimeout(function(){

			var scroll = $('body').scrollTop() ? $('body').scrollTop() : $('html').scrollTop();
			scroll >= 300 ? $('.scrollup').addClass('act') : $('.scrollup').removeClass('act');
			scrollTiming = 0;

		},300);

	}

});

$('.scrollup').scrollUp();

/*******************************
*********** jQueryUI ***********
********************************/

$.datepicker.setDefaults( $.datepicker.regional[ "" ] );
$(".datepicker").datepicker( $.datepicker.regional[ "ru" ] );

$(".datepicker").datepicker({
	dateFormat: "dd.mm.yy"
});


/*******************************
********* Align cardsI *********
********************************/

var $card = $('.catalog__descr');
$card.find('h3').ravno();
$card.find('.spec').ravno();
