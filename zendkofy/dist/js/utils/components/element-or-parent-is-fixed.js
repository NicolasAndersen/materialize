(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define(['zendkofy/init', 'zendkofy/default'], factory );
    } else {

        // Browser globals
        factory(Zendkofy);
    }
}(function($z) {
    'use strict';
    $z.utils = $z.utils || {};

    $z.utils.elementOrParentIsFixed = function(element) {
        var $element = $(element);
        var $checkElements = $element.add($element.parents());
        var isFixed = false;
        $checkElements.each(function(){
            if ($(this).css("position") === "fixed") {
                isFixed = true;
                return false;
            }
        });
        return isFixed;
    };

    return $z.utils.elementOrParentIsFixed;
}));