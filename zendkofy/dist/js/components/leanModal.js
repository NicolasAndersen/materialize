(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    
    var ZDK_STR = {
        LEAN_OVERLAY: 'zdk-lean-overlay',
        OPEN: 'zdk-open',
        MODAL_CLOSE: 'zdk-modal-close',
        BOTTOM_SHEET: 'zdk-bottom-sheet'

    };
    var _stack = 0,
        _lastID = 0,
        _generateID = function () {
            _lastID++;
            return 'materialize-lean-overlay-' + _lastID;
        };

    $.fn.extend({
        openModal: function (options) {
            var $body = $('body');
            var oldWidth = $body.innerWidth();
            $body.css('overflow', 'hidden');
            $body.width(oldWidth);

            var defaults = {
                opacity: 0.5,
                in_duration: 350,
                out_duration: 250,
                ready: undefined,
                complete: undefined,
                dismissible: true,
                starting_top: '4%',
                ending_top: '10%'
            };
            var $modal = $(this);

            if ($modal.hasClass(ZDK_STR.OPEN)) {
                return;
            }

            var overlayID = _generateID();
            var $overlay = $('<div class="' + ZDK_STR.LEAN_OVERLAY +'"></div>');
            var lStack = (++_stack);

            // Store a reference of the overlay
            $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);
            $modal.data('overlay-id', overlayID).css('z-index', 1000 + lStack * 2 + 1);
            $modal.addClass(ZDK_STR.OPEN);

            $body.append($overlay);

            // Override defaults
            options = $.extend(defaults, options);

            if (options.dismissible) {
                $overlay.click(function () {
                    $modal.closeModal(options);
                });
                // Return on ESC
                $(document).on('keyup.leanModal' + overlayID, function (e) {
                    if (e.keyCode === 27) {   // ESC key
                        $modal.closeModal(options);
                    }
                });
            }

            $modal.find("." + ZDK_STR.MODAL_CLOSE).on('click.close', function (e) {
                $modal.closeModal(options);
            });

            $overlay.css({display: "block", opacity: 0});

            $modal.css({
                display: "block",
                opacity: 0
            });

            $overlay.velocity({opacity: options.opacity}, {
                duration: options.in_duration,
                queue: false,
                ease: "easeOutCubic"
            });
            $modal.data('associated-overlay', $overlay[0]);

            // Define Bottom Sheet animation
            if ($modal.hasClass(ZDK_STR.BOTTOM_SHEET)) {
                $modal.velocity({bottom: "0", opacity: 1}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function () {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            }
            else {
                $.Velocity.hook($modal, "scaleX", 0.7);
                $modal.css({top: options.starting_top});
                $modal.velocity({top: options.ending_top, opacity: 1, scaleX: '1'}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function () {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            }


        }
    });

    $.fn.extend({
        closeModal: function (options) {
            var defaults = {
                out_duration: 250,
                complete: undefined
            };
            var $modal = $(this);
            var overlayID = $modal.data('overlay-id');
            var $overlay = $('#' + overlayID);
            $modal.removeClass(ZDK_STR.OPEN);

            options = $.extend(defaults, options);

            // Enable scrolling
            $('body').css({
                overflow: '',
                width: ''
            });

            $modal.find('.' + ZDK_STR.MODAL_CLOSE).off('click.close');
            $(document).off('keyup.leanModal' + overlayID);

            $overlay.velocity({opacity: 0}, {duration: options.out_duration, queue: false, ease: "easeOutQuart"});


            // Define Bottom Sheet animation
            if ($modal.hasClass(ZDK_STR.BOTTOM_SHEET)) {
                $modal.velocity({bottom: "-100%", opacity: 0}, {
                    duration: options.out_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function () {
                        $overlay.css({display: "none"});

                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        _stack--;
                    }
                });
            }
            else {
                $modal.velocity(
                    {top: options.starting_top, opacity: 0, scaleX: 0.7}, {
                        duration: options.out_duration,
                        complete: function () {

                            $(this).css('display', 'none');
                            // Call complete callback
                            if (typeof(options.complete) === "function") {
                                options.complete();
                            }
                            $overlay.remove();
                            _stack--;
                        }
                    }
                );
            }
        }
    });

    $.fn.extend({
        leanModal: function (option) {
            return this.each(function () {

                var defaults = {
                        starting_top: '4%'
                    },
                // Override defaults
                    options = $.extend(defaults, option);

                // Close Handlers
                $(this).click(function (e) {
                    options.starting_top = ($(this).offset().top - $(window).scrollTop()) / 1.15;
                    var modalSelector = $(this).attr("href") || $(this).data('target');
                    $(modalSelector).openModal(options);
                    e.preventDefault();
                }); // done set on click
            }); // done return
        }
    });
    
    $(document).ready(function () {
        $('[data-materialize-init=true].zdk-modal-trigger').leanModal();
    })
}));
