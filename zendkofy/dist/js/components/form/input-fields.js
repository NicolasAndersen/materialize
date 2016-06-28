(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define('material/form/input-fields', ["jquery", "material", "jquery/ui/easing", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery, zMeterial);
    }
}(function ($, $m) {
    'use strict';
    var ZDK_STR = {
        ACTIVE: 'zdk-active',
        INVALID: 'zdk-invalid',
        TABBED: 'zdk-tabbed',
        VALID: 'zdk-valid',
        HIDDENDIV: 'zdk-hiddendiv',
        COMMON: 'zdk-common',
        THUMB: 'zdk-thumb',
        VALUE: 'zdk-value',
        RANGE_FIELD: 'zdk-range-field',
        FILE_PATH: 'zdk-file-path',
        FILE_FIELD: 'zdk-file-field',
        MATERIALIZE_TEXTAREA: 'zdk-materialize-textarea',
        PREFIX: 'zdk-prefix',
        SELECT_DROPDOWN: 'zdk-select-dropdown',
        INITIALIZED: 'zdk-initialized',
        VALIDATE: 'zdk-validate'
    };

    var inutSelectors = [
        'input[type=text]',
        'input[type=password]',
        'input[type=email]',
        'input[type=url]',
        'input[type=tel]',
        'input[type=number]',
        'input[type=search]',
        'textarea'
    ];

    $.each(inutSelectors, function (index, el) {
        inutSelectors[index] += '[data-materialize-init=true]';
    });

    var input_selector = inutSelectors.join(', ');


    // Function to update labels of text fields
    $m.updateTextFields = function () {
        $(input_selector).each(function (index, element) {
            if ($(element).val().length > 0 || element.autofocus || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
                $(this).siblings('label').addClass(ZDK_STR.ACTIVE);
            }
            else {
                $(this).siblings('label').removeClass(ZDK_STR.ACTIVE);
            }
        });
    };

    var validate_field = function (object) {
        var hasLength = object.attr('length') !== undefined;
        var lenAttr = parseInt(object.attr('length'));
        var len = object.val().length;

        if (object.val().length === 0 && object[0].validity.badInput === false) {
            if (object.hasClass(ZDK_STR.VALIDATE)) {
                object.removeClass(ZDK_STR.VALID);
                object.removeClass(ZDK_STR.INVALID);
            }
        }
        else {
            if (object.hasClass(ZDK_STR.VALIDATE)) {
                // Check for character counter attributes
                if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
                    object.removeClass(ZDK_STR.INVALID);
                    object.addClass(ZDK_STR.VALID);
                }
                else {
                    object.removeClass(ZDK_STR.VALID);
                    object.addClass(ZDK_STR.INVALID);
                }
            }
        }
    };

    $(document).ready(function () {
        // Add active if form auto complete
        $(document).on('change', input_selector, function () {
            if ($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
                $(this).siblings('label').addClass(ZDK_STR.ACTIVE);
            }
            validate_field($(this));
        });

        $(document).ready(function () {
            $m.updateTextFields();
        });

        // HTML DOM FORM RESET handling
        $(document).on('reset', function (e) {
            var formReset = $(e.target);
            if (formReset.is('form')) {
                formReset.find(input_selector).removeClass(ZDK_STR.VALID).removeClass(ZDK_STR.INVALID);
                formReset.find(input_selector).each(function () {
                    if ($(this).attr('value') === '') {
                        $(this).siblings('label').removeClass(ZDK_STR.ACTIVE);
                    }
                });

                // Reset select
                formReset.find('select.' + ZDK_STR.INITIALIZED).each(function () {
                    var reset_text = formReset.find('option[selected]').text();
                    formReset.siblings('input.' + ZDK_STR.SELECT_DROPDOWN).val(reset_text);
                });
            }
        });

        // Add active when element has focus
        $(document).on('focus', input_selector, function () {
            $(this).siblings('label, .' + ZDK_STR.PREFIX).addClass(ZDK_STR.ACTIVE);
        });

        $(document).on('blur', input_selector, function () {
            var $inputElement = $(this);
            var selector = "." + ZDK_STR.PREFIX;

            if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
                selector += ", label";
            }

            $inputElement.siblings(selector).removeClass(ZDK_STR.ACTIVE);

            validate_field($inputElement);
        });


        /****************
         *  Checkboxes  *
         ****************/
        var radio_checkbox = 'input[data-materialize-init=true][type=radio], input[data-materialize-init=true][type=checkbox]';
        $(document).on('keyup.radio', radio_checkbox, function (e) {
            // TAB, check if tabbing to radio or checkbox.
            if (e.which === 9) {
                $(this).addClass(ZDK_STR.TABBED);
                var $this = $(this);
                $this.one('blur', function (e) {

                    $(this).removeClass(ZDK_STR.TABBED);
                });
                return;
            }
        });


        /*************************
         *  Textarea Auto Resize *
         *************************/
        var hiddenDiv = $('.' + ZDK_STR.HIDDENDIV).first();
        if (!hiddenDiv.length) {
            hiddenDiv = $('<div class="' + ZDK_STR.HIDDENDIV + ' ' + ZDK_STR.COMMON + '"></div>');
            $('body').append(hiddenDiv);
        }
        var text_area_selector = '[data-materialize-init=true].' + ZDK_STR.MATERIALIZE_TEXTAREA;

        function textareaAutoResize($textarea) {
            // Set font properties of hiddenDiv

            var fontFamily = $textarea.css('font-family');
            var fontSize = $textarea.css('font-size');
            var lineHeight = $textarea.css('line-height');

            if (fontSize) {
                hiddenDiv.css('font-size', fontSize);
            }
            if (fontFamily) {
                hiddenDiv.css('font-family', fontFamily);
            }
            if (lineHeight) {
                hiddenDiv.css('line-height', lineHeight);
            }

            if ($textarea.attr('wrap') === "off") {
                hiddenDiv.css('overflow-wrap', "normal")
                    .css('white-space', "pre");
            }

            hiddenDiv.text($textarea.val() + '\n');
            var content = hiddenDiv.html().replace(/\n/g, '<br>');
            hiddenDiv.html(content);


            // When textarea is hidden, width goes crazy.
            // Approximate with half of window size

            if ($textarea.is(':visible')) {
                hiddenDiv.css('width', $textarea.width());
            }
            else {
                hiddenDiv.css('width', $(window).width() / 2);
            }

            $textarea.css('height', hiddenDiv.height());
        }

        $(text_area_selector).each(function () {
            var $textarea = $(this);
            if ($textarea.val().length) {
                textareaAutoResize($textarea);
            }
        });

        $(document).on('keyup keydown autoresize', text_area_selector, function () {
            textareaAutoResize($(this));
        });

        /********************
         *  File Input Path *
         ********************/
        $(document).on('change', '[data-materialize-init=true].' + ZDK_STR.FILE_FIELD + ' input[type="file"]', function () {
            var file_field = $(this).closest('.' + ZDK_STR.FILE_FIELD);
            var path_input = file_field.find('input.' + ZDK_STR.FILE_PATH);
            var files = $(this)[0].files;
            var file_names = [];
            for (var i = 0; i < files.length; i++) {
                file_names.push(files[i].name);
            }
            path_input.val(file_names.join(", "));
            path_input.trigger('change');
        });

        /****************
         *  Range Input  *
         ****************/
        var range_wrapper = '[data-materialize-init=true].' + ZDK_STR.RANGE_FIELD;
        var range_type = 'input[data-materialize-init=true][type=range]';
        var range_mousedown = false;
        var left;
        var thumbString = '<span class="' + ZDK_STR.THUMB + '"><span class="' + ZDK_STR.VALUE + '"></span></span>';
        
        $(range_type).each(function () {
            $(this).after($(thumbString));
        });

        $(document).on('change', range_type, function (e) {
            var thumb = $(this).siblings('.' + ZDK_STR.THUMB);
            thumb.find('.' + ZDK_STR.VALUE).html($(this).val());
        });

        $(document).on('input mousedown touchstart', range_type, function (e) {
            var thumb = $(this).siblings('.' + ZDK_STR.THUMB);
            var width = $(this).outerWidth();

            // If thumb indicator does not exist yet, create it
            if (thumb.length <= 0) {
                thumb = $(thumbString);
                $(this).after(thumb);
            }

            // Set indicator value
            thumb.find('.' + ZDK_STR.VALUE).html($(this).val());

            range_mousedown = true;
            $(this).addClass(ZDK_STR.ACTIVE);

            if (!thumb.hasClass(ZDK_STR.ACTIVE)) {
                thumb.velocity({height: "30px", width: "30px", top: "-20px", marginLeft: "-15px"}, {
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            }

            if (e.type !== 'input') {
                if (e.pageX === undefined || e.pageX === null) {//mobile
                    left = e.originalEvent.touches[0].pageX - $(this).offset().left;
                }
                else { // desktop
                    left = e.pageX - $(this).offset().left;
                }
                if (left < 0) {
                    left = 0;
                }
                else if (left > width) {
                    left = width;
                }
                thumb.addClass(ZDK_STR.ACTIVE).css('left', left);
            }

            thumb.find('.' + ZDK_STR.VALUE).html($(this).val());
        });

        $(document).on('mouseup touchend', range_wrapper, function () {
            range_mousedown = false;
            $(this).removeClass(ZDK_STR.ACTIVE);
        });

        $(document).on('mousemove touchmove', range_wrapper, function (e) {
            var thumb = $(this).children('.' + ZDK_STR.THUMB);
            var left;
            if (range_mousedown) {
                if (!thumb.hasClass(ZDK_STR.ACTIVE)) {
                    thumb.velocity({height: '30px', width: '30px', top: '-20px', marginLeft: '-15px'}, {
                        duration: 300,
                        easing: 'easeOutExpo'
                    });
                }
                if (e.pageX === undefined || e.pageX === null) { //mobile
                    left = e.originalEvent.touches[0].pageX - $(this).offset().left;
                }
                else { // desktop
                    left = e.pageX - $(this).offset().left;
                }
                var width = $(this).outerWidth();

                if (left < 0) {
                    left = 0;
                }
                else if (left > width) {
                    left = width;
                }
                thumb.addClass(ZDK_STR.ACTIVE).css('left', left);
                thumb.find('.' + ZDK_STR.VALUE).html(thumb.siblings(range_type).val());
            }
        });

        $(document).on('mouseout touchleave', range_wrapper, function () {
            if (!range_mousedown) {

                var thumb = $(this).children('.' + ZDK_STR.THUMB);

                if (thumb.hasClass(ZDK_STR.ACTIVE)) {
                    thumb.velocity({height: '0', width: '0', top: '10px', marginLeft: '-6px'}, {duration: 100});
                }
                thumb.removeClass(ZDK_STR.ACTIVE);
            }
        });
    });
}));
