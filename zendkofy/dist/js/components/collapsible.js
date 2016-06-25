(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define('material/collapsible', ["jquery", "jquery/ui/widget", "jquery/ui/easing"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    
    var ZDK_STR = {
        COLLAPSIBLE: 'zdk-collapsible',
        COLLAPSIBLE_HEADER: 'zdk-collapsible-header',
        COLLAPSIBLE_BODY: 'zdk-collapsible-body',
        ACTIVE: 'zdk-active'
    };

    $.widget('zdkMaterial.zdk_collapible', {
        options: {
            collapsibleType: 'accordion',
            panelHeaderSelector: '> li > .' + ZDK_STR.COLLAPSIBLE_HEADER
        },
        _create: function () {
            var self = this,
                $element = $(this.element),
                options = this.options,
                events = {};

            if(!$element.data('collapsible')
                || ($element.data('collapsible') !== 'accordion' && $element.data('collapsible') !== 'expandable')) {
                $element.data('collapsible', options.collapsibleType);
            }

            $element.off('click', options.panelHeaderSelector);
            $element.find(options.panelHeaderSelector).off('click');

            self.openPanel($element.find('> li.' + ZDK_STR.ACTIVE));
            
            events['click ' + options.panelHeaderSelector] = function (event) {
                var $collapsibleItem = $(event.currentTarget).parent();
                if(!$collapsibleItem.hasClass(ZDK_STR.ACTIVE)) {
                    if($element.data('collapsible') === 'accordion') {
                        self.closePanel($element.find('> li.' + ZDK_STR.ACTIVE));
                    }
                    self.openPanel($collapsibleItem);
                } else {
                    self.closePanel($collapsibleItem);
                }
            };

            this._on(this.element, events);
        },

        /**
         * @param $collapsibleItem
         * @returns {*|{}}
         * @private
         */
        _getHeaderPanel: function ($collapsibleItem) {
            return $collapsibleItem.find('> .' + ZDK_STR.COLLAPSIBLE_HEADER);
        },

        /**
         * @param $collapsibleItem
         * @returns {*|{}}
         * @private
         */
        _getBodyPanel: function ($collapsibleItem) {
            return $collapsibleItem.find('> .' + ZDK_STR.COLLAPSIBLE_BODY);
        },

        /**
         * @param $collapsibleItem
         */
        openPanel: function ($collapsibleItem) {
            $collapsibleItem.addClass('zdk-active');
            this._getHeaderPanel($collapsibleItem).addClass('zdk-active');
            this._getBodyPanel($collapsibleItem).stop(true, false).slideDown({
                duration: 350,
                easing: "easeOutQuart",
                queue: false,
                complete: function () {
                    $(this).css('height', '');
                }
            });
        },

        /**
         * @param $collapsibleItem
         */
        closePanel: function ($collapsibleItem) {
            $collapsibleItem.removeClass(ZDK_STR.ACTIVE);
            this._getHeaderPanel($collapsibleItem).removeClass(ZDK_STR.ACTIVE);
            this._getBodyPanel($collapsibleItem).stop(true, false).slideUp({
                duration: 350,
                easing: "easeOutQuart",
                queue: false,
                complete: function () {
                    $(this).css('height', '');
                }
            });
        }
    });

    $(document).ready(function () {
        $('[data-materialize-init=true].' + ZDK_STR.COLLAPSIBLE).zdk_collapible();
    });

    return $.zdkMaterial.zdk_collapible;
}));