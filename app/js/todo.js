(function ($) {
    var input, list, refresh;

    $(function() {
        input = $('#todoPage_input');
        list = $('#todoPage_list');
        refresh = $('#todoPage_refresh');

        input.on("keypress", function (event) {
            if (event.keyCode!==13) {
                return;
            }
            addEntry();
        });

        refresh.on("click", refreshEntries);

        refreshEntries();
    });

    function refreshEntries() {
        list.empty();
        $.ajax('/todo-mobile/store').then(addEntries);
    }

    function addEntry() {
        appendToList(input.val());
        updateUi();
        input.val('');
    }

    function addEntries(entries) {
        for (var i = 0; i < entries.length; i++) {
            appendToList(entries[i].text);
        }
        updateUi();
    }

    function appendToList(entry) {
        var index = list.find('.entry').length;
        list.append(entryHtml(entry, index));
    }

    function entryHtml(entry, index) {
        return '<input type="checkbox" id="todo' + index + '"><label for="todo' + index + '" class="entry">' + entry + '</label>';
    }

    function updateUi() {
        list.parent().trigger('create');
    }

})(window.jQuery);