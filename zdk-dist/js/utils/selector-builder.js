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
    var hasOwn = {}.hasOwnProperty;
    var jqueryRex = /([ {}\|`\^@\?%#;&,.+*~\':"!^$[\]()=>|\/])/g;

    function attributeBuilder(attrs) {
        var selectors = [];
        if(typeof attrs === 'object') {
            for (var key in attrs) {
                if (hasOwn.call(attrs, key) && typeof attrs[key] !== 'undefined') {
                    var attrName = key.replace(jqueryRex,'\\$1');
                    if(attrs[key] && typeof attrs[key] === 'string') {
                        selectors.push('[' + attrName + '="' + attrs[key].replace(jqueryRex,'\\$1') + '"]');
                    } else {
                        selectors.push('[' + attrName + ']');
                    }
                }
            }
        }

        return selectors.join('');
    }

    function classBuilder() {
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!arg) continue;

            var argType = typeof arg;

            if (argType === 'string' || argType === 'number') {
                classes.push(arg);
            } else if (Array.isArray(arg)) {
                classes.push(classBuilder.apply(null, arg));
            } else if (argType === 'object') {
                for (var key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }

        return classes.join('.');
    }


    function notSelectorBuilder(options) {
        var content = selectorBuilder(options);

        return content ? ':not(' + content + ')' : '';
    }


    function selectorBuilder(options) {
        var selectors = [];
        if(typeof options === 'object') {
            if(typeof options.tag === 'string') {
                selectors.push(options.tag)
            }
            
            var attrs = attributeBuilder(options.attrs);
            if(attrs) {
                selectors.push(attributeBuilder(options.attrs));
            }

            var classes = classBuilder(options.classes);
            if(classes) {
                selectors.push('.' + classes);
            }

            var not = notSelectorBuilder(options.not);
            if(not) {
                selectors.push(not);
            }

            var childs = selectorBuilder(options.childs);
            if(childs) {
                selectors.push(' ' + childs);
            }

            var firstChild = selectorBuilder(options.firstChild);
            if(firstChild) {
                selectors.push(' > ' + firstChild);
            }
        }

        return selectors.join('');
    }

    window.selectorBuilder = selectorBuilder;

    return selectorBuilder;
}));