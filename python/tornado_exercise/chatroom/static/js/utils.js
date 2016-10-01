/// <reference path="./typings/jquery/jquery.d.ts" />
var Utils;
(function (Utils) {
    var Client = (function () {
        function Client(host) {
            this.host = host;
        }
        Client.prototype.loop = function () {
            this.connect();
            this.ws.onopen = function () {
                this.onConnected();
            }.bind(this);
            this.ws.onmessage = function (evt) {
                this.onMessage(evt);
            }.bind(this);
            this.ws.onclose = function (error) {
                this.onClosed(error);
            }.bind(this);
        };
        Client.prototype.connect = function () {
            try {
                this.ws = new WebSocket(this.host);
            }
            catch (e) {
                console.log('connect error: ', e);
            }
        };
        Client.prototype.sendMessage = function (message) {
            var messageString = '';
            if (message instanceof Object) {
                messageString = JSON.stringify(message);
            }
            this.ws.send(messageString);
        };
        Client.prototype.loadsSocketData = function (data) {
            var context;
            if (typeof (data) === 'string') {
                try {
                    context = JSON.parse(data);
                }
                catch (e) {
                    console.log(e);
                }
            }
            return context;
        };
        return Client;
    }());
    Utils.Client = Client;
    function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }
    Utils.applyMixins = applyMixins;
})(Utils || (Utils = {}));
