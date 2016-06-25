(function (factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define('material/scrollFire', ["jquery", "zendkofy"], factory);
  } else {

    // Browser globals
    factory(jQuery);
  }
}(function ($, $z) {
  'use strict';

  // Input: Array of JSON objects {selector, offset, callback}

  $z.scrollFire = function(options) {

    var didScroll = false;

    window.addEventListener("scroll", function() {
      didScroll = true;
    });

    // Rate limit to 100ms
    setInterval(function() {
      if(didScroll) {
        didScroll = false;

        var windowScroll = window.pageYOffset + window.innerHeight;
          // console.log(didScroll);
          // console.log(windowScroll);

        for (var i = 0 ; i < options.length; i++) {
          // Get options from each line
          var value = options[i];
          var selector = value.selector,
              offset = value.offset,
              callback = value.callback;

          var currentElement = document.querySelector(selector);

          if ( currentElement !== null) {
            var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;
              console.log(currentElement);
              console.log(selector);
              console.log(windowScroll);
              console.log(elementOffset + offset);
              console.log(windowScroll > (elementOffset + offset));

            if (windowScroll > (elementOffset + offset)) {
              if (value.done !== true) {
                if (typeof(callback) === 'function') {
                  callback.call(this, currentElement);
                } else if (typeof(callback) === 'string') {
                  var callbackFunc = new Function(callback);
                  callbackFunc(currentElement);
                }
                value.done = true;
              }
            }
          }
        }
      }
    }, 100);
  };

}));
