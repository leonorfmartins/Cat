var server = require('http').createServer(handler);
var io = require('socket.io')(server);

server.listen(9582);

function handler(req, res) {
    res = function (err, data) {
        if (err) {
            return res.end("error");
        }
        if (data) {
            return data;
        }
    };
}
