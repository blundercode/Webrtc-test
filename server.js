var express = require('express'),
    port = process.env.PORT || 8000,
    server = express();

// configure middleware starting here



// middleware to send client application to the browser
server.use(express.static(__dirname + '/client'));

// *** all other code should be included before this line *** \\
// catch all route and support for html5mode (no # on client routes)
server.all('/*', function (req, res, next) {
    res.sendFile('index.html', { root: __dirname + '/client' });
});

server.listen(port, function () {
    console.log('server running on port', port);
});