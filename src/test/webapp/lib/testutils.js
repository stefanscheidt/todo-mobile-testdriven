jasmineui.inject(function () {

    // disable transitions and speed up timeout during ui tests for better test performance
    function jqueryMobileSpeedup() {
        // Allow at most 20ms as timeouts.
        var oldTimeout = window.setTimeout;
        window.setTimeout = function (fn, delay) {
            if (delay > 20) {
                delay = 20;
            }
            return oldTimeout.call(this, fn, delay);
        };

        // Disable transitions
        beforeLoad(function () {
            $.mobile.defaultPageTransition = "none";
            $.mobile.defaultDialogTransition = "none";
        });
    }

    jqueryMobileSpeedup();

});
