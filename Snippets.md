
# Part I: Show todo page and add new entries #

1.  Explain Setup:

    *   Grunt
    *   testutils.js

1.  Start development environment:

        export PHANTOMJS_BIN=./node_modules/.bin/phantomjs
        ./node_modules/.bin/grunt dev

1.  create test/ui/todoUiSpec.js.

1.  implement "shows todo page when visiting the app" and let it fail.

        describe('todo', function () {
            uit.url('../../app/index.html');

            it('shows todo page when visiting the app', function () {
                uit.runs(function() {
                    expect('todoPage').toBeActivePage();
                });
            });

        });

1.  Add todoPage to index.html and let test pass.

1.  Add spec and let it fail. (demo1)

        it('adds new entry to list', function () {
            uit.runs(function($) {
                var someEntryText = 'Entry';
                $('#todoPage_input').val(someEntryText).trigger($.Event('keypress', {keyCode: 13}));
                var entries = $('#todoPage_list').find('.entry');
                expect(entries.length).toBe(1);
                expect(entries.text()).toBe(someEntryText);
            });
        });

1.  Add content to todoPage. (demo2)

        <div data-role="content">
            <input id="todoPage_input" type="text">
            <fieldset id="todoPage_list" data-role="controlgroup">
            </fieldset>
        </div>

1.  Add static entry HTML to fieldset and let test fail.

        <input id="todo1" type="checkbox"><label for="todo1" class="entry">Entry</label>

1.  Debug "trailing spaces bug", fix spec and let test pass.

1.  Make test fail due to static content.

1.  Include app/todo.js and let test pass. (demo3)

        (function ($) {
            'use strict';

            var input, list;

            $(function() {
                input = $('#todoPage_input');
                list = $('#todoPage_list');
                input.on('keypress', function (event) {
                    if (event.keyCode !== 13) {
                        return;
                    }
                    addEntry();
                });
            });

            function addEntry() {
                var index = list.find('.entry').length;
                list.append(entryHtml(input.val(), index));
                list.parent().trigger('create');
            }

            function entryHtml(entry, index) {
                return '<input id="todo' + index + '" type="checkbox"><label for="todo' + index + '" class="entry">' + entry + '</label>';
            }

        })(window.jQuery);

1.  Refactor test.

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

        it('adds new entry to list', function () {
            uit.runs(function ($) {
                var someEntryText = "Entry";
                pressEnterOn(input().val(someEntryText + " 1"));
                expect(entries().length).toBe(1);
                expect(textOf(entries().eq(0))).toBe(someEntryText + " 1");
                pressEnterOn(input().val(someEntryText + " 2"));
                expect(entries().length).toBe(2);
                expect(textOf(entries().eq(1))).toBe(someEntryText + " 2");
            });
        });

1.  Add spec "clears input after enter" and let it fail.

        it('clears input after enter', function () {
            uit.runs(function() {
                pressEnter(input().val(someEntryText));
                expect(input().val()).toBe('');
            });
        });

1.  Make test pass.

# Part II: Load Backend data on load #

1.  Add spec "loads data from backend on load".

        it('loads entries from backend on load', function () {
            uit.runs(function($) {
                expect($.ajax).toHaveBeenCalledWith('/todo-mobile/store');
            });
        });

1.  Add `uit.append`, spy on `$.ajax` and let test fail.

1.  call `$.ajax` and make test pass.

1.  Add deferred and spec and let test fail. (demo4)

        uit.append(function ($) {
            deferred = $.Deferred();
            spyOn($, 'ajax').andReturn(deferred);
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

1.  Handle ajax return with `addEntries` and let test pass. (demo5)

        $(function() {
            // ...
            $.ajax('/todo-mobile/store').then(addEntries);
        });

        function addEntries(entries) {
            var index = list.find('.entry').length;
            for (var i = 0; i < entries.length; i++) {
                list.append(entryHtml(entries[i].text, index + i));
            }
            list.parent().trigger('create');
        }

1.  Refactor `todo.js` and let test pass.

        function addEntry() {
            var index = list.find('.entry').length;
            appendToList(input.val(), index);
            updateUi();
        }

        function addEntries(entries) {
            var index = list.find('.entry').length;
            for(var i = 0; i < entries.length; i++) {
                appendToList(entries[i].text, index + i);
            }
            updateUi();
        }

        function appendToList(value, index) {
            list.append(entryHtml(value, index));
        }

        function updateUi() {
            list.parent().trigger('create');
        }

# Part III: Add settings page and navigation #

1.  Add spec "shows settings page after click on settings" and let it fail.

1.  Add Header to todoPage. (demo6)

        <div data-role="header">
            <h1>Todos</h1>
            <a id="todoPage_settings" href="#settingsPage">Settings</a>
        </div>

1.  Add settingsPage and let tests fail. (demo7)

        <div id="settingsPage" data-role="page">
            <div data-role="header">
                <h1>Settings</h1>
            </div>
        </div>

1.  Fix test and let it pass.
