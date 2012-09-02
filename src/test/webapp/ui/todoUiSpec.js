describeUi('todo', '/todo-mobile', function () {
    var someEntryText = "Entry";
    var deferred;

    beforeLoad(function () {
        deferred = $.Deferred();
        spyOn($, 'ajax').andReturn(deferred);
    });

    it('shows todo page when visiting the app', function () {
        expect('todoPage').toBeActivePage();
    });

    it('adds new entry to list', function () {
        input().val(someEntryText).submit();
        expect(entries().length).toBe(1);
        expect(textOf(entries())).toBe(someEntryText);
    });

    it('clears input field after submit', function () {
        input().val(someEntryText).submit();
        expect(input().val()).toBe('');
    });

    it('loads entries from backend on load', function () {
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
            $('#todoPage_settings').click();
            // simulate(document.getElementById('todoPage_settings'), 'click');
        });
        /*
        waitsFor(function () {
            return $.mobile.activePage.is(':visible');
        });
        */
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

    function textOf(element) {
        return $.trim(element.text());
    }

});
