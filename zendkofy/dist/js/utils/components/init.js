(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define('zendkofy/init', [], factory );
    } else {

        // Browser globals
        factory();
    }
}(function() {
    'use strict';
    var Zendkofy = {};
    
    if ( typeof define === "function" && define.amd ) {
        define( 'zendkofy/init', [], function() {
            return Zendkofy;
        } );
    }

    var _$z = window.$z;

    Zendkofy.noConflict = function () {
        if ( window.$z === Zendkofy ) {
            window.$z = _$z;
        }

        return window.Zendkofy;
    };

    window.Zendkofy = window.$z = Zendkofy;

    return Zendkofy;
}));