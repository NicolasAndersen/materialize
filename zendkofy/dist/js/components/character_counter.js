(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define('material/character_counter', ["jquery"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var ZDK_STR = {
        CHARACTER_COUNTER: 'zdk-character-counter',
        VALID: 'zdk-valid',
        INVALID: 'zdk-invalid',
    };

    $.fn.characterCounter = function () {
        return this.each(function () {
            var $input = $(this);
            var $counterElement = $input.parent().find('span[class="' + ZDK_STR.CHARACTER_COUNTER + '"]');

            // character counter has already been added appended to the parent container
            if ($counterElement.length) {
                return;
            }

            var itHasLengthAttribute = $input.attr('length') !== undefined;

            if (itHasLengthAttribute) {
                $input.on('input', updateCounter);
                $input.on('focus', updateCounter);
                $input.on('blur', removeCounterElement);

                addCounterElement($input);
            }

        });
    };

    function updateCounter() {
        var maxLength = +$(this).attr('length'),
            actualLength = +$(this).val().length,
            isValidLength = actualLength <= maxLength;

        $(this).parent().find('span[class="' + ZDK_STR.CHARACTER_COUNTER + '"]')
            .html(actualLength + '/' + maxLength);

        addInputStyle(isValidLength, $(this));
    }

    function addCounterElement($input) {
        var $counterElement = $input.parent().find('span[class="' + ZDK_STR.CHARACTER_COUNTER + '"]');

        if ($counterElement.length) {
            return;
        }

        $counterElement = $('<span/>')
            .addClass(ZDK_STR.CHARACTER_COUNTER)
            .css('float', 'right')
            .css('font-size', '12px')
            .css('height', 1);

        $input.parent().append($counterElement);
    }

    function removeCounterElement() {
        $(this).parent().find('span[class="' + ZDK_STR.CHARACTER_COUNTER + '"]').html('');
    }

    function addInputStyle(isValidLength, $input) {
        var inputHasInvalidClass = $input.hasClass(ZDK_STR.INVALID);
        if (isValidLength && inputHasInvalidClass) {
            $input.removeClass(ZDK_STR.INVALID);
        }
        else if (!isValidLength && !inputHasInvalidClass) {
            $input.removeClass(ZDK_STR.VALID);
            $input.addClass(ZDK_STR.INVALID);
        }
    }

    $(document).ready(function () {
        $('input, textarea').characterCounter();
    });

}));