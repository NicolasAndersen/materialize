(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define('zendkofy/selector-attribute', ['zendkofy/init', 'zendkofy/default'], factory );
    } else {

        // Browser globals
        factory(Zendkofy);
    }
}(function($z) {
    'use strict';
    var hasOwn = {}.hasOwnProperty;
    var jqueryRex = /([ {}\|`\^@\?%#;&,.+*~\':"!^$[\]()=>|\/])/g;

    $z.utils = $z.utils || {};
    $z.utils.selectorAttr = function (attrs, value) {
        var selectors = [];
        var typeofAttrs = typeof attrs;
        if(typeofAttrs === 'string') {
            if(typeof value !== "undefined") {
                // cast value to string
                value = '' + (value || '');
                selectors.push('[' + attrs + '="' + value.replace(jqueryRex,'\\$1') + '"]');
            } else {
                selectors.push('[' + attrs.replace(jqueryRex,'\\$1') + ']');
            }
        } else if(typeofAttrs === 'object') {
            for (var key in attrs) {
                if (hasOwn.call(attrs, key) && typeof attrs[key] !== 'undefined') {
                    selectors.push($z.utils.selectorAttr.call(null, key, attrs[key]));
                }
            }
        }

        return selectors.join('');
    };

    return $z.utils.selectorAttr;
}));