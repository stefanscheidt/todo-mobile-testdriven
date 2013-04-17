(function() {
    var storeAsString = JSON.stringify([
        {text: 'Have fun!'}
    ]);

    var server = new MockHttpServer();
    server.handle = function (request) {
        if (request.method==="POST") {
            storeAsString = request.requestText;
        }
        request.setResponseHeader("Content-Type", "application/json");
        request.receive(200, storeAsString);
    };
    server.start();
})();