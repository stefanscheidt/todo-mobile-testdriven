var uit = uitest.current;
uit.feature("xhrSensor", "timeoutSensor", "intervalSensor", "jqmAnimationSensor", "mobileViewport");
// uit.feature("cacheBuster");

// add custom matcher toBeActivePage
beforeEach(function () {
    this.addMatchers({
        toBeActivePage:function () {
            var self = this;
            return uit.inject(function($) {
                var activePage = $.mobile.activePage;
                return activePage.is(':visible') && activePage.attr('id') === (self.actual);
            });
        }
    });
});

uit.prepend(function(window) {
    // speedup jQuery Mobile page load for UI tests
    var oldTimeout = window.setTimeout;
    window.setTimeout = function (fn, delay) {
        if (delay > 20) {
            delay = 20;
        }
        return oldTimeout.call(this, fn, delay);
    };
});
