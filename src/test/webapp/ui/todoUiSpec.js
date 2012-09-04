describeUi('todo', '/todo-mobile', function () {

    var someEntryText = "Entry";
    var deferred;

    beforeLoad(function () {
        deferred = $.Deferred();
        spyOn($, 'ajax').andReturn(deferred);
    });

    it('shows the todo page when visiting the app', function () {
        expect('todoPage').toBeActivePage();
    });

    it('add new entry to list', function () {
        input().val(someEntryText).submit();
        expect(entries().length).toBe(1);
        expect(textOf(entries())).toBe(someEntryText);
    });

    it('adds two new entires to list', function () {
        input().val(someEntryText).submit();
        input().val(someEntryText).submit();
        expect(entries().length).toBe(2);
        expect(textOf(entries().eq(0))).toBe(someEntryText);
        expect(textOf(entries().eq(1))).toBe(someEntryText);
    });

    it('loads entries on load', function () {
        expect($.ajax).toHaveBeenCalledWith('/todo-mobile/store');
    });

    it('updates list with loaded data', function () {
        deferred.resolve([
            {text:someEntryText}
        ]);
        expect(entries().length).toBe(1);
        expect(textOf(entries())).toBe(someEntryText);
    });

    it('shows settings page after click on settings', function () {
        runs(function () {
            // $('#todoPage_settings').click();
            simulate(document.getElementById('todoPage_settings'), 'click');
        });
        runs(function () {
            expect('settingsPage').toBeActivePage();
        });
    });


    function input() {
        return $('#todoPage_input');
    }

    function entries() {
        return $('#todoPage_list .entry');
    }

    function textOf(elements) {
        return $.trim(elements.text());
    }

});