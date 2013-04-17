describe('todo', function() {
    var uit = uitest.current,
        someEntryText = "Entry",
        deferred;

    uit.url('../../app/index.html');

    uit.append(function ($) {
        deferred = $.Deferred();
        spyOn($, 'ajax').andReturn(deferred);
    });

    it('shows todo page when visiting the app', function () {
        uit.runs(function() {
            expect('todoPage').toBeActivePage();
        });
    });

    it('adds new entry to list', function () {
        uit.runs(function() {
            pressEnter(input().val(someEntryText));
            expect(entries().length).toBe(1);
            expect(textOf(entries())).toBe(someEntryText);
        });
    });

    it('clears input field after enter', function () {
        uit.runs(function() {
            pressEnter(input().val(someEntryText));
            expect(input().val()).toBe('');
        });
    });

    it('loads entries from backend on load', function () {
        uit.runs(function($) {
            expect($.ajax).toHaveBeenCalledWith('/todo-mobile/store');
        });
    });

    it('updates list with loaded data', function () {
        uit.runs(function() {
            deferred.resolve([
                {text:someEntryText}
            ]);
            expect(entries().length).toBe(1);
            expect(textOf(entries())).toBe(someEntryText);
        });
    });

    it('shows settings page after click on settings', function () {
        uit.runs(function ($) {
            $('#todoPage_settings').click();
        });
        uit.runs(function () {
            expect('settingsPage').toBeActivePage();
        });
    });

    function pressEnter(input) {
        uit.inject(function($) {
            input.trigger($.Event("keypress", {keyCode: 13}));
        });
    }

    function input() {
        return uit.inject(function($) { return $('#todoPage_input'); });
    }

    function entries() {
        return uit.inject(function($) { return $('#todoPage_list').find('.entry'); });
    }

    function textOf(element) {
        return uit.inject(function($) { return $.trim(element.text()); });
    }

});
