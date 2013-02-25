
# Part I: Show todo page and add new entries #

1.  create src/test/webapp/ui/todoUiSpec.js

1.  implement 'shows todo page when visiting the app' and let it fail.

        describe('todo', function () {
            uit.url('../../app/index.html');

            it('shows todo page when visiting the app', function () {
                uit.runs(function() {
                    expect('todoPage').toBeActivePage();
                });
            });

        });

1.  *   Add todoPage to index.html and let test pass.
    *   Explain testutils.js.

1.  Add spec and let it fail. (demo1)

        it('adds new entry to list', function () {
            uit.runs(function($) {
                var someEntryText = "Entry";
                $('#todoPage_input').val(someEntryText).submit();
                var entries = $('#todoPage_list .entry');
                expect(entries.length).toBe(1);
                expect(entries.text()).toBe(someEntryText);
            });
        });

1.  Add content to todoPage. (demo2)

        <div data-role="content">
            <form id="todoPage_form" data-ajax="false">
                <input type="text" id="todoPage_input">
            </form>
            <fieldset id="todoPage_list" data-role="controlgroup">
            </fieldset>
        </div>

1.  Add static entry HTML to fieldset and let test fail.

        <input id="todo1" type="checkbox"><label for="todo1" class="entry">Entry</label>

1.  Debug "trailing spaces bug", fix spec and let test pass.

1.  Make test fail due to static content.

1.  Include app/todo.js and let test pass.

        (function ($) {
            var form, input, list;

            $(function() {
                form = $('#todoPage_form');
                input = $('#todoPage_input');
                list = $('#todoPage_list');

                form.submit(function (event) {
                    event.preventDefault();
                    addEntry();
                });

            });

            function addEntry() {
                var index = list.find('.entry').length;
                list.append(entryHtml(input.val(), index));
                list.parent().trigger('create');
            }

            function entryHtml(entry, index) {
                return '<input type="checkbox" id="todo' + index + '"><label for="todo' + index + '" class="entry">' + entry + '</label>';
            }

        })(window.jQuery);

1.  Refactor test.

        function input() {
            return uit.inject(function($) { return $('#todoPage_input'); });
        }

        function entries() {
            return uit.inject(function($) { return $('#todoPage_list .entry'); });
        }

        function textOf(element) {
            return uit.inject(function($) { return $.trim(element.text()); });
        }

1.  Add spec 'clears input after submit' and let it fail.

        it('clears input after submit', function () {
            uit.runs(function() {
                input().val(someEntryText).submit();
                expect(input().val()).toBe('');
            });
        });

1.  Make test pass.

# Part II: Load Backend data on load #

1.  Add spec 'load data from backend on load'.

        it('loads entries from backend on load', function () {
            uit.runs(function($) {
                expect($.ajax).toHaveBeenCalledWith('/todo-mobile/store');
            });
        });

1.  Add `uit.append`, spy on `$.ajax` and let test fail.

1.  call `$.ajax` and make test pass.

1.  Add deferred and spec and let test fail. (demo3)

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

1.  Handle ajax return with `addEntries` and let test pass. (demo4)

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
            list.parent().trigger('create');
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

# Part III: Add settings page and and navigation #

1.  Add spec 'shows settings page after click on settings' and let it fail.

1.  Add Header to todoPage. (demo5)

        <div data-role="header">
            <h1>Todos</h1>
            <a href="#settingsPage" id="todoPage_settings" data-role="button" class="ui-btn-right">Settings</a>
        </div>

1.  Add settingsPage and let tests fail. (demo6)

        <div id="settingsPage" data-role="page">
            <div data-role="header">
                <h1>Settings</h1>
            </div>
        </div>

1.  Fix test and let it pass.
