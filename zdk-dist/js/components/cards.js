(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "zendkofy", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery, Zendkofy);
    }
}(function ($, $z) {
    $(document).ready(function () {

        $(document).on('click.card', '[data-materialize-init=true].zm-card', function (e) {
            var $card = $(this),
                $cardReveal = $card.find('> .zm-card-reveal');
            if ($cardReveal.length) {
                var $target = $(e.target),
                    $cardTitle = $cardReveal.find('.zm-card-title'),
                    $cardTitleIcon = $cardTitle.find('i');

                var $activator = $card.find('.zm-activator'),
                    $activatorIcon = $activator.find('i');

                if ($target.is($cardTitle) || $target.is($cardTitleIcon)) {
                    // Make Reveal animate down and display none
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
                }
                else if ($target.is($activator) || $target.is($activatorIcon)) {
                    $card.css('overflow', 'hidden');
                    $cardReveal.css({display: 'block'}).velocity("stop", false).velocity(
                        {translateY: '-100%'}, {
                            duration: 300,
                            queue: false,
                            easing: 'easeInOutQuad'
                        });
                }
            }

            $card.css('overflow', 'hidden');
        });

    });
}));