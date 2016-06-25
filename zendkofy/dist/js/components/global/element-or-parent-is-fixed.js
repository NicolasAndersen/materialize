(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define('material/element-or-parent-is-fixed', ['material/init'], factory );
    } else {

        // Browser globals
        factory(zMeterial);
    }
}(function($m) {
    'use strict';
    $m.elementOrParentIsFixed = function(element) {
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

    return $m.elementOrParentIsFixed;
}));