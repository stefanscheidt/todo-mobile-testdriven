describe('todo', function () {
    uit.url('../../app/index.html');

    var deferred;
    var someEntryText = 'Entry';

    uit.append(function ($) {
        deferred = $.Deferred();
        spyOn($, 'ajax').andReturn(deferred);
    });

    it('shows todo page when visiting the app', function () {
        uit.runs(function () {
            expect('todoPage').toBeActivePage();
        });
    });

    it('adds new entry to list', function () {
        uit.runs(function () {
            input().val(someEntryText + ' 1').trigger(enter());
            expect(entries().length).toBe(1);
            expect(textOf(entries().eq(0))).toBe(someEntryText + ' 1');
            input().val(someEntryText + ' 2').trigger(enter());
            expect(entries().length).toBe(2);
            expect(textOf(entries().eq(1))).toBe(someEntryText + ' 2');
        });
    });

    it('clears input after enter pressed', function () {
        uit.runs(function () {
            input().val(someEntryText).trigger(enter());
            expect(input().val()).toBe('');
        });
    });

    it('loads data from backend on load', function () {
        uit.runs(function ($) {
            expect($.ajax).toHaveBeenCalledWith('/todo-mobile/store');
        });
    });

    it('updates list with loaded data', function () {
        uit.runs(function () {
            deferred.resolve([
                {text: someEntryText}
            ]);
            expect(entries().length).toBe(1);
            expect(textOf(entries())).toBe(someEntryText);
        });
    });

    it('refreshes list after click on refresh', function () {
        uit.runs(function ($) {
            var refreshed = $.Deferred();

            deferred.resolve([]);
            $.ajax.andReturn(refreshed);

            $('#todoPage_refresh').click();
            expect(entries().length).toBe(0);
            refreshed.resolve([
                {text: someEntryText}
            ]);
            expect(entries().length).toBe(1);
            expect(textOf(entries())).toBe(someEntryText);
        });
    });

    it('shows settings page after click on settings button', function () {
        uit.runs(function ($) {
            $('#todoPage_settings').click();
        });
        uit.runs(function () {
            expect('settingsPage').toBeActivePage();
        });
    });

    function input() {
        return uit.inject(function ($) {
            return $('#todoPage_input');
        });
    }

    function entries() {
        return uit.inject(function ($) {
            return $('#todoPage_list').find('.entry');
        });
    }

    function enter() {
        return uit.inject(function ($) {
            return $.Event('keypress', {keyCode: 13});
        });
    }

    function textOf(element) {
        return uit.inject(function ($) {
            return $.trim(element.text());
        });
    }

});
