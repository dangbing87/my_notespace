/// <reference path="./typings/jquery/jquery.d.ts" />
var host = 'ws://127.0.0.1:8000/websocket_goods', ws = new WebSocket(host);
ws.onopen = function (evt) {
    console.log('connected');
};
ws.onmessage = function (evt) {
    var data = null, message = { data: data };
    try {
        message.data = JSON.parse(evt.data);
    }
    catch (e) {
        message.data = evt;
    }
    $("#total").text(message.data.count);
};
$(function () {
    $("button#add").on("click", function () {
        $.ajax({
            'url': '/',
            'type': 'POST',
            'dataType': 'json',
            'data': { 'action': 'add' }
        });
    });
});
