(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "jquery/hammer", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery, Zendkofy);
    }
}(function ($) {
    'use strict';
    
    var ZDK_STR = {
        SIDENAV_OVERLAY: 'zdk-sidenav-overlay',
        SIDENAV_OVERLAY_HTML: '<div id="zdk-sidenav-overlay"></div>',
        DRAG_TARGET: 'zdk-drag-target',
        RIGHT_ALIGNED: 'zdk-right-aligned',
        FIXED: 'zdk-fixed'
    };

    var methods = {
        init: function (options) {
            var defaults = {
                menuWidth: 240,
                edge: 'left',
                closeOnClick: false
            };
            options = $.extend(defaults, options);

            $(this).each(function () {
                var $this = $(this);
                var menu_id = $("#" + $this.attr('data-activates'));

                // Set to width
                if (options.menuWidth != 240) {
                    menu_id.css('width', options.menuWidth);
                }

                // Add Touch Area
                var dragTarget = $('<div class="' + ZDK_STR.DRAG_TARGET + '"></div>');
                $('body').append(dragTarget);

                if (options.edge == 'left') {
                    menu_id.css('transform', 'translateX(-100%)');
                    dragTarget.css({'left': 0}); // Add Touch Area
                }
                else {
                    menu_id.addClass(ZDK_STR.RIGHT_ALIGNED) // Change text-alignment to right
                        .css('transform', 'translateX(100%)');
                    dragTarget.css({'right': 0}); // Add Touch Area
                }

                // If fixed sidenav, bring menu out
                if (menu_id.hasClass(ZDK_STR.FIXED)) {
                    if (window.innerWidth > 992) {
                        menu_id.css('transform', 'translateX(0)');
                    }
                }

                // Window resize to reset on large screens fixed
                if (menu_id.hasClass(ZDK_STR.FIXED)) {
                    $(window).resize(function () {
                        if (window.innerWidth > 992) {
                            // Close menu if window is resized bigger than 992 and user has fixed sidenav
                            if ($('#' + ZDK_STR.SIDENAV_OVERLAY).length !== 0 && menuOut) {
                                removeMenu(true);
                            }
                            else {
                                // menu_id.removeAttr('style');
                                menu_id.css('transform', 'translateX(0%)');
                                // menu_id.css('width', options.menuWidth);
                            }
                        }
                        else if (menuOut === false) {
                            if (options.edge === 'left') {
                                menu_id.css('transform', 'translateX(-100%)');
                            } else {
                                menu_id.css('transform', 'translateX(100%)');
                            }

                        }

                    });
                }

                // if closeOnClick, then add close event for all a tags in side sideNav
                if (options.closeOnClick === true) {
                    menu_id.on("click.itemclick", "a:not(.collapsible-header)", function () {
                        removeMenu();
                    });
                }

                function removeMenu(restoreNav) {
                    panning = false;
                    menuOut = false;
                    // Reenable scrolling
                    $('body').css({
                        overflow: '',
                        width: ''
                    });

                    $('#' + ZDK_STR.SIDENAV_OVERLAY).velocity({opacity: 0}, {
                        duration: 200,
                        queue: false, easing: 'easeOutQuad',
                        complete: function () {
                            $(this).remove();
                        }
                    });
                    if (options.edge === 'left') {
                        // Reset phantom div
                        dragTarget.css({width: '', right: '', left: '0'});
                        menu_id.velocity(
                            {'translateX': '-100%'},
                            {
                                duration: 200,
                                queue: false,
                                easing: 'easeOutCubic',
                                complete: function () {
                                    if (restoreNav === true) {
                                        // Restore Fixed sidenav
                                        menu_id.removeAttr('style');
                                        menu_id.css('width', options.menuWidth);
                                    }
                                }

                            });
                    }
                    else {
                        // Reset phantom div
                        dragTarget.css({width: '', right: '0', left: ''});
                        menu_id.velocity(
                            {'translateX': '100%'},
                            {
                                duration: 200,
                                queue: false,
                                easing: 'easeOutCubic',
                                complete: function () {
                                    if (restoreNav === true) {
                                        // Restore Fixed sidenav
                                        menu_id.removeAttr('style');
                                        menu_id.css('width', options.menuWidth);
                                    }
                                }
                            });
                    }
                }


                // Touch Event
                var panning = false;
                var menuOut = false;

                dragTarget.on('click', function () {
                    if (menuOut) {
                        removeMenu();
                    }
                });

                dragTarget.hammer({
                    prevent_default: false
                }).bind('pan', function (e) {

                    if (e.gesture.pointerType == "touch") {

                        var direction = e.gesture.direction;
                        var x = e.gesture.center.x;
                        var y = e.gesture.center.y;
                        var velocityX = e.gesture.velocityX;

                        // Disable Scrolling
                        var $body = $('body');
                        var oldWidth = $body.innerWidth();
                        $body.css('overflow', 'hidden');
                        $body.width(oldWidth);
                        var $sideNavOverlay = $('#' + ZDK_STR.SIDENAV_OVERLAY);

                        // If overlay does not exist, create one and if it is clicked, close menu
                        if ($sideNavOverlay.length === 0) {
                            $sideNavOverlay = $(ZDK_STR.SIDENAV_OVERLAY_HTML);
                            $sideNavOverlay.css('opacity', 0).click(function () {
                                removeMenu();
                            });
                            $body.append($sideNavOverlay);
                        }


                        // Keep within boundaries
                        if (options.edge === 'left') {
                            if (x > options.menuWidth) {
                                x = options.menuWidth;
                            }
                            else if (x < 0) {
                                x = 0;
                            }
                        }

                        if (options.edge === 'left') {
                            // Left Direction
                            if (x < (options.menuWidth / 2)) {
                                menuOut = false;
                            }
                            // Right Direction
                            else if (x >= (options.menuWidth / 2)) {
                                menuOut = true;
                            }
                            menu_id.css('transform', 'translateX(' + (x - options.menuWidth) + 'px)');
                        }
                        else {
                            // Left Direction
                            if (x < (window.innerWidth - options.menuWidth / 2)) {
                                menuOut = true;
                            }
                            // Right Direction
                            else if (x >= (window.innerWidth - options.menuWidth / 2)) {
                                menuOut = false;
                            }
                            var rightPos = (x - options.menuWidth / 2);
                            if (rightPos < 0) {
                                rightPos = 0;
                            }

                            menu_id.css('transform', 'translateX(' + rightPos + 'px)');
                        }


                        // Percentage overlay
                        var overlayPerc;
                        if (options.edge === 'left') {
                            overlayPerc = x / options.menuWidth;
                            $sideNavOverlay.velocity({opacity: overlayPerc}, {
                                duration: 10,
                                queue: false,
                                easing: 'easeOutQuad'
                            });
                        }
                        else {
                            overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
                            $sideNavOverlay.velocity({opacity: overlayPerc}, {
                                duration: 10,
                                queue: false,
                                easing: 'easeOutQuad'
                            });
                        }
                    }

                }).bind('panend', function (e) {

                    if (e.gesture.pointerType == "touch") {
                        var velocityX = e.gesture.velocityX;
                        var x = e.gesture.center.x;
                        var leftPos = x - options.menuWidth;
                        var rightPos = x - options.menuWidth / 2;
                        if (leftPos > 0) {
                            leftPos = 0;
                        }
                        if (rightPos < 0) {
                            rightPos = 0;
                        }
                        panning = false;

                        if (options.edge === 'left') {
                            // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
                            if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
                                // Return menu to open
                                if (leftPos !== 0) {
                                    menu_id.velocity({'translateX': [0, leftPos]}, {
                                        duration: 300,
                                        queue: false,
                                        easing: 'easeOutQuad'
                                    });
                                }

                                $('#' + ZDK_STR.SIDENAV_OVERLAY).velocity({opacity: 1}, {
                                    duration: 50,
                                    queue: false,
                                    easing: 'easeOutQuad'
                                });
                                dragTarget.css({width: '50%', right: 0, left: ''});
                                menuOut = true;
                            }
                            else if (!menuOut || velocityX > 0.3) {
                                // Enable Scrolling
                                $('body').css({
                                    overflow: '',
                                    width: ''
                                });
                                // Slide menu closed
                                menu_id.velocity({'translateX': [-1 * options.menuWidth - 10, leftPos]}, {
                                    duration: 200,
                                    queue: false,
                                    easing: 'easeOutQuad'
                                });
                                $('#' + ZDK_STR.SIDENAV_OVERLAY).velocity({opacity: 0}, {
                                    duration: 200, queue: false, easing: 'easeOutQuad',
                                    complete: function () {
                                        $(this).remove();
                                    }
                                });
                                dragTarget.css({width: '10px', right: '', left: 0});
                            }
                        }
                        else {
                            if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {
                                // Return menu to open
                                if (rightPos !== 0) {
                                    menu_id.velocity({'translateX': [0, rightPos]}, {
                                        duration: 300,
                                        queue: false,
                                        easing: 'easeOutQuad'
                                    });
                                }

                                $('#' + ZDK_STR.SIDENAV_OVERLAY).velocity({opacity: 1}, {
                                    duration: 50,
                                    queue: false,
                                    easing: 'easeOutQuad'
                                });
                                dragTarget.css({width: '50%', right: '', left: 0});
                                menuOut = true;
                            }
                            else if (!menuOut || velocityX < -0.3) {
                                // Enable Scrolling
                                $('body').css({
                                    overflow: '',
                                    width: ''
                                });

                                // Slide menu closed
                                menu_id.velocity({'translateX': [options.menuWidth + 10, rightPos]}, {
                                    duration: 200,
                                    queue: false,
                                    easing: 'easeOutQuad'
                                });
                                $('#' + ZDK_STR.SIDENAV_OVERLAY).velocity({opacity: 0}, {
                                    duration: 200, queue: false, easing: 'easeOutQuad',
                                    complete: function () {
                                        $(this).remove();
                                    }
                                });
                                dragTarget.css({width: '10px', right: 0, left: ''});
                            }
                        }

                    }
                });

                $this.click(function () {
                    if (menuOut === true) {
                        menuOut = false;
                        panning = false;
                        removeMenu();
                    }
                    else {

                        // Disable Scrolling
                        var $body = $('body');
                        var oldWidth = $body.innerWidth();
                        $body.css('overflow', 'hidden');
                        $body.width(oldWidth);

                        // Push current drag target on top of DOM tree
                        $body.append(dragTarget);

                        if (options.edge === 'left') {
                            dragTarget.css({width: '50%', right: 0, left: ''});
                            menu_id.velocity({'translateX': [0, -1 * options.menuWidth]}, {
                                duration: 300,
                                queue: false,
                                easing: 'easeOutQuad'
                            });
                        }
                        else {
                            dragTarget.css({width: '50%', right: '', left: 0});
                            menu_id.velocity({'translateX': [0, options.menuWidth]}, {
                                duration: 300,
                                queue: false,
                                easing: 'easeOutQuad'
                            });
                        }

                        var overlay = $(ZDK_STR.SIDENAV_OVERLAY_HTML);
                        overlay.css('opacity', 0)
                            .click(function () {
                                menuOut = false;
                                panning = false;
                                removeMenu();
                                overlay.velocity({opacity: 0}, {
                                    duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function () {
                                        $(this).remove();
                                    }
                                });

                            });
                        $body.append(overlay);
                        overlay.velocity({opacity: 1}, {
                            duration: 300, queue: false, easing: 'easeOutQuad',
                            complete: function () {
                                menuOut = true;
                                panning = false;
                            }
                        });
                    }

                    return false;
                });
            });


        },
        show: function () {
            this.trigger('click');
        },
        hide: function () {
            $('#' + ZDK_STR.SIDENAV_OVERLAY).trigger('click');
        }
    };


    $.fn.sideNav = function (methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.sideNav');
        }
    }; // Plugin end


    $(document).ready(function () {
        $('[data-materialize-init="true"].zdk-button-collapse').sideNav({
            'edge': 'left'
        });
    });
}));
