(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define('material/form/material-select', ["jquery", "material", "material/dropdown"], factory);
    } else {

        // Browser globals
        factory(jQuery, zMeterial);
    }
}(function ($, $m) {
    'use strict';
    var ZDK_STR = {
        ACTIVE: 'zdk-active',
        CARET: 'zdk-caret',
        DISABLED: 'zdk-disabled',
        SELECTED: 'zdk-selected',
        OPTGROUP: 'zdk-optgroup',
        OPTGROUP_OPTION: 'zdk-optgroup-option',
        SELECT_WRAPPER: 'zdk-select-wrapper',
        BROWSER_DEFAULT: 'zdk-browser-default',
        INITIALIZED: 'zdk-initialized',
        SELECT_DROPDOWN: 'zdk-select-dropdown',
        DROPDOWN_CONTENT: 'zdk-dropdown-content',
        MULTIPLE_SELECT_DROPDOWN: 'zdk-multiple-select-dropdown'
    };

    $.fn.extend({
        material_select: function (callback) {
            $(this).each(function () {
                var $select = $(this);

                if ($select.hasClass(ZDK_STR.BROWSER_DEFAULT)) {
                    return; // Continue to next (return false breaks out of entire loop)
                }

                var multiple = $select.attr('multiple') ? true : false,
                    lastID = $select.data('select-id'); // Tear down structure if Select needs to be rebuilt

                if (lastID) {
                    $select.parent().find('span.' + ZDK_STR.CARET).remove();
                    $select.parent().find('input').remove();

                    $select.unwrap();
                    $('ul#select-options-' + lastID).remove();
                }

                // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
                if (callback === 'destroy') {
                    $select.data('select-id', null).removeClass(ZDK_STR.INITIALIZED);
                    return;
                }

                var uniqueID = $m.guid();
                $select.data('select-id', uniqueID);
                var wrapper = $('<div class="' + ZDK_STR.SELECT_WRAPPER + '"></div>');
                wrapper.addClass($select.attr('class'));
                var options = $('<ul id="select-options-' + uniqueID + '" class="' + ZDK_STR.DROPDOWN_CONTENT + ' ' + ZDK_STR.SELECT_DROPDOWN + ' ' + (multiple ? ZDK_STR.MULTIPLE_SELECT_DROPDOWN : '') + '"></ul>'),
                    selectChildren = $select.children('option, optgroup'),
                    valuesSelected = [],
                    optionsHover = false;

                var label = $select.find('option:selected').html() || $select.find('option:first').html() || "";

                // Function that renders and appends the option taking into
                // account type and possible image icon.
                var appendOptionWithIcon = function (select, option, type) {
                    // Add disabled attr if disabled
                    var disabled = (option.is(':disabled')) ? 'disabled ' : '',
                        disabledClass = (option.is(':disabled')) ? ZDK_STR.DISABLED + ' ' : '',
                        optgroupClass = (type === 'optgroup-option') ? ZDK_STR.OPTGROUP_OPTION + ' ' : '';

                    // add icons
                    var icon_url = option.data('icon');
                    var classes = option.attr('class');
                    if (!!icon_url) {
                        var classString = '';
                        if (!!classes) classString = ' class="' + classes + '"';

                        // Check for multiple type.
                        if (type === 'multiple') {
                            options.append($('<li class="' + disabledClass + '"><img class="zdk" src="' + icon_url + '"' + classString + '><span class="zdk"><input class="zdk" type="checkbox"' + disabled + '/><label class="zdk"></label>' + option.html() + '</span></li>'));
                        } else {
                            options.append($('<li class="' + disabledClass + optgroupClass + '"><img class="zdk" src="' + icon_url + '"' + classString + '><span class="zdk">' + option.html() + '</span></li>'));
                        }
                        return true;
                    }

                    // Check for multiple type.
                    if (type === 'multiple') {
                        options.append($('<li class="' + disabledClass + '"><span class="zdk"><input class="zdk" type="checkbox"' + disabled + '/><label class="zdk"></label>' + option.html() + '</span></li>'));
                    } else {
                        options.append($('<li class="' + disabledClass + optgroupClass + '"><span class="zdk">' + option.html() + '</span></li>'));
                    }
                };

                /* Create dropdown structure. */
                if (selectChildren.length) {
                    selectChildren.each(function () {
                        if ($(this).is('option')) {
                            // Direct descendant option.
                            if (multiple) {
                                appendOptionWithIcon($select, $(this), 'multiple');

                            } else {
                                appendOptionWithIcon($select, $(this));
                            }
                        } else if ($(this).is('optgroup')) {
                            // Optgroup.
                            var selectOptions = $(this).children('option');
                            options.append($('<li class="' + ZDK_STR.OPTGROUP + '"><span class="zdk">' + $(this).attr('label') + '</span></li>'));

                            selectOptions.each(function () {
                                appendOptionWithIcon($select, $(this), 'optgroup-option');
                            });
                        }
                    });
                }

                options.find('li:not(.' + ZDK_STR.OPTGROUP + ')').each(function (i) {
                    $(this).click(function (e) {
                        // Check if option element is disabled
                        if (!$(this).hasClass(ZDK_STR.DISABLED) && !$(this).hasClass(ZDK_STR.OPTGROUP)) {
                            var selected = true;

                            if (multiple) {
                                $('input[type="checkbox"]', this).prop('checked', function (i, v) {
                                    return !v;
                                });
                                selected = toggleEntryFromArray(valuesSelected, $(this).index(), $select);
                                $newSelect.trigger('focus');
                            } else {
                                options.find('li').removeClass(ZDK_STR.ACTIVE);
                                $(this).toggleClass(ZDK_STR.ACTIVE);
                                $newSelect.val($(this).text());
                            }

                            activateOption(options, $(this));
                            $select.find('option').eq(i).prop('selected', selected);
                            // Trigger onchange() event
                            $select.trigger('change');
                            if (typeof callback !== 'undefined') callback();
                        }

                        e.stopPropagation();
                    });
                });

                // Wrap Elements
                $select.wrap(wrapper);
                // Add Select Display Element
                var dropdownIcon = $('<span class="' + ZDK_STR.CARET + ' zdk">&#9660;</span>');
                if ($select.is(':disabled'))
                    dropdownIcon.addClass(ZDK_STR.DISABLED);

                // escape double quotes
                var sanitizedLabelHtml = label.replace(/"/g, '&quot;');

                var $newSelect = $('<input type="text" class="' + ZDK_STR.SELECT_DROPDOWN + '" readonly="true" ' + (($select.is(':disabled')) ? ZDK_STR.DISABLED : '') + ' data-activates="select-options-' + uniqueID + '" value="' + sanitizedLabelHtml + '"/>');
                $select.before($newSelect);
                $newSelect.before(dropdownIcon);

                $newSelect.after(options);
                // Check if section element is disabled
                if (!$select.is(':disabled')) {
                    $newSelect.dropdown({'hover': false, 'closeOnClick': false});
                }

                // Copy tabindex
                if ($select.attr('tabindex')) {
                    $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
                }

                $select.addClass(ZDK_STR.INITIALIZED);

                $newSelect.on({
                    'focus': function () {
                        if ($('ul.' + ZDK_STR.SELECT_DROPDOWN).not(options[0]).is(':visible')) {
                            $('input.' + ZDK_STR.SELECT_DROPDOWN).trigger('close');
                        }
                        if (!options.is(':visible')) {
                            $(this).trigger('open', ['focus']);
                            var label = $(this).val();
                            var selectedOption = options.find('li').filter(function () {
                                return $(this).text().toLowerCase() === label.toLowerCase();
                            })[0];
                            activateOption(options, selectedOption);
                        }
                    },
                    'click': function (e) {
                        e.stopPropagation();
                    }
                });

                $newSelect.on('blur', function () {
                    if (!multiple) {
                        $(this).trigger('close');
                    }
                    options.find('li.' + ZDK_STR.SELECTED).removeClass(ZDK_STR.SELECTED);
                });

                options.hover(function () {
                    optionsHover = true;
                }, function () {
                    optionsHover = false;
                });

                $(window).on({
                    'click': function () {
                        multiple && (optionsHover || $newSelect.trigger('close'));
                    }
                });

                // Add initial multiple selections.
                if (multiple) {
                    $select.find("option:selected:not(:disabled)").each(function () {
                        var index = $(this).index();

                        toggleEntryFromArray(valuesSelected, index, $select);
                        options.find("li").eq(index).find(":checkbox").prop("checked", true);
                    });
                }

                // Make option as selected and scroll to selected position
                var activateOption = function (collection, newOption) {
                    if (newOption) {
                        collection.find('li.' + ZDK_STR.SELECTED).removeClass(ZDK_STR.SELECTED);
                        var option = $(newOption);
                        option.addClass(ZDK_STR.SELECTED);
                        options.scrollTo(option);
                    }
                };

                // Allow user to search by typing
                // this array is cleared after 1 second
                var filterQuery = [],
                    onKeyDown = function (e) {
                        // TAB - switch to another input
                        if (e.which == 9) {
                            $newSelect.trigger('close');
                            return;
                        }

                        // ARROW DOWN WHEN SELECT IS CLOSED - open select options
                        if (e.which == 40 && !options.is(':visible')) {
                            $newSelect.trigger('open');
                            return;
                        }

                        // ENTER WHEN SELECT IS CLOSED - submit form
                        if (e.which == 13 && !options.is(':visible')) {
                            return;
                        }

                        e.preventDefault();

                        // CASE WHEN USER TYPE LETTERS
                        var letter = String.fromCharCode(e.which).toLowerCase(),
                            nonLetters = [9, 13, 27, 38, 40];
                        if (letter && (nonLetters.indexOf(e.which) === -1)) {
                            filterQuery.push(letter);

                            var string = filterQuery.join(''),
                                newOption = options.find('li').filter(function () {
                                    return $(this).text().toLowerCase().indexOf(string) === 0;
                                })[0];

                            if (newOption) {
                                activateOption(options, newOption);
                            }
                        }

                        // ENTER - select option and close when select options are opened
                        if (e.which == 13) {
                            var activeOption = options.find('li.' + ZDK_STR.SELECTED + ':not(.' + ZDK_STR.DISABLED + ')')[0];
                            if (activeOption) {
                                $(activeOption).trigger('click');
                                if (!multiple) {
                                    $newSelect.trigger('close');
                                }
                            }
                        }

                        // ARROW DOWN - move to next not disabled option
                        if (e.which == 40) {
                            if (options.find('li.' + ZDK_STR.SELECTED).length) {
                                newOption = options.find('li.' + ZDK_STR.SELECTED).next('li:not(.' + ZDK_STR.DISABLED + ')')[0];
                            } else {
                                newOption = options.find('li:not(.' + ZDK_STR.DISABLED + ')')[0];
                            }
                            activateOption(options, newOption);
                        }

                        // ESC - close options
                        if (e.which == 27) {
                            $newSelect.trigger('close');
                        }

                        // ARROW UP - move to previous not disabled option
                        if (e.which == 38) {
                            newOption = options.find('li.' + ZDK_STR.SELECTED).prev('li:not(.' + ZDK_STR.DISABLED + ')')[0];
                            if (newOption)
                                activateOption(options, newOption);
                        }

                        // Automaticaly clean filter query so user can search again by starting letters
                        setTimeout(function () {
                            filterQuery = [];
                        }, 1000);
                    };

                $newSelect.on('keydown', onKeyDown);
            });

            function toggleEntryFromArray(entriesArray, entryIndex, select) {
                var index = entriesArray.indexOf(entryIndex),
                    notAdded = index === -1;

                if (notAdded) {
                    entriesArray.push(entryIndex);
                } else {
                    entriesArray.splice(index, 1);
                }

                select.siblings('ul.' + ZDK_STR.DROPDOWN_CONTENT).find('li').eq(entryIndex).toggleClass(ZDK_STR.ACTIVE);

                // use notAdded instead of true (to detect if the option is selected or not)
                select.find('option').eq(entryIndex).prop('selected', notAdded);
                setValueToInput(entriesArray, select);

                return notAdded;
            }

            function setValueToInput(entriesArray, select) {
                var value = '';

                for (var i = 0, count = entriesArray.length; i < count; i++) {
                    var text = select.find('option').eq(entriesArray[i]).text();

                    i === 0 ? value += text : value += ', ' + text;
                }

                if (value === '') {
                    value = select.find('option:disabled').eq(0).text();
                }

                select.siblings('input.' + ZDK_STR.SELECT_DROPDOWN).val(value);
            }
        }
    });

    $(document).ready(function ($) {
        $('select[data-materialize-init=true].material-select').not('.disabled').material_select();
    });
}));
