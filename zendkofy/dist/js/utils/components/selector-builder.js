(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define('zendkofy/selector-builder', [
            'zendkofy/init',
            'zendkofy/selector-attribute',
            'zendkofy/selector-class'
        ], factory );
    } else {

        // Browser globals
        factory(Zendkofy);
    }
}(function($z) {
    'use strict';

    $z.utils = $z.utils || {};

    var SelectorBuilder = function (options) {
        return this.init(options);
    };

    SelectorBuilder.prototype.init = function (options) {
        this.options = options;

        //selector array
        this.selectors = [];

        // string selector generated
        this.selectorValue = '';

        return this;
    };

    SelectorBuilder.prototype.tag = function (tagName) {
        this.tagName = tagName;

        return this;
    };

    SelectorBuilder.prototype.attrs = function (at, atv) {
        var attrs;
        
        if(at instanceof SelectorBuilder) {
            attrs = at.build();
        } else {
            attrs = $z.utils.selectorAttr(at, atv);
        }
        
        if(attrs) {
            this.selectors.push(attrs);
        }

        return this;
    };

    SelectorBuilder.prototype.classes = function (cl) {
        var classes;

        if(cl instanceof SelectorBuilder) {
            classes = cl.build();
        } else {
            classes = $z.utils.selectorClass(cl, '');
        }
        
        if(classes) {
            this.selectors.push(classes);
        }

        return this;
    };

    SelectorBuilder.prototype.not = function (notquery) {
        var not;

        if(notquery instanceof SelectorBuilder) {
            not = notquery.build();
        } else {
            not = notquery;
        }
        
        if(not) {
            this.selectors.push(':not(' + not+ ')');
        }

        return this;
    };

    SelectorBuilder.prototype.build = function (seperator) {
        if(this.options) {
            var options = this.options;
            this.selectors = [];

            return this.tag(options.tag)
                .attrs(options.attrs)
                .classes(options.classes)
                .not(options.not)
                .buildNomal(options.seperator);
        } else {
            return this.buildNomal('' + (seperator || ''));
        }
    };


    SelectorBuilder.prototype.buildNomal = function (seperator) {
        var tagName = this.tagName || '';
        seperator = '' + (seperator || '');
        this.selectorValue = tagName + this.selectors.join(seperator);

        return this.selectorValue;
    };

    SelectorBuilder.prototype.toString = function () {
        return this.build();
    };

    $z.utils.selector = function (options) {
        return new SelectorBuilder(options);
    };

    return $z.utils.selector;
}));