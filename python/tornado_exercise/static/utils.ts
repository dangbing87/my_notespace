/// <reference path="./typings/jquery/jquery.d.ts" />

namespace Utils {
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

            this.ws.onmessage = function(evt: MessageEvent) {
                this.onMessage(evt);
            }.bind(this);

            this.ws.onclose = function(evt: CloseEvent) {
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

        abstract onConnected(evt: Event): void;
        abstract onMessage(evt: MessageEvent): void;
        abstract onClosed(evt: CloseEvent): void;
    }
}
