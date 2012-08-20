(function (window, $) {

    $(function() {
        $('#todoPage_form').submit(function(event) {
            addTodo();
            event.preventDefault();
        });
        $.ajax().then(function (entries) {
            addEntries(entries)
        });
    });

    function addEntries(entries) {
        for(var i = 0, l = entries.length; i < l; i++) {
            append(entries[i].name);
        }
        updateUi();
    }

    function addTodo() {
        append(input().val());
        updateUi();
        input().val('');
    }

    function input() {
        return $('#todoPage_input');
    }

    function list() {
        return $('#todoPage_list');
    }

    function append(entry) {
        list().append(entryTemplate(list().find('input').length, entry));
    }

    function entryTemplate(index, name) {
        return '<input type="checkbox" id="todo' + index + '"/>' +
            '<label for="todo' + index + '" class="entry">' + name + '</label>';
    }

    function updateUi() {
        list().parent().trigger('create');
    }

    window.addEntries = addEntries;
    window.addTodo = addTodo;

})(window, window.jQuery);


