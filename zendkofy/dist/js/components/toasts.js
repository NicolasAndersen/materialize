(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define('material/toasts', ["jquery", "material", "hammerjs", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery, Material, Hammer);
    }
}(function ($, $m, Hammer) {
    'use strict';
    
    var ZDK_STR = {
        TOAST_CONTAINER: 'zdk-toast-container',
        TOAST: 'zdk-toast',
        PANNING: 'zdk-panning',
    };

    $m.toast = function (message, displayLength, className, completeCallback) {
        className = className || "";

        if (!$('#' + ZDK_STR.TOAST_CONTAINER).length) {
            $(document.body).append('<div id="' + ZDK_STR.TOAST_CONTAINER + '"></div>');
        }
        var container = document.getElementById(ZDK_STR.TOAST_CONTAINER);

        // Select and append toast
        var newToast = createToast(message);

        // only append toast if message is not undefined
        if (message) {
            container.appendChild(newToast);
        }

        newToast.style.top = '35px';
        newToast.style.opacity = 0;

        // Animate toast in
        $.Velocity(newToast, {"top": "0px", opacity: 1}, {
            duration: 300,
            easing: 'easeOutCubic',
            queue: false
        });

        // Allows timer to be pause while being panned
        var timeLeft = displayLength;
        var counterInterval = setInterval(function () {


            if (newToast.parentNode === null)
                window.clearInterval(counterInterval);

            // If toast is not being dragged, decrease its time remaining
            if (!newToast.classList.contains(ZDK_STR.PANNING)) {
                timeLeft -= 20;
            }

            if (timeLeft <= 0) {
                // Animate toast out
                $.Velocity(newToast, {"opacity": 0, marginTop: '-40px'}, {
                    duration: 375,
                    easing: 'easeOutExpo',
                    queue: false,
                    complete: function () {
                        // Call the optional callback
                        if (typeof(completeCallback) === "function")
                            completeCallback();
                        // Remove toast after it times out
                        this[0].parentNode.removeChild(this[0]);
                    }
                });
                window.clearInterval(counterInterval);
            }
        }, 20);


        function createToast(html) {

            // Create toast
            var toast = document.createElement('div');
            toast.classList.add(ZDK_STR.TOAST);
            if (className) {
                var classes = className.split(' ');

                for (var i = 0, count = classes.length; i < count; i++) {
                    toast.classList.add(classes[i]);
                }
            }
            // If type of parameter is HTML Element
            if (typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName === "string"
            ) {
                toast.appendChild(html);
            }
            else if (html instanceof jQuery) {
                // Check if it is jQuery object
                toast.appendChild(html[0]);
            }
            else {
                // Insert as text;
                toast.innerHTML = html;
            }
            // Bind hammer
            var hammerHandler = new Hammer(toast, {prevent_default: false});
            hammerHandler.on('pan', function (e) {
                var deltaX = e.deltaX;
                var activationDistance = 80;

                // Change toast state
                if (!toast.classList.contains(ZDK_STR.PANNING)) {
                    toast.classList.add(ZDK_STR.PANNING);
                }

                var opacityPercent = 1 - Math.abs(deltaX / activationDistance);
                if (opacityPercent < 0)
                    opacityPercent = 0;

                $.Velocity(toast, {left: deltaX, opacity: opacityPercent}, {
                    duration: 50,
                    queue: false,
                    easing: 'easeOutQuad'
                });

            });

            hammerHandler.on('panend', function (e) {
                var deltaX = e.deltaX;
                var activationDistance = 80;

                // If toast dragged past activation point
                if (Math.abs(deltaX) > activationDistance) {
                    $.Velocity(toast, {marginTop: '-40px'}, {
                        duration: 375,
                        easing: 'easeOutExpo',
                        queue: false,
                        complete: function () {
                            if (typeof(completeCallback) === "function") {
                                completeCallback();
                            }
                            toast.parentNode.removeChild(toast);
                        }
                    });

                } else {
                    toast.classList.remove(ZDK_STR.PANNING);
                    // Put toast back into original position
                    $.Velocity(toast, {left: 0, opacity: 1}, {
                        duration: 300,
                        easing: 'easeOutExpo',
                        queue: false
                    });

                }
            });

            return toast;
        }
    };
    
    return $m.toast;
}));

