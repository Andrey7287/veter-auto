export default class {

	constructor (cms = 'bitrix', content = '.content') {

		this.cms = cms;
		this.content = $(content);
		this.headerHeight;
		this.footerHeight;
		this.vh = $(window).outerHeight(true);
		this.siteHeight;
		this.adminHeight;

	}

	_getAdminHeight() {

		switch (this.cms) {
			case 'bitrix':
				return $('#bx-panel').length ? $('#bx-panel').outerHeight(true) : 0;
			case 'emerald':
				return $('.adminTopPanel').length ? $('.adminTopPanel').outerHeight(true) : 0;
			default:
				return 0;
		}

	}

	_getContentHeight() {

		return this.content.outerHeight(true);

	}

	setParam() {


		this.headerHeight = $('header').outerHeight(true);
		this.footerHeight = $('footer').outerHeight(true);

//console.log(this.footerHeight);
		this.adminHeight = this._getAdminHeight();
		this.siteHeight = this.headerHeight +
											this.footerHeight +
											this.adminHeight +
											this._getContentHeight();
	}

	fixFooter() {

		this.setParam();

		if ( this.vh > this.siteHeight ) {

			var newHeight = this.vh - ( this.headerHeight + this.footerHeight + this.adminHeight );
			this.content.outerHeight(newHeight);

		} else { this.content.outerHeight('auto'); }

	}

}
