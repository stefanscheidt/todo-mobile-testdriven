jasmineui.inject(function () {

    var oldTimeout = window.setTimeout;
    window.setTimeout = function (fn, delay) {
        if (delay > 20) {
            delay = 20;
        }
        return oldTimeout.call(this, fn, delay);
    };

});
