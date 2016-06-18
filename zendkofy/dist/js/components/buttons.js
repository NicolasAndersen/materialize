(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var btnFloatingSelector = 'ul .zdk-btn-floating',
        classHorizontal = 'zdk-horizontal',
        classActive = 'zdk-active';

    $.fn.extend({
        openFABMenu: function () {
            var $this = $(this);
            if ($this.hasClass(classActive) === false) {

                // Get direction option
                var horizontal = $this.hasClass(classHorizontal);
                var offsetY, offsetX;

                if (horizontal === true) {
                    offsetX = 40;
                } else {
                    offsetY = 40;
                }

                $this.addClass(classActive);
                var $btnFloating = $this.find(btnFloatingSelector);

                $btnFloating.velocity(
                    {scaleY: ".4", scaleX: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
                    {duration: 0});

                var time = 0;
                $btnFloating.reverse().each(function () {
                    $(this).velocity(
                        {opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: '0'},
                        {duration: 80, delay: time});
                    time += 40;
                });
            }
        },
        closeFABMenu: function () {
            $this = $(this);
            // Get direction option
            var horizontal = $this.hasClass(classHorizontal);
            var offsetY, offsetX;

            if (horizontal === true) {
                offsetX = 40;
            } else {
                offsetY = 40;
            }

            $this.removeClass(classActive);

            var $btnFloating = $this.find(btnFloatingSelector);
            var time = 0;

            $btnFloating.velocity("stop", true);
            $btnFloating.velocity(
                {opacity: "0", scaleX: ".4", scaleY: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
                {duration: 80}
            );
        }
    });

    $(document).ready(function () {
        // jQuery reverse
        $.fn.reverse = [].reverse;

        // Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
        $(document).on({
            'mouseenter.fixedActionBtn': function (e) {
                $(this).openFABMenu();
            },
            'mouseleave.fixedActionBtn': function (e) {
                $(this).closeFABMenu();
            }
        }, '[data-materialize-init=true].zdk-fixed-action-btn:not(.zdk-click-to-toggle)');

        // Toggle-on-click behaviour.
        $(document).on(
            'click.fixedActionBtn',
            '[data-materialize-init=true].zdk-fixed-action-btn.zdk-click-to-toggle > a',
            function (e) {
                var $this = $(this);
                var $menu = $this.parent();
                if ($menu.hasClass(classActive)) {
                    $menu.closeFABMenu();
                } else {
                    $menu.openFABMenu();
                }
            });
    });
}));
