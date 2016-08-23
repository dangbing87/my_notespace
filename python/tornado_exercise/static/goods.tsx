/// <reference path="./typings/jquery/jquery.d.ts" />

interface GoodsEventListener extends EventListener {
    data: any;
}

class GoodsClient {
    private ws: WebSocket;

    constructor(host: string) {
        try {
            this.ws = new WebSocket(host);
        } catch (e) {
            console.log('connect error: ', e);
        }
    }

    public loop() {
        this.ws.onopen = function(evt: EventListener) {
            this.onConnected(evt);
        }.bind(this);

        this.ws.onmessage = function(evt: GoodsEventListener) {
            this.onMessage(evt);
        }.bind(this);

        this.ws.onclose = function(evt: GoodsEventListener) {
            this.onClosed(evt);
        }.bind(this);
    }

    private onConnected(evt: GoodsEventListener) {
        console.log('client connected');
    }

    private onMessage(evt: GoodsEventListener) {
        var data: void = null,
            message: any = { data: data };

        try {
            message.data = JSON.parse(evt.data);
        } catch (e) {
            message.data = evt;
        }

        $("#total").text(message.data.count);
    }

    private onClosed(evt: GoodsEventListener) {
        console.log('client closed');
    }
}


$(function() {
    let goodsClient = new GoodsClient('ws://127.0.0.1:8000/websocket_goods');
    goodsClient.loop();

    $("button#add").on("click", function () {
        //添加货物
        $.ajax({
            'url': '/',
            'type': 'POST',
            'dataType': 'json',
            'data': { 'action': 'add' }
        });
    });


    $("button#del").on("click", function () {
        //取消添加
        $.ajax({
            'url': '/',
            'type': 'POST',
            'dataType': 'json',
            'data': { 'action': 'remove' }
        });
    });
});
