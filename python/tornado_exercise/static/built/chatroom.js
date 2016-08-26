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
            var senderSession = evt.data.session, data = this.loadsSocketData(evt.data), $messageList = $('#message-list'), dialogue = "<li class='other-user'>\n                                        <dl>\n                                            <dt>" + data.session + "</dt>\n                                            <dd>" + data.content + "</dd>\n                                        </dl>\n                                    </li>";
            if (!(data.session === session)) {
                $messageList.append(dialogue);
                scorllBottom($messageList.parents('div.message-list'));
            }
        };
        Client.prototype.onClosed = function (evt) {
            console.log('connect closed');
        };
        Client.prototype.loadsSocketData = function (data) {
            var context;
            context = $.extend({}, _super.prototype.loadsSocketData.call(this, data));
            return context;
        };
        return Client;
    }(Utils.Client));
    ChatRoom.Client = Client;
    var SendMessage = (function () {
        function SendMessage() {
        }
        SendMessage.prototype.send = function (content) {
            var chatContent;
            chatContent = $.extend({}, { 'content': content, 'session': session });
            $.ajax({
                'url': '/',
                'type': 'POST',
                'dataType': 'json',
                'data': chatContent,
                'success': function (response) {
                    this.successHandler(response, content);
                }.bind(this)
            });
        };
        SendMessage.prototype.successHandler = function (response, content) {
            var $messageTextarea = $('textarea[name="content"]'), $messageList = $('#message-list'), dialogue = "<li class='current-user'>\n                                        <dl>\n                                            <dt>" + session + "</dt>\n                                            <dd>" + content + "</dd>\n                                        </dl>\n                                    </li>";
            if (response.status === 'success') {
                $messageTextarea.val('');
                $messageList.append(dialogue);
                scorllBottom($messageList.parents('div.message-list'));
            }
        };
        return SendMessage;
    }());
    ChatRoom.SendMessage = SendMessage;
    function scorllBottom($ele) {
        var $eleTmp = $ele[0], eleHeight = $eleTmp.scrollHeight;
        $ele.scrollTop(eleHeight);
    }
    ChatRoom.scorllBottom = scorllBottom;
})(ChatRoom || (ChatRoom = {}));
$(function () {
    var host = 'ws://127.0.0.1:8000/chat_room', chatRoom = new ChatRoom.Client(host);
    chatRoom.loop();
    $('form#chatroom').submit(function (e) {
        e.preventDefault();
        var sendMessage = new ChatRoom.SendMessage(), content = $('textarea[name="content"]').val();
        sendMessage.send(content);
    });
});
