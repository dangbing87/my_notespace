/// <reference path="./typings/jquery/jquery.d.ts" />
/// <reference path="./utils.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChatRoom;
(function (ChatRoom) {
    var session = $('input[name="session"]').val();
    var Client = (function (_super) {
        __extends(Client, _super);
        function Client() {
            _super.apply(this, arguments);
        }
        Client.prototype.onConnected = function (evt) {
            var registerMessage = { 'status': 'register', 'session': session };
            this.sendMessage(registerMessage);
        };
        Client.prototype.onMessage = function (evt) {
            console.log(evt);
        };
        Client.prototype.onClosed = function (evt) {
            console.log('connect closed');
        };
        return Client;
    }(Utils.Client));
    ChatRoom.Client = Client;
    function sendMessage(content) {
        var chatContent;
        chatContent = $.extend({}, { 'content': content, 'session': session });
        $.ajax({
            'url': '/',
            'type': 'POST',
            'dataType': 'json',
            'data': chatContent,
            'success': function (response) {
                console.log(response);
            }
        });
    }
    ChatRoom.sendMessage = sendMessage;
})(ChatRoom || (ChatRoom = {}));
$(function () {
    var host = 'ws://127.0.0.1:8000/chat_room', chatRoom = new ChatRoom.Client(host);
    chatRoom.loop();
    $('form#chatroom').submit(function (e) {
        e.preventDefault();
        var content = $('textarea[name="content"]').val();
        ChatRoom.sendMessage(content);
    });
});
