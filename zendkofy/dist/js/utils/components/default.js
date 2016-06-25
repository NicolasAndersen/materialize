(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define('zendkofy/default', ['zendkofy/init'], factory );
    } else {

        // Browser globals
        factory(Zendkofy);
    }
}(function($z) {
    'use strict';
    $z.utils = $z.utils || {};
    $z.utils.DEFAULT = $z.utils.DEFAULT || {};

    $z.utils.DEFAULT.CLASSNAMES_PREFIX = 'zdk-';
    $z.utils.DEFAULT.CLASSNAMES_SEPERATOR = ' ';

    return $z;
}));