(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define('zendkofy/classnames', ['zendkofy/init', 'zendkofy/default'], factory );
    } else {

        // Browser globals
        factory(Zendkofy);
    }
}(function($z) {
    'use strict';
    var hasOwn = {}.hasOwnProperty;
    $z.utils = $z.utils || {};
    
    
    $z.utils.classnames = function (cls, seperator, prefix, iselector) {
        var seperator = typeof seperator !== 'undefined' ? seperator : $z.utils.DEFAULT.CLASSNAMES_PREFIX;
        var prefix = typeof prefix !== 'undefined' ? prefix : $z.utils.DEFAULT.CLASSNAMES_PREFIX;

        if(iselector) {
            prefix = '.' + prefix;
        }

        var classes = [];
        var argType = typeof cls;

        if (argType === 'string' || argType === 'number') {
            classes.push(prefix + cls);
        } else if (Array.isArray(cls)) {
            for (var i = 0, len = cls.length; i < len; ++i) {
                if (typeof cls[i] === 'string' || typeof cls[i] === 'number') {
                    classes.push(prefix + cls[i]);
                }
            }
        } else if (argType === 'object') {
            for (var key in cls) {
                if (hasOwn.call(cls, key) && cls[key]) {
                    classes.push(prefix + key);
                }
            }
        }

        return classes.join(seperator);
    };
    
    return $z.utils.classnames;
}));