(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "jquery/ui/widget", "jquery/ui/easing"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    
    var CONST_STRING = {
        COLLAPSIBLE: 'zdk-collapsible',
        COLLAPSIBLE_HEADER: 'zdk-collapsible-header',
        COLLAPSIBLE_BODY: 'zdk-collapsible-body',
        ACTIVE: 'zdk-active'
    };

    $.widget('zdkMaterial.zdk_collapible', {
        options: {
            collapsibleType: 'accordion',
            panelHeaderSelector: '> li > .' + CONST_STRING.COLLAPSIBLE_HEADER
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

            self.openPanel($element.find('> li.' + CONST_STRING.ACTIVE));
            
            events['click ' + options.panelHeaderSelector] = function (event) {
                var $collapsibleItem = $(event.currentTarget).parent();
                if(!$collapsibleItem.hasClass(CONST_STRING.ACTIVE)) {
                    if($element.data('collapsible') === 'accordion') {
                        self.closePanel($element.find('> li.' + CONST_STRING.ACTIVE));
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
            return $collapsibleItem.find('> .' + CONST_STRING.COLLAPSIBLE_HEADER);
        },

        /**
         * @param $collapsibleItem
         * @returns {*|{}}
         * @private
         */
        _getBodyPanel: function ($collapsibleItem) {
            return $collapsibleItem.find('> .' + CONST_STRING.COLLAPSIBLE_BODY);
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
            $collapsibleItem.removeClass(CONST_STRING.ACTIVE);
            this._getHeaderPanel($collapsibleItem).removeClass(CONST_STRING.ACTIVE);
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
        $('[data-materialize-init=true].' + CONST_STRING.COLLAPSIBLE).zdk_collapible();
    });

    return $.zdkMaterial.zdk_collapible;
}));