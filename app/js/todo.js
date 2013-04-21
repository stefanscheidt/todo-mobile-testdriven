(function ($) {
    'use strict';
    var input, list;

    $(function() {
        input = $('#todoPage_input');
        list = $('#todoPage_list');
        input.on("keypress", function (event) {
            if (event.keyCode !== 13) {
                return;
            }
            addEntry();
            input.val('');
        });
    });

    function addEntry() {
        var index = list.find('.entry').length;
        list.append(entryHtml(input.val(), index));
        list.parent().trigger('create');
    }

    function entryHtml(entry, index) {
        return '<input type="checkbox" id="todo' + index + '"><label for="todo' + index + '" class="entry">' + entry + '</label>';
    }

})(window.jQuery);