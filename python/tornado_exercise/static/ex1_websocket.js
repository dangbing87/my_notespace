var host = "ws://127.0.0.1:8000/websocket/socket";
var ws = new WebSocket(host);
var count = 0;

ws.onopen = function (evt) {
    ws.send(count);
};


ws.onmessage = function(evt) {
    console.log(evt.data);

    if (count < 10) {
        ws.send(count);
        ++count;
    }
};

ws.onerror = function (evt) { };

