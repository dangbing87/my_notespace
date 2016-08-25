/// <reference path="./typings/jquery/jquery.d.ts" />
var Utils;
(function (Utils) {
    var Client = (function () {
        function Client(host) {
            try {
                this.ws = new WebSocket(host);
            }
            catch (e) {
                console.log('connect error: ', e);
            }
        }
        Client.prototype.loop = function () {
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
        return Client;
    })();
    Utils.Client = Client;
})(Utils || (Utils = {}));
