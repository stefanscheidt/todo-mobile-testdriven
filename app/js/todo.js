(function ($) {
    'use strict';
    var input, list, refresh;

    $(function() {
        input = $('#todoPage_input');
        list = $('#todoPage_list');
        refresh = $('#todoPage_refresh');

        input.on("keypress", function (event) {
            if (event.keyCode !== 13) {
                return;
            }
            addEntry();
            input.val('');
        });

        refresh.on('click', refreshEntries);

        refreshEntries();
    });

    function refreshEntries() {
        $.ajax('/todo-mobile/store').then(addEntries);
    }

    function addEntry() {
        var index = list.find('.entry').length;
        appendToList(input.val(), index);
        updateUi();
    }

    function addEntries(entries) {
        var index = list.find('.entry').length;
        for (var i = 0; i < entries.length; i++) {
            appendToList(entries[i].text, index + i);
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