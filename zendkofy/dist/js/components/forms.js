(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define('material/forms', ["jquery", "material", "jquery/ui/easing", "velocity"], factory);
    } else {

        // Browser globals
        factory(jQuery, zMeterial);
    }
}(function ($, $m) {
    'use strict';
    var ZDK_STR = {
        ACTIVE: 'zdk-active',
        AUTOCOMPLETE_CONTENT: 'zdk-autocomplete-content',
        BROWSER_DEFAULT: 'zdk-browser-default',
        CIRCLE: 'zdk-circle',
        COMMON: 'zdk-common',
        DROPDOWN_CONTENT: 'zdk-dropdown-content',
        HIDDENDIV: 'zdk-hiddendiv',
        HIGHLIGHT: 'zdk-highlight',
        INITIALIZED: 'zdk-initialized',
        INVALID: 'zdk-invalid',
        MATERIALIZE_TEXTAREA: 'zdk-materialize-textarea',
        MULTIPLE_SELECT_DROPDOWN: 'zdk-multiple-select-dropdown',
        PREFIX: 'zdk-prefix',
        RIGHT: 'zdk-right',
        SELECT_DROPDOWN: 'zdk-select-dropdown',
        SELECT_WRAPPER: 'zdk-select-wrapper',
        THUMB: 'zdk-thumb',
        VALID: 'zdk-valid',
        VALIDATE: 'zdk-validate',
        VALUE: 'zdk-value',
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
    });
}));