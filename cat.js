var five = require("johnny-five");
var board = new five.Board();
var server = require('http').createServer(handler);
var io = require('socket.io')(server);
server.listen(8080);

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

var io2 = require('socket.io')(9000);
board.on("ready", function() {
    var xCommand = new five.Servo(8);
    var yCommand = new five.Servo(9);
    var led = new five.Led(10);
    io2.on("connection", function(socket) {
        console.log("connected!");
        socket.on("x", function(x) {
            console.log("x");
            console.log(x);
            led.strobe(500);
            xCommand.to(x);
    });
        socket.on("y", function(y) {
            console.log("y");
            console.log(y);
            led.strobe(500);
            yCommand.to(y);
        });
        socket.on("lightOff", function() {
            console.log("off");
            led.stop().off();
        });
        socket.on("lightOn", function() {
            console.log("on");
            led.strobe(500);
        });
    });
      this.repl.inject({
         xCommand: xCommand,
         yCommand: yCommand,
         led: led
     });
});
