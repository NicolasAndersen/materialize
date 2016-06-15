(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery, Zendkofy);
    }
}(function ($) {
    $.fn.extend({
        closeRevealCard: function () {
            var $card = $(this),
                $cardReveal = $card.find('> .zm-card-reveal');
            $cardReveal.velocity(
                {translateY: 0}, {
                    duration: 300,
                    queue: false,
                    easing: 'easeInOutQuad',
                    complete: function () {
                        $(this).css({display: 'none'});
                    }
                }
            );
            $card.css('overflow', 'hidden');
        },
        openRevealCard: function () {
            var $card = $(this),
                $cardReveal = $card.find('> .zm-card-reveal');
            $card.css('overflow', 'hidden');

            $cardReveal.css({display: 'block'}).velocity("stop", false).velocity(
                {translateY: '-100%'}, {
                    duration: 300,
                    queue: false,
                    easing: 'easeInOutQuad'
                });
        }
    });

    $(document).ready(function () {
        $(document).on('click.card', '[data-materialize-init=true].zm-card', function (e) {
            var $card = $(this),
                $cardReveal = $card.find('> .zm-card-reveal');
            if ($cardReveal.length) {
                var $target = $(e.target),
                    $cardTitle = $cardReveal.find('.zm-card-title, .zm-card-title i'),
                    $activator = $card.find('.zm-activator, .zm-activator i');

                if ($target.is($cardTitle)) {
                    $card.closeRevealCard();
                }
                else if ($target.is($activator)) {
                    $card.openRevealCard();
                }
            }
        });
    });
}));