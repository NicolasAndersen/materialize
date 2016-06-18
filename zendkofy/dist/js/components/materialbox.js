(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var CONST_STRING = {
        MATERIALBOXED: 'zdk-materialboxed',
        INITIALIZED: 'zdk-initialized',
        MATERIAL_PLACEHOLDER: 'zdk-material-placeholder',
        ACTIVE: 'zdk-active',
        MATERIALBOX_OVERLAY: 'zdk-materialbox-overlay',
        MATERIALBOX_CAPTION: 'zdk-materialbox-caption',
        RESPONSIVE_IMG: 'zdk-responsive-img'
    };

    function calculatePosition(materialbox, windowSize, newSize,  type) {
        if(type === 'left') {
            return $(document).scrollLeft() + windowSize / 2 - materialbox.parent('.' + CONST_STRING.MATERIAL_PLACEHOLDER).offset().left - newSize / 2;
        } else if(type === 'top') {
            return $(document).scrollTop() + windowSize / 2 - materialbox.parent('.' + CONST_STRING.MATERIAL_PLACEHOLDER).offset().top - newSize / 2
        } else {
            return 0;
        }
    }

    $.fn.materialbox = function () {

        return this.each(function () {

            if ($(this).hasClass(CONST_STRING.INITIALIZED)) {
                return;
            }

            $(this).addClass(CONST_STRING.INITIALIZED);

            var overlayActive = false;
            var doneAnimating = true;
            var inDuration = 275;
            var outDuration = 200;
            var origin = $(this);
            var placeholder = $('<div></div>').addClass(CONST_STRING.MATERIAL_PLACEHOLDER);
            var originalWidth = 0;
            var originalHeight = 0;
            var ancestorsChanged;
            var ancestor;
            origin.wrap(placeholder);


            origin.on('click', function () {
                var placeholder = origin.parent('.' + CONST_STRING.MATERIAL_PLACEHOLDER);
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var originalWidth = origin.width();
                var originalHeight = origin.height();


                // If already modal, return to original
                if (doneAnimating === false) {
                    returnToOriginal();
                    return false;
                }
                else if (overlayActive && doneAnimating === true) {
                    returnToOriginal();
                    return false;
                }


                // Set states
                doneAnimating = false;
                origin.addClass(CONST_STRING.ACTIVE);
                overlayActive = true;

                // Set positioning for placeholder
                placeholder.css({
                    width: placeholder[0].getBoundingClientRect().width,
                    height: placeholder[0].getBoundingClientRect().height,
                    position: 'relative',
                    top: 0,
                    left: 0
                });

                // Find ancestor with overflow: hidden; and remove it
                ancestorsChanged = undefined;
                ancestor = placeholder[0].parentNode;
                var count = 0;
                while (ancestor !== null && !$(ancestor).is(document)) {
                    var curr = $(ancestor);
                    if (curr.css('overflow') !== 'visible') {
                        curr.css('overflow', 'visible');
                        if (ancestorsChanged === undefined) {
                            ancestorsChanged = curr;
                        }
                        else {
                            ancestorsChanged = ancestorsChanged.add(curr);
                        }
                    }
                    ancestor = ancestor.parentNode;
                }

                // Set css on origin
                origin.css({position: 'absolute', 'z-index': 1000})
                    .data('width', originalWidth)
                    .data('height', originalHeight);

                // Add overlay
                var overlay = $('<div id="' + CONST_STRING.MATERIALBOX_OVERLAY + '"></div>')
                    .css({
                        opacity: 0
                    })
                    .click(function () {
                        if (doneAnimating === true)
                            returnToOriginal();
                    });
                // Animate Overlay
                // Put before in origin image to preserve z-index layering.
                origin.before(overlay);
                overlay.velocity({opacity: 1},
                    {duration: inDuration, queue: false, easing: 'easeOutQuad'});

                // Add and animate caption if it exists
                if (origin.data('caption') !== "") {
                    var $photo_caption = $('<div class="' + CONST_STRING.MATERIALBOX_CAPTION + '"></div>');
                    $photo_caption.text(origin.data('caption'));
                    $('body').append($photo_caption);
                    $photo_caption.css({"display": "inline"});
                    $photo_caption.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'});
                }

                // Resize Image
                var ratio = 0;
                var widthPercent = originalWidth / windowWidth;
                var heightPercent = originalHeight / windowHeight;
                var newWidth = 0;
                var newHeight = 0;

                if (widthPercent > heightPercent) {
                    ratio = originalHeight / originalWidth;
                    newWidth = windowWidth * 0.9;
                    newHeight = windowWidth * 0.9 * ratio;
                }
                else {
                    ratio = originalWidth / originalHeight;
                    newWidth = (windowHeight * 0.9) * ratio;
                    newHeight = windowHeight * 0.9;
                }

                // Animate image + set z-index
                if (origin.hasClass(CONST_STRING.RESPONSIVE_IMG)) {
                    origin.velocity({'max-width': newWidth, 'width': originalWidth}, {
                        duration: 0, queue: false,
                        complete: function () {
                            origin.css({left: 0, top: 0})
                                .velocity(
                                    {
                                        height: newHeight,
                                        width: newWidth,
                                        left: calculatePosition(origin, windowWidth, newWidth, 'left'),
                                        top: calculatePosition(origin, windowHeight, newHeight, 'top')
                                    },
                                    {
                                        duration: inDuration,
                                        queue: false,
                                        easing: 'easeOutQuad',
                                        complete: function () {
                                            doneAnimating = true;
                                        }
                                    }
                                );
                        } // End Complete
                    }); // End Velocity
                }
                else {
                    origin.css('left', 0)
                        .css('top', 0)
                        .velocity(
                            {
                                height: newHeight,
                                width: newWidth,
                                left: calculatePosition(origin, windowWidth, newWidth, 'left'),
                                top: calculatePosition(origin, windowHeight, newHeight, 'top')
                            },
                            {
                                duration: inDuration,
                                queue: false,
                                easing: 'easeOutQuad',
                                complete: function () {
                                    doneAnimating = true;
                                }
                            }
                        ); // End Velocity
                }

            }); // End origin on click


            // Return on scroll
            $(window).scroll(function () {
                if (overlayActive) {
                    returnToOriginal();
                }
            });

            // Return on ESC
            $(document).keyup(function (e) {

                if (e.keyCode === 27 && doneAnimating === true) {   // ESC key
                    if (overlayActive) {
                        returnToOriginal();
                    }
                }
            });


            // This function returns the modaled image to the original spot
            function returnToOriginal() {

                doneAnimating = false;

                var placeholder = origin.parent('.' + CONST_STRING.MATERIAL_PLACEHOLDER);
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var originalWidth = origin.data('width');
                var originalHeight = origin.data('height');

                origin.velocity("stop", true);

                var $materialboxOverlay = $('#' + CONST_STRING.MATERIALBOX_OVERLAY),
                    $materialboxCaption = $('.' + CONST_STRING.MATERIALBOX_CAPTION);

                $materialboxOverlay.velocity("stop", true);
                $materialboxCaption.velocity("stop", true);


                $materialboxOverlay.velocity({opacity: 0}, {
                    duration: outDuration, // Delay prevents animation overlapping
                    queue: false, easing: 'easeOutQuad',
                    complete: function () {
                        // Remove Overlay
                        overlayActive = false;
                        $(this).remove();
                    }
                });

                // Resize Image
                origin.velocity(
                    {
                        width: originalWidth,
                        height: originalHeight,
                        left: 0,
                        top: 0
                    },
                    {
                        duration: outDuration,
                        queue: false, easing: 'easeOutQuad'
                    }
                );

                // Remove Caption + reset css settings on image
                $materialboxCaption.velocity({opacity: 0}, {
                    duration: outDuration, // Delay prevents animation overlapping
                    queue: false, easing: 'easeOutQuad',
                    complete: function () {
                        placeholder.css({
                            height: '',
                            width: '',
                            position: '',
                            top: '',
                            left: ''
                        });

                        origin.css({
                            height: '',
                            top: '',
                            left: '',
                            width: '',
                            'max-width': '',
                            position: '',
                            'z-index': ''
                        });

                        // Remove class
                        origin.removeClass(CONST_STRING.ACTIVE);
                        doneAnimating = true;
                        $(this).remove();

                        // Remove overflow overrides on ancestors
                        if (ancestorsChanged) {
                            ancestorsChanged.css('overflow', '');
                        }
                    }
                });

            }
        });
    };

    $(document).ready(function () {
        $('[data-materialize-init="true"].' + CONST_STRING.MATERIALBOXED).materialbox();
    });

}));
