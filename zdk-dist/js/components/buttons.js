(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "classnames-prefix", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery, classnamesPrefix);
    }
}(function ($, classnamesPrefix) {
    var clp = classnamesPrefix.classnames;
    var btnFloatingSelector = 'ul .' + clp('btn-floating'),
        classHorizontal = clp('horizontal'),
        classActive = clp('active');

    $(document).ready(function () {

        // jQuery reverse
        $.fn.reverse = [].reverse;

        // Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
        $(document).on({
            'mouseenter.fixedActionBtn': function (e) {
                var $this = $(this);
                openFABMenu($this);
            },
            'mouseleave.fixedActionBtn': function (e) {
                var $this = $(this);
                closeFABMenu($this);
            }
        }, '[data-materialize-init=true].' + clp('fixed-action-btn') + ':not(.' + clp('click-to-toggle') + ')');

        // Toggle-on-click behaviour.
        $(document).on(
            'click.fixedActionBtn',
            '[data-materialize-init=true].' + clp('fixed-action-btn') + '.' + clp('click-to-toggle') + ' > a',
            function (e) {
            var $this = $(this);
            var $menu = $this.parent();
            if ($menu.hasClass(classActive)) {
                closeFABMenu($menu);
            } else {
                openFABMenu($menu);
            }
        });

    });

    $.fn.extend({
        openFAB: function () {
            openFABMenu($(this));
        },
        closeFAB: function () {
            closeFABMenu($(this));
        }
    });

    var openFABMenu = function (btn) {
        $this = btn;
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
            $this.find(btnFloatingSelector).velocity(
                {scaleY: ".4", scaleX: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
                {duration: 0});

            var time = 0;
            $this.find(btnFloatingSelector).reverse().each(function () {
                $(this).velocity(
                    {opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: '0'},
                    {duration: 80, delay: time});
                time += 40;
            });
        }
    };

    var closeFABMenu = function (btn) {
        $this = btn;
        // Get direction option
        var horizontal = $this.hasClass(classHorizontal);
        var offsetY, offsetX;

        if (horizontal === true) {
            offsetX = 40;
        } else {
            offsetY = 40;
        }

        $this.removeClass(classActive);
        var time = 0;
        $this.find(btnFloatingSelector).velocity("stop", true);
        $this.find(btnFloatingSelector).velocity(
            {opacity: "0", scaleX: ".4", scaleY: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
            {duration: 80}
        );
    };
}));
