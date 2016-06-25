(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define('material', [
            'material/init',
            'material/guid',
            'material/element-or-parent-is-fixed'
        ], factory );
    } else {

        // Browser globals
        factory(Material);
    }
}(function($m) {
    'use strict';

    return $m;
}));