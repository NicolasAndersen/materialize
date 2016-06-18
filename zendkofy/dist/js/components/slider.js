(function (factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(["jquery", "jquery/hammer", "velocity"], factory);
  } else {

    // Browser globals
    factory(jQuery);
  }
}(function ($) {
    'use strict';

    var ZDK_STR = {
        SLIDER: 'zdk-slider',
        SLIDES: 'zdk-slides',
        ACTIVE: 'zdk-active',
        CAPTION: 'zdk-caption',
        INDICATORS: 'zdk-indicators',
        INDICATOR_ITEM: 'zdk-indicator-item',
        FULLSCREEN: 'zdk-fullscreen',
        CENTER_ALIGN: 'zdk-center-align',
        RIGHT_ALIGN: 'zdk-right-align',
        LEFT_ALIGN: 'zdk-left-align'
    };

    var methods = {

        init : function(options) {
            var defaults = {
                indicators: true,
                height: 400,
                transition: 500,
                interval: 6000
            };
            options = $.extend(defaults, options);
            return this.each(function() {

                // For each slider, we want to keep track of
                // which slide is active and its associated content
                var $this = $(this);
                var $slider = $this.find('ul.' + ZDK_STR.SLIDES).first();
                var $slides = $slider.find('> li');
                var $active_index = $slider.find('.' + ZDK_STR.ACTIVE).index();
                var $active, $indicators, $interval;
                if ($active_index != -1) { $active = $slides.eq($active_index); }
                

                // Transitions the caption depending on alignment
                function captionTransition(caption, duration) {
                    if (caption.hasClass(ZDK_STR.CENTER_ALIGN)) {
                        caption.velocity({opacity: 0, translateY: -100}, {duration: duration, queue: false});
                    }
                    else if (caption.hasClass(ZDK_STR.RIGHT_ALIGN)) {
                        caption.velocity({opacity: 0, translateX: 100}, {duration: duration, queue: false});
                    }
                    else if (caption.hasClass(ZDK_STR.LEFT_ALIGN)) {
                        caption.velocity({opacity: 0, translateX: -100}, {duration: duration, queue: false});
                    }
                }

                // This function will transition the slide to any index of the next slide
                function moveToSlide(index) {
                    // Wrap around indices.
                    if (index >= $slides.length) index = 0;
                    else if (index < 0) index = $slides.length -1;

                    $active_index = $slider.find('.' + ZDK_STR.ACTIVE).index();

                    // Only do if index changes
                    if ($active_index != index) {
                        $active = $slides.eq($active_index);
                        var $caption = $active.find('.' + ZDK_STR.CAPTION);

                        $active.removeClass(ZDK_STR.ACTIVE);
                        $active.velocity({opacity: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad',
                            complete: function() {
                                $slides.not('.' + ZDK_STR.ACTIVE).velocity({opacity: 0, translateX: 0, translateY: 0}, {duration: 0, queue: false});
                            } });
                        captionTransition($caption, options.transition);


                        // Update indicators
                        if (options.indicators) {
                            $indicators.eq($active_index).removeClass(ZDK_STR.ACTIVE);
                        }

                        $slides.eq(index).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
                        $slides.eq(index).find('.' + ZDK_STR.CAPTION).velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});
                        $slides.eq(index).addClass(ZDK_STR.ACTIVE);


                        // Update indicators
                        if (options.indicators) {
                            $indicators.eq(index).addClass(ZDK_STR.ACTIVE);
                        }
                    }
                }

                // Set height of slider
                // If fullscreen, do nothing
                if (!$this.hasClass(ZDK_STR.FULLSCREEN)) {
                    if (options.indicators) {
                        // Add height if indicators are present
                        $this.height(options.height + 40);
                    }
                    else {
                        $this.height(options.height);
                    }
                    $slider.height(options.height);
                }


                // Set initial positions of captions
                $slides.find('.' + ZDK_STR.CAPTION).each(function () {
                    captionTransition($(this), 0);
                });

                // Move img src into background-image
                $slides.find('img').each(function () {
                    var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
                    if ($(this).attr('src') !== placeholderBase64) {
                        $(this).css('background-image', 'url(' + $(this).attr('src') + ')' );
                        $(this).attr('src', placeholderBase64);
                    }
                });

                // dynamically add indicators
                if (options.indicators) {
                    $indicators = $('<ul class="' + ZDK_STR.INDICATORS + '"></ul>');
                    $slides.each(function( index ) {
                        var $indicator = $('<li class="' + ZDK_STR.INDICATOR_ITEM + '"></li>');

                        // Handle clicks on indicators
                        $indicator.click(function () {
                            var $parent = $slider.parent();
                            var curr_index = $parent.find($(this)).index();
                            moveToSlide(curr_index);

                            // reset interval
                            clearInterval($interval);
                            $interval = setInterval(
                                function(){
                                    $active_index = $slider.find('.' + ZDK_STR.ACTIVE).index();
                                    if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                                    else $active_index += 1;

                                    moveToSlide($active_index);

                                }, options.transition + options.interval
                            );
                        });
                        $indicators.append($indicator);
                    });
                    $this.append($indicators);
                    $indicators = $this.find('ul.' + ZDK_STR.INDICATORS).find('li.' + ZDK_STR.INDICATOR_ITEM);
                }

                if ($active) {
                    $active.show();
                }
                else {
                    $slides.first().addClass(ZDK_STR.ACTIVE).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});

                    $active_index = 0;
                    $active = $slides.eq($active_index);

                    // Update indicators
                    if (options.indicators) {
                        $indicators.eq($active_index).addClass(ZDK_STR.ACTIVE);
                    }
                }

                // Adjust height to current slide
                $active.find('img').each(function() {
                    $active.find('.' + ZDK_STR.CAPTION).velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
                });

                // auto scroll
                $interval = setInterval(
                    function(){
                        $active_index = $slider.find('.' + ZDK_STR.ACTIVE).index();
                        moveToSlide($active_index + 1);

                    }, options.transition + options.interval
                );


                // HammerJS, Swipe navigation

                // Touch Event
                var panning = false;
                var swipeLeft = false;
                var swipeRight = false;

                $this.hammer({
                    prevent_default: false
                }).bind('pan', function(e) {
                    if (e.gesture.pointerType === "touch") {

                        // reset interval
                        clearInterval($interval);

                        var direction = e.gesture.direction;
                        var x = e.gesture.deltaX;
                        var velocityX = e.gesture.velocityX;

                        var $curr_slide = $slider.find('.' + ZDK_STR.ACTIVE);
                        $curr_slide.velocity({ translateX: x
                        }, {duration: 50, queue: false, easing: 'easeOutQuad'});

                        // Swipe Left
                        if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
                            swipeRight = true;
                        }
                        // Swipe Right
                        else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
                            swipeLeft = true;
                        }

                        // Make Slide Behind active slide visible
                        var next_slide;
                        if (swipeLeft) {
                            next_slide = $curr_slide.next();
                            if (next_slide.length === 0) {
                                next_slide = $slides.first();
                            }
                            next_slide.velocity({ opacity: 1
                            }, {duration: 300, queue: false, easing: 'easeOutQuad'});
                        }
                        if (swipeRight) {
                            next_slide = $curr_slide.prev();
                            if (next_slide.length === 0) {
                                next_slide = $slides.last();
                            }
                            next_slide.velocity({ opacity: 1
                            }, {duration: 300, queue: false, easing: 'easeOutQuad'});
                        }


                    }

                }).bind('panend', function(e) {
                    if (e.gesture.pointerType === "touch") {

                        var $curr_slide = $slider.find('.' + ZDK_STR.ACTIVE);
                        panning = false;
                        var curr_index = $slider.find('.' + ZDK_STR.ACTIVE).index();

                        if (!swipeRight && !swipeLeft || $slides.length <=1) {
                            // Return to original spot
                            $curr_slide.velocity({ translateX: 0
                            }, {duration: 300, queue: false, easing: 'easeOutQuad'});
                        }
                        else if (swipeLeft) {
                            moveToSlide(curr_index + 1);
                            $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                complete: function() {
                                    $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                } });
                        }
                        else if (swipeRight) {
                            moveToSlide(curr_index - 1);
                            $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                complete: function() {
                                    $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                } });
                        }
                        swipeLeft = false;
                        swipeRight = false;

                        // Restart interval
                        clearInterval($interval);
                        $interval = setInterval(
                            function(){
                                $active_index = $slider.find('.' + ZDK_STR.ACTIVE).index();
                                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                                else $active_index += 1;

                                moveToSlide($active_index);

                            }, options.transition + options.interval
                        );
                    }
                });

                $this.on('sliderPause', function() {
                    clearInterval($interval);
                });

                $this.on('sliderStart', function() {
                    clearInterval($interval);
                    $interval = setInterval(
                        function(){
                            $active_index = $slider.find('.' + ZDK_STR.ACTIVE).index();
                            if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                            else $active_index += 1;

                            moveToSlide($active_index);

                        }, options.transition + options.interval
                    );
                });

                $this.on('sliderNext', function() {
                    $active_index = $slider.find('.' + ZDK_STR.ACTIVE).index();
                    moveToSlide($active_index + 1);
                });

                $this.on('sliderPrev', function() {
                    $active_index = $slider.find('.' + ZDK_STR.ACTIVE).index();
                    moveToSlide($active_index - 1);
                });

            });



        },
        pause : function() {
            $(this).trigger('sliderPause');
        },
        start : function() {
            $(this).trigger('sliderStart');
        },
        next : function() {
            $(this).trigger('sliderNext');
        },
        prev : function() {
            $(this).trigger('sliderPrev');
        }
    };


    $.fn.slider = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
        }
    }; // Plugin end


    $(document).ready(function () {
        $('[data-materialize-init=true].' + ZDK_STR.SLIDER).slider({full_width: true});
    });
}));
