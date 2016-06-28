(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define('material/form/checkboxes', ["jquery"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    var ZDK_STR = {
        TABBED: 'zdk-tabbed'
    };

    $(document).ready(function () {
        var radio_checkbox = 'input[type=radio], input[type=checkbox]';
        $(document).on('keyup.radio', radio_checkbox, function (e) {
            // TAB, check if tabbing to radio or checkbox.
            if (e.which === 9) {
                $(this).addClass(ZDK_STR.TABBED);
                var $this = $(this);
                $this.one('blur', function (e) {

                    $(this).removeClass(ZDK_STR.TABBED);
                });
                return;
            }
        });
    });
}));
