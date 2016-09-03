/// <reference path="./typings/jquery/jquery.d.ts" />

interface GoodsEventListener extends EventListener {
    data: any;
}

interface GoodsConnectedData {
    status: string;
    session: string;
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
        let session: string = $('input[name="session"]').val(),
            status: string = 'connected',

            data: GoodsConnectedData = {status: status, session: session };

        this.ws.send(JSON.stringify(data));
    }

    private onMessage(evt: GoodsEventListener) {
        let data: void = null,
            message: any = { data: data },
            mondifyLog;

        try {
            message.data = JSON.parse(evt.data);
        } catch (e) {
            message.data = evt;
        }

        $('#total').text(message.data.count);
        mondifyLog = message.data.customer
                     + '---------'
                     + message.data.count;

        $('#cart-history').append($("<li>",
                                    { 'text': mondifyLog }))
    }

    private onClosed(evt: GoodsEventListener) {
        console.log('connect closed');
    }
}


$(function() {
    let goodsClient = new GoodsClient('ws://127.0.0.1:8000/cart/detail');
    goodsClient.loop();

    $("button#add").on("click", function () {
        let session: string = $('input[name="session"]').val();

        //添加货物
        $.ajax({
            'url': '/',
            'type': 'POST',
            'dataType': 'json',
            'data': { 'action': 'add', 'session': session }
        });
    });


    $("button#del").on("click", function () {
        let session: string = $('input[name="session"]').val();

        //取消添加
        $.ajax({
            'url': '/',
            'type': 'POST',
            'dataType': 'json',
            'data': { 'action': 'remove', 'session': session }
        });
    });
});
