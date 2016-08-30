/// <reference path="./typings/jquery/jquery.d.ts" />
var GoodsClient = (function () {
    function GoodsClient(host) {
        try {
            this.ws = new WebSocket(host);
        }
        catch (e) {
            console.log('connect error: ', e);
        }
    }
    GoodsClient.prototype.loop = function () {
        this.ws.onopen = function (evt) {
            this.onConnected(evt);
        }.bind(this);
        this.ws.onmessage = function (evt) {
            this.onMessage(evt);
        }.bind(this);
        this.ws.onclose = function (evt) {
            this.onClosed(evt);
        }.bind(this);
    };
    GoodsClient.prototype.onConnected = function (evt) {
        var session = $('input[name="session"]').val(), status = 'connected', data = { status: status, session: session };
        this.ws.send(JSON.stringify(data));
    };
    GoodsClient.prototype.onMessage = function (evt) {
        var data = null, message = { data: data }, mondifyLog;
        try {
            message.data = JSON.parse(evt.data);
        }
        catch (e) {
            message.data = evt;
        }
        $('#total').text(message.data.count);
        mondifyLog = message.data.customer
            + '---------'
            + message.data.count;
        $('#cart-history').append($("<li>", { 'text': mondifyLog }));
    };
    GoodsClient.prototype.onClosed = function (evt) {
        console.log('connect closed');
    };
    return GoodsClient;
})();
$(function () {
    var goodsClient = new GoodsClient('ws://127.0.0.1:8000/cart/detail');
    goodsClient.loop();
    $("button#add").on("click", function () {
        var session = $('input[name="session"]').val();
        //添加货物
        $.ajax({
            'url': '/',
            'type': 'POST',
            'dataType': 'json',
            'data': { 'action': 'add', 'session': session }
        });
    });
    $("button#del").on("click", function () {
        var session = $('input[name="session"]').val();
        //取消添加
        $.ajax({
            'url': '/',
            'type': 'POST',
            'dataType': 'json',
            'data': { 'action': 'remove', 'session': session }
        });
    });
});
