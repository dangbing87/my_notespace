/// <reference path="./typings/jquery/jquery.d.ts" />

namespace Utils {
    export abstract class Client {
        ws: WebSocket;
        host: string;

        constructor(host: string) {
            this.host = host;
        }

        loop(): void {
            this.connect();

            this.ws.onopen = function() {
                this.onConnected();
            }.bind(this);

            this.ws.onmessage = function(evt: MessageEvent) {
                this.onMessage(evt);
            }.bind(this);

            this.ws.onclose = function(error: CloseEvent) {
                this.onClosed(error);
            }.bind(this);
        }

        connect(): void {
            try {
                this.ws = new WebSocket(this.host);
            } catch (e) {
                console.log('connect error: ', e);
            }
        }

        sendMessage(message: any): void {
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

        abstract onConnected(): void;
        abstract onMessage(evt: MessageEvent): void;
        abstract onClosed(error: CloseEvent): void;
    }

    export function applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }
}
