(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" , "jquery/ui"], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
	$.widget('zdkmaterial.groupButton', {
		options: {
			direction: 'left', // top|right|bottom|left
			toggleClick: true,
			toggleClickSelector: '> a'
		},
		_create: function () {
			$button = $(this.element);

			this._on(this.element, {
				'click': function (event) {
					if($button.hasClass('active')) {
						$button.addClass('active');
						this.close();
					} else {
						$button.removeClass('active');
						this.open();
					}
				}
			});
		},

		open: function () {
			
		},

		close: function () {
		}
	});

	return $.zdkmaterial.groupButton;
}));