describeUi('todo', '/todo-mobile', function () {
    var defer;
    var todoText = "Some Entry";

    describe('empty remote list', function () {

        beforeLoad(function () {
            defer = deferredWithResult([]);
            spyOn($, 'ajax').andReturn(defer);
        });

        it('should show the todo page when visiting the application', function () {
            expect(activePageId()).toBe('todoPage');
        });

        it('should add new entry to list', function () {
            input().val(todoText).submit();
            expect(entries().length).toBe(1);
            expect(entries().text().trim()).toBe(todoText);
        });
    });

    describe('load from backend', function () {

        beforeLoad(function () {
            defer = deferredWithResult([
                {name:todoText, done:false}
            ]);
            spyOn($, 'ajax').andReturn(defer);
        });

        it('should load entries from backend and update list', function () {
            expect(entries().length).toBe(1);
            expect(entries().text().trim()).toBe(todoText);
        });

    });

    function activePage() {
        return $.mobile.activePage;
    }

    function activePageId() {
        if (activePage() == null) {
            throw new Error("No active page found.");
        }
        return activePage().attr('id');
    }

    function input() {
        return $("#todoPage_input");
    }

    function entries() {
        return $("#todoPage_list .entry");
    }

    function deferredWithResult(result) {
        var defer = $.Deferred();
        defer.resolve(result);
        return defer;
    }

});
