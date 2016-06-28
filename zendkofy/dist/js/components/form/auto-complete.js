(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define('material/form/auto-complete', ["jquery"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    var ZDK_STR = {
        INPUT_FIELD: 'zdk-input-field',
        AUTOCOMPLETE_CONTENT: 'zdk-autocomplete-content',
        DROPDOWN_CONTENT: 'zdk-dropdown-content',
        HIGHLIGHT: 'zdk-highlight',
        RIGHT: 'zdk-right',
        CIRCLE: 'zdk-circle'
    };
    
    $.fn.extend({
        autocomplete: function (options) {
            // Defaults
            var defaults = {
                data: {}
            };

            options = $.extend(defaults, options);

            return this.each(function () {
                var $input = $(this);
                var data = options.data,
                    $inputDiv = $input.closest('.' + ZDK_STR.INPUT_FIELD); // Div to append on

                // Check if data isn't empty
                if (!$.isEmptyObject(data)) {
                    // Create autocomplete element
                    var $autocomplete = $('<ul class="' + ZDK_STR.AUTOCOMPLETE_CONTENT + ' ' + ZDK_STR.DROPDOWN_CONTENT + '"></ul>');

                    // Append autocomplete element
                    if ($inputDiv.length) {
                        $inputDiv.append($autocomplete); // Set ul in body
                    } else {
                        $input.after($autocomplete);
                    }

                    var highlight = function (string, $el) {
                        var img = $el.find('img');
                        var matchStart = $el.text().toLowerCase().indexOf("" + string.toLowerCase() + ""),
                            matchEnd = matchStart + string.length - 1,
                            beforeMatch = $el.text().slice(0, matchStart),
                            matchText = $el.text().slice(matchStart, matchEnd + 1),
                            afterMatch = $el.text().slice(matchEnd + 1);
                        $el.html('<span>' + beforeMatch + '<span class="' + ZDK_STR.HIGHLIGHT + '">' + matchText + '</span>' + afterMatch + '</span>');
                        if (img.length) {
                            $el.prepend(img);
                        }
                    };

                    // Perform search
                    $input.on('keyup', function (e) {
                        // Capture Enter
                        if (e.which === 13) {
                            $autocomplete.find('li').first().click();
                            return;
                        }

                        var val = $input.val().toLowerCase();
                        $autocomplete.empty();

                        // Check if the input isn't empty
                        if (val !== '') {
                            for (var key in data) {
                                if (data.hasOwnProperty(key) &&
                                    key.toLowerCase().indexOf(val) !== -1 &&
                                    key.toLowerCase() !== val) {
                                    var autocompleteOption = $('<li></li>');
                                    if (!!data[key]) {
                                        autocompleteOption.append('<img src="' + data[key] + '" class="' + ZDK_STR.RIGHT + ' ' + ZDK_STR.CIRCLE + '"><span>' + key + '</span>');
                                    } else {
                                        autocompleteOption.append('<span>' + key + '</span>');
                                    }
                                    $autocomplete.append(autocompleteOption);

                                    highlight(val, autocompleteOption);
                                }
                            }
                        }
                    });

                    // Set input value
                    $autocomplete.on('click', 'li', function () {
                        $input.val($(this).text().trim());
                        $autocomplete.empty();
                    });
                }
            });
        }
    });
}));
