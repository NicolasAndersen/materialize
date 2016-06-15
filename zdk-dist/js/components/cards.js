(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "zendkofy", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery, Zendkofy);
    }
}(function ($, $z) {
    var cardSelector = $z.utils.selectorClass('card'),
        cardRevealSelector = $z.utils.selectorClass('card-reveal'),
        activatorSelector = $z.utils.selectorClass(['card', 'activator'], ' '),
        cardTitleSelector = $z.utils.classnames(['card', 'card-title'], ' ');
    
    $(document).ready(function () {

        $(document).on('click.card', cardSelector, function (e) {
            if ($(this).find('> ' + cardRevealSelector).length) {
                if ($(e.target).is($(cardTitleSelector)) || $(e.target).is($(cardTitleSelector + ' i'))) {
                    // Make Reveal animate down and display none
                    $(this).find(cardRevealSelector)
                        .velocity({translateY: 0}, {
                                duration: 225,
                                queue: false,
                                easing: 'easeInOutQuad',
                                complete: function () {
                                    $(this).css({display: 'none'});
                                }
                            }
                        );
                }
                else if ($(e.target).is($(activatorSelector)) ||
                    $(e.target).is($(activatorSelector + ' i'))) {
                    $(e.target).closest(cardSelector).css('overflow', 'hidden');
                    $(this).find(cardRevealSelector)
                        .css({display: 'block'})
                        .velocity("stop", false)
                        .velocity({translateY: '-100%'}, {
                            duration: 300,
                            queue: false,
                            easing: 'easeInOutQuad'
                        });
                }
            }

            $('.card-reveal').closest('.card').css('overflow', 'hidden');

        });

    });
}));