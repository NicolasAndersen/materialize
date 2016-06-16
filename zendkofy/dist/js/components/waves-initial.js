(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "zendkofy/material/waves"], factory);
    } else {

        // Browser globals
        factory(jQuery, Waves);
    }
}(function ($, Waves) {
    $(document).ready(function ($) {
        Waves.displayEffect();
    });
}));