require.ensure([], (require) => {

	require('./modules/ravno');
	$('.ttt').ravno();

});


$(window).on('load', function(){

	require.ensure([], (require) => {
		let Footer = require('./modules/footer');
		let footer = new Footer.default;
		footer.fixFooter()
	});

});
