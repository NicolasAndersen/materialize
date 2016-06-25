(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define('zendkofy', [
            'zendkofy/init', 
            'zendkofy/default',
            'zendkofy/classnames',
            'zendkofy/selector-attribute',
            'zendkofy/selector-class',
            'zendkofy/selector-builder',
            'zendkofy/guid',
            'zendkofy/element-or-parent-is-fixed'
        ], factory );
    } else {

        // Browser globals
        factory(Zendkofy);
    }
}(function($z) {
    'use strict';
    
    return $z;
}));