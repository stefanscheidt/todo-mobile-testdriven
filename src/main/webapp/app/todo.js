(function () {
    var form, input, list;

    $(function() {
        form = $('#todoPage_form');
        input = $('#todoPage_input');
        list = $('#todoPage_list');

        form.submit(function (event) {
            addEntry();
            event.preventDefault();
        });

    });

    function addEntry() {
        append(input.val());
        updateUi();
        input.val('');
    }

    function append(entry) {
        var index = list.find('.entry').length;
        list.append(entryHtml(entry, index));
    }

    function updateUi() {
        list.parent().trigger('create');
    }

    function entryHtml(entry, index) {
        return '<input type="checkbox" id="todo' + index + '"><label for="todo' + index + '" class="entry">' + entry + '</label>';
    }

})();