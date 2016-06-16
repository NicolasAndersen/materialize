(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define([
            'zendkofy/init', 
            'zendkofy/default',
            'zendkofy/classnames',
            'zendkofy/selector-attribute',
            'zendkofy/selector-class',
            'zendkofy/selector-builder',
            'zendkofy/material/guid',
            'zendkofy/material/element-or-parent-is-fixed'
        ], factory );
    } else {

        // Browser globals
        factory(Zendkofy);
    }
}(function($z) {
    'use strict';
    
    $z.utils.DEFAULT.CLASSNAMES_PREFIX = 'zdk-';
    $z.utils.DEFAULT.CLASSNAMES_SEPERATOR = ' ';
    
    return $z;
}));