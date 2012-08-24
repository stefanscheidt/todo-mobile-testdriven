jasmineui.inject(function () {

    var oldTimeout = window.setTimeout;
    window.setTimeout = function (fn, delay) {
        if (delay > 20) {
            delay = 20;
        }
        return oldTimeout.call(this, fn, delay);
    };

    beforeEach(function () {
        this.addMatchers({
            toBeActivePage:function () {
                var activePage = $.mobile.activePage;
                return activePage.is(':visible') && activePage.attr('id') === (this.actual);
            }
        });
    });

});
