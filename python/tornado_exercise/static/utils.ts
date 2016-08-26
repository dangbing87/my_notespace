/// <reference path="./typings/jquery/jquery.d.ts" />

namespace Utils {
    export interface WebSocketEvent extends EventListener {
        data: any;
    }

    export abstract class Client {
        ws: WebSocket;

        constructor(host: string) {
            try {
                this.ws = new WebSocket(host);
            } catch (e) {
                console.log('connect error: ', e);
            }
        }

        loop(): void {
            this.ws.onopen = function(evt: EventListener) {
                this.onConnected(evt);
            }.bind(this);

            this.ws.onmessage = function(evt: WebSocketEvent) {
                this.onMessage(evt);
            }.bind(this);

            this.ws.onclose = function(evt: WebSocketEvent) {
                this.onClosed(evt);
            }.bind(this);
        }

        sendMessage(message: any) {
            let messageString: string = '';

            if (message instanceof Object) {
                messageString = JSON.stringify(message);
            }

            this.ws.send(messageString);
        }

        loadsSocketData(data: string): JSON {
            let context: JSON;

            if (typeof(data) === 'string') {
                try {
                    context = JSON.parse(data);
                } catch (e) {
                    console.log(e);
                }
            }

            return context;
        }

        abstract onConnected(evt: WebSocketEvent): void;
        abstract onMessage(evt: WebSocketEvent): void;
        abstract onClosed(evt: WebSocketEvent): void;
    }
}
