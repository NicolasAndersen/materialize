(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var chipsHandleEvents = false;
    var materialChipsDefaults = {
        data: [],
        placeholder: '',
        secondaryPlaceholder: '',
    };

    var CONST_STRING = {
        CHIPS: 'zdk-chips',
        CHIP: 'zdk-chip',
        SELECTED: 'zdk-selected',
        FOCUS: 'zdk-focus',
        MATERIALIZE_ICON: 'zdk-material-icons',
        CLOSE: 'zdk-close'
    };

    $(document).ready(function () {
        // Handle removal of static chips.
        $(document).on('click', '.zdk-chip .zdk-close', function (e) {
            var $chips = $(this).closest('.zdk-chips');
            if ($chips.data('initialized')) {
                return;
            }
            $(this).closest('.zdk-chip').remove();
        });
    });

    $.fn.material_chip = function (options) {
        var self = this;
        this.$el = $(this);
        this.$document = $(document);
        this.SELS = {
            CHIPS: '.zdk-chips',
            CHIP: '.zdk-chip',
            INPUT: 'input',
            DELETE: '.zdk-material-icons',
            SELECTED_CHIP: '.zdk-selected'
        };

        if ('data' === options) {
            return this.$el.data('chips');
        }

        if ('options' === options) {
            return this.$el.data('options');
        }

        this.$el.data('options', $.extend({}, materialChipsDefaults, options));

        // Initialize
        this.init = function () {
            var i = 0;
            var chips;
            self.$el.each(function () {
                var $chips = $(this);
                if ($chips.data('initialized')) {
                    // Prevent double initialization.
                    return;
                }
                var options = $chips.data('options');
                if (!options.data || !options.data instanceof Array) {
                    options.data = [];
                }
                $chips.data('chips', options.data);
                $chips.data('index', i);
                $chips.data('initialized', true);

                if (!$chips.hasClass(CONST_STRING.CHIPS)) {
                    $chips.addClass(CONST_STRING.CHIPS);
                }

                self.chips($chips);
                i++;
            });
        };

        this.handleEvents = function () {
            var SELS = self.SELS;

            self.$document.on('click', SELS.CHIPS, function (e) {
                $(e.target).find(SELS.INPUT).focus();
            });

            self.$document.on('click', SELS.CHIP, function (e) {
                $(SELS.CHIP).removeClass(CONST_STRING.SELECTED);
                $(this).toggleClass(CONST_STRING.SELECTED);
            });

            self.$document.on('keydown', function (e) {
                if ($(e.target).is('input, textarea')) {
                    return;
                }

                // delete
                var $chip = self.$document.find(SELS.CHIP + SELS.SELECTED_CHIP);
                var $chips = $chip.closest(SELS.CHIPS);
                var length = $chip.siblings(SELS.CHIP).length;
                var index;

                if (!$chip.length) {
                    return;
                }

                if (e.which === 8 || e.which === 46) {
                    e.preventDefault();
                    var chipsIndex = $chips.data('index');

                    index = $chip.index();
                    self.deleteChip(chipsIndex, index, $chips);

                    var selectIndex = null;
                    if ((index + 1) < length) {
                        selectIndex = index;
                    } else if (index === length || (index + 1) === length) {
                        selectIndex = length - 1;
                    }

                    if (selectIndex < 0) selectIndex = null;

                    if (null !== selectIndex) {
                        self.selectChip(chipsIndex, selectIndex, $chips);
                    }
                    if (!length) $chips.find('input').focus();

                    // left
                } else if (e.which === 37) {
                    index = $chip.index() - 1;
                    if (index < 0) {
                        return;
                    }
                    $(SELS.CHIP).removeClass(CONST_STRING.SELECTED);
                    self.selectChip($chips.data('index'), index, $chips);

                    // right
                } else if (e.which === 39) {
                    index = $chip.index() + 1;
                    $(SELS.CHIP).removeClass(CONST_STRING.SELECTED);
                    if (index > length) {
                        $chips.find('input').focus();
                        return;
                    }
                    self.selectChip($chips.data('index'), index, $chips);
                }
            });

            self.$document.on('focusin', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
                $(e.target).closest(SELS.CHIPS).addClass(CONST_STRING.FOCUS);
                $(SELS.CHIP).removeClass(CONST_STRING.SELECTED);
            });

            self.$document.on('focusout', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
                $(e.target).closest(SELS.CHIPS).removeClass(CONST_STRING.FOCUS);
            });

            self.$document.on('keydown', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
                var $target = $(e.target);
                var $chips = $target.closest(SELS.CHIPS);
                var chipsIndex = $chips.data('index');
                var chipsLength = $chips.children(SELS.CHIP).length;

                // enter
                if (13 === e.which) {
                    e.preventDefault();
                    self.addChip(chipsIndex, {tag: $target.val()}, $chips);
                    $target.val('');
                    return;
                }

                // delete or left
                if ((8 === e.keyCode || 37 === e.keyCode) && '' === $target.val() && chipsLength) {
                    self.selectChip(chipsIndex, chipsLength - 1, $chips);
                    $target.blur();
                    return;
                }
            });

            self.$document.on('click', SELS.CHIPS + ' ' + SELS.DELETE, function (e) {
                var $target = $(e.target);
                var $chips = $target.closest(SELS.CHIPS);
                var $chip = $target.closest(SELS.CHIP);
                e.stopPropagation();
                self.deleteChip(
                    $chips.data('index'),
                    $chip.index(),
                    $chips
                );
                $chips.find('input').focus();
            });
        };

        this.chips = function ($chips) {
            var html = '';
            var options = $chips.data('options');
            $chips.data('chips').forEach(function (elem) {
                html += self.renderChip(elem);
            });
            html += '<input class="zdk-input" placeholder="">';
            $chips.html(html);
            self.setPlaceholder($chips);
        };

        this.renderChip = function (elem) {
            if (!elem.tag) return;

            var html = '<div class="' + CONST_STRING.CHIP + '">' + elem.tag;
            if (elem.image) {
                html += ' <img src="' + elem.image + '"> ';
            }
            html += '<i class="' + CONST_STRING.MATERIALIZE_ICON + ' ' + CONST_STRING.CLOSE + '">close</i>';
            html += '</div>';
            return html;
        };

        this.setPlaceholder = function ($chips) {
            var options = $chips.data('options');
            if ($chips.data('chips').length && options.placeholder) {
                $chips.find('input').prop('placeholder', options.placeholder);
            } else if (!$chips.data('chips').length && options.secondaryPlaceholder) {
                $chips.find('input').prop('placeholder', options.secondaryPlaceholder);
            }
        };

        this.isValid = function ($chips, elem) {
            var chips = $chips.data('chips');
            var exists = false;
            for (var i = 0; i < chips.length; i++) {
                if (chips[i].tag === elem.tag) {
                    exists = true;
                    return;
                }
            }
            return '' !== elem.tag && !exists;
        };

        this.addChip = function (chipsIndex, elem, $chips) {
            if (!self.isValid($chips, elem)) {
                return;
            }
            var options = $chips.data('options');
            var chipHtml = self.renderChip(elem);
            $chips.data('chips').push(elem);
            $(chipHtml).insertBefore($chips.find('input'));
            $chips.trigger('chip.add', elem);
            self.setPlaceholder($chips);
        };

        this.deleteChip = function (chipsIndex, chipIndex, $chips) {
            var SELS = self.SELS;
            var chip = $chips.data('chips')[chipIndex];
            $chips.find(SELS.CHIP).eq(chipIndex).remove();
            $chips.data('chips').splice(chipIndex, 1);
            $chips.trigger('chip.delete', chip);
            self.setPlaceholder($chips);
        };

        this.selectChip = function (chipsIndex, chipIndex, $chips) {
            var SELS = self.SELS;
            var $chip = $chips.find(SELS.CHIP).eq(chipIndex);
            if ($chip && false === $chip.hasClass(CONST_STRING.SELECTED)) {
                $chip.addClass(CONST_STRING.SELECTED);
                $chips.trigger('chip.select', $chips.data('chips')[chipIndex]);
            }
        };

        this.getChipsElement = function (index, $chips) {
            return $chips.eq(index);
        };

        // init
        this.init();

        if (!chipsHandleEvents) {
            this.handleEvents();
            chipsHandleEvents = true;
        }
    };
}));