var host: string = "ws://127.0.0.1:8000/websocket/socket";
var count: number = 0;
var ws = new WebSocket(host);

interface WebSocketMessage {
    data: any;
}

ws.onopen = function(evt: any) {
    ws.send(count++);
}

ws.onmessage = function(evt: any) {
    var data: void = null,
        message: WebSocketMessage = { data: data };

    try {
        message.data = JSON.parse(evt.data);
    } catch (e) {
        message.data = evt;
    }

    console.log(message.data);

    if (count < 10) {
        ws.send(count++);
    } else {
        ws.close();
    }
}
