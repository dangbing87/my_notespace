var host = "ws://127.0.0.1:8000/websocket/socket";
var count = 0;
var ws = new WebSocket(host);
ws.onopen = function (evt) {
    ws.send(count++);
};
ws.onmessage = function (evt) {
    var data = null, message = { data: data };
    try {
        message.data = JSON.parse(evt.data);
    }
    catch (e) {
        message.data = evt;
    }
    console.log(message.data);
    if (count < 10) {
        ws.send(count++);
    }
    else {
        ws.close();
    }
};
