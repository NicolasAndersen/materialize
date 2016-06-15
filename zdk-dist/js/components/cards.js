(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "zendkofy", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery, Zendkofy);
    }
}(function ($, $z) {
    $(document).ready(function() {

        $(document).on('click.card', '[data-materialize-init=true].zm-card', function (e) {
            if ($(this).find('> .zm-card-reveal').length) {
                if ($(e.target).is($('.zm-card-reveal .zm-card-title')) || $(e.target).is($('.zm-card-reveal .zm-card-title i'))) {
                    // Make Reveal animate down and display none
                    $(this).find('.zm-card-reveal').velocity(
                        {translateY: 0}, {
                            duration: 225,
                            queue: false,
                            easing: 'easeInOutQuad',
                            complete: function() { $(this).css({ display: 'none'}); }
                        }
                    );
                }
                else if ($(e.target).is($('.zm-card .zm-activator')) ||
                    $(e.target).is($('.zm-card .zm-activator i')) ) {
                    $(e.target).closest('.zm-card').css('overflow', 'hidden');
                    $(this).find('.zm-card-reveal').css({ display: 'block'}).velocity("stop", false).velocity({translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeInOutQuad'});
                }
            }

            $('.zm-card-reveal').closest('.zm-card').css('overflow', 'hidden');
        });

    });
}));