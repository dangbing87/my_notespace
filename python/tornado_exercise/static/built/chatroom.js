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
        return Client;
    })(Utils.Client);
    ChatRoom.Client = Client;
    function sendMessage(message) {
        var chatContent;
        chatContent = $.extend({}, { 'message': message, 'session': session });
        console.log(chatContent);
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
    $('form#chatroom').submit(function (e) {
        e.preventDefault();
        var message = $('textarea[name="content"]').val();
        ChatRoom.sendMessage(message);
    });
});
