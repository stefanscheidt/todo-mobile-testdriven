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

        $.ajax('/todo-mobile/store').then(addEntries);
    });

    function addEntry() {
        var index = list.find('.entry').length;
        appendToList(input.val(), index);
        updateUi();
    }

    function addEntries(entries) {
        for (var i = 0; i < entries.length; i++) {
            var index = list.find('.entry').length;
            appendToList(entries[i].text, index);
        }
        updateUi();
    }

    function appendToList(value, index) {
        list.append(entryHtml(value, index));
    }

    function entryHtml(entry, index) {
        return '<input type="checkbox" id="todo' + index + '"><label for="todo' + index + '" class="entry">' + entry + '</label>';
    }

    function updateUi() {
        list.parent().trigger('create');
    }

})(window.jQuery);