describeUi('todo', '/todo-mobile', function() {
    var someEntryText = "Entry";

    it('shows todo page when visiting the app', function () {
        expect('todoPage').toBeActivePage();
    });
    it('add new entry to list', function () {
        input().val(someEntryText).submit();
        expect(entries().length).toBe(1);
        expect(textOf(entries())).toBe(someEntryText);
    });

    it('clears input field after submit', function () {
        input().val(someEntryText).submit();
        expect(input().val()).toBe('');
    });

    function input() {
        return $('#todoPage_input');
    }

    function entries() {
        return $('#todoPage_list .entry');
    }

    function textOf(element) {
        return $.trim(element.text());
    }

});
