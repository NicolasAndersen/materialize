(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(
            [
                'zendkofy/init',
                'zendkofy/default',
                'zendkofy/classnames'
            ], factory);
    } else {

        // Browser globals
        factory(Zendkofy);
    }
}(function ($z) {
    'use strict';
    $z.utils = $z.utils || {};

    $z.utils.selectorClass = function (cls, seperator, prefix) {
        return $z.utils.classnames(cls, seperator, prefix, true);
    };

    return $z.utils.selectorClass;
}));