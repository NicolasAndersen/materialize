(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "material/waves"], factory);
    } else {

        // Browser globals
        factory(jQuery, Waves);
    }
}(function ($, Waves) {
    'use strict';
    
    $(document).ready(function ($) {
        Waves.displayEffect();
    });
}));