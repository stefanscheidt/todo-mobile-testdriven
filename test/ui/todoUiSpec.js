describe('todo', function() {
    uit.url('../../app/index.html');

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

    function pressEnterOn(input) {
        uit.inject(function ($) {
            input.trigger($.Event('keypress', {keyCode: 13}));
        });
    }

    function textOf(element) {
        return uit.inject(function ($) {
            return $.trim(element.text());
        });
    }

    var someEntryText = "Entry";

    it('shows todo page when visiting the app', function() {
        uit.runs(function () {
            expect('todoPage').toBeActivePage();
        });
    });

    it('adds new entry to list', function () {
        uit.runs(function () {
            pressEnterOn(input().val(someEntryText + " 1"));
            expect(entries().length).toBe(1);
            expect(textOf(entries().eq(0))).toBe(someEntryText + " 1");
            pressEnterOn(input().val(someEntryText + " 2"));
            expect(entries().length).toBe(2);
            expect(textOf(entries().eq(1))).toBe(someEntryText + " 2");
        });
    });

    it('clears input after enter pressed', function () {
        uit.runs(function () {
            pressEnterOn(input().val(someEntryText));
            expect(input().val()).toBe('');
        });

    });


});