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
    var Zendkofy = {};
    
    if ( typeof define === "function" && define.amd ) {
        define( "zendkofy-init", [], function() {
            return Zendkofy;
        } );
    }

    var _Zendkofy = window.Zendkofy,
        _$z = window.$z;

    window.$z = Zendkofy;
    Zendkofy.noConflict = function (deep) {
        if ( window.$z === Zendkofy ) {
            window.$z = _$z;
        }

        if ( deep && window.Zendkofy === Zendkofy ) {
            window.jQuery = _Zendkofy;
        }

        return window.Zendkofy;
    };

    window.Zendkofy = window.$z = Zendkofy;

    return Zendkofy;
}));