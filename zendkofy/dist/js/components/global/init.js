(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define('material/init', [], factory );
    } else {

        // Browser globals
        factory();
    }
}(function() {
    'use strict';
    var zMeterial = {};

    if ( typeof define === "function" && define.amd ) {
        define( 'material/init', [], function() {
            return zMeterial;
        } );
    }

    var _$m = window.$m;

    zMeterial.noConflict = function () {
        if ( window.$m === zMeterial ) {
            window.$m = _$m;
        }

        return window.zMeterial;
    };

    window.zMeterial = window.$m = zMeterial;

    return zMeterial;
}));