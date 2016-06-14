(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define([], factory );
    } else {

        // Browser globals
        factory();
    }
}(function() {
    'use strict';
    var classnamesPrefix = window.classnamesPrefix || {};

    var hasOwn = {}.hasOwnProperty;
    
    classnamesPrefix.prefix = 'zm-';
    
    classnamesPrefix.setPrefix = function (prefix) {
        this.prefix = (typeof prefix === 'string') ? prefix : '';
    };
    
    classnamesPrefix.getPrefix = function () {
        return this.prefix;
    };
    
    classnamesPrefix.classnames = function () {
        var classes = [], prefix = classnamesPrefix.getPrefix();
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!arg) continue;

            var argType = typeof arg;

            if (argType === 'string' || argType === 'number') {
                classes.push(prefix + arg);
            } else if (Array.isArray(arg)) {
                classes.push(classnamesPrefix.classnames.apply(null, arg));
            } else if (argType === 'object') {
                for (var key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(prefix + key);
                    }
                }
            }
        }

        return classes.join(' ');
    };

    window.classnamesPrefix = classnamesPrefix;
    
    return classnamesPrefix;
}));