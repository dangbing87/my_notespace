/// <reference path="./typings/jquery/jquery.d.ts" />
/// <reference path="./utils.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChatRoom;
(function (ChatRoom_1) {
    var session = $('input[name="session"]').val();
    (function (ServerMessageCode) {
        ServerMessageCode[ServerMessageCode["messageList"] = 0] = "messageList";
        ServerMessageCode[ServerMessageCode["onlineSessionList"] = 1] = "onlineSessionList";
    })(ChatRoom_1.ServerMessageCode || (ChatRoom_1.ServerMessageCode = {}));
    var ServerMessageCode = ChatRoom_1.ServerMessageCode;
    var ChatRoom = (function () {
        function ChatRoom() {
        }
        ChatRoom.prototype.dispatcher = function (data) {
            switch (data.code) {
                case ServerMessageCode.messageList:
                    this.displayMessageList(data);
                    break;
                case ServerMessageCode.onlineSessionList:
                    this.displayOnlineList(data);
                    break;
                default:
                    break;
            }
        };
        ChatRoom.prototype.displayOnlineList = function (data) {
            var $onlineList = $('#online-list'), liTmp;
            $onlineList.html('');
            for (var _i = 0, _a = data.online_list; _i < _a.length; _i++) {
                var datum = _a[_i];
                liTmp = "<li data-session=\"" + datum.session + "\">\n                            <a href=\"javascript:;\">" + datum.session + "</a>\n                         </li>";
                $onlineList.append(liTmp);
            }
        };
        ChatRoom.prototype.displayMessageList = function (data) {
            var $messageList = $('#message-list'), dialogue = "<li class='other-user'>\n                                        <dl>\n                                            <dt>" + data.session + "</dt>\n                                            <dd>" + data.content + "</dd>\n                                        </dl>\n                                    </li>";
            if (!(data.session === session)) {
                $messageList.append(dialogue);
                scorllBottom($messageList.parents('div.message-list'));
            }
        };
        return ChatRoom;
    })();
    ChatRoom_1.ChatRoom = ChatRoom;
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
            var senderSession = evt.data.session, data = this.loadsSocketData(evt.data);
            this.dispatcher(data);
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
    })(Utils.Client);
    ChatRoom_1.Client = Client;
    var AjaxMessage = (function () {
        function AjaxMessage() {
        }
        AjaxMessage.prototype.send = function (content) {
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
        AjaxMessage.prototype.successHandler = function (response, content) {
            var $messageTextarea = $('textarea[name="content"]'), $messageList = $('#message-list'), dialogue = "<li class='current-user'>\n                                        <dl>\n                                            <dt>" + session + "</dt>\n                                            <dd>" + content + "</dd>\n                                        </dl>\n                                    </li>";
            if (response.status === 'success') {
                $messageTextarea.val('');
                $messageList.append(dialogue);
                scorllBottom($messageList.parents('div.message-list'));
            }
        };
        return AjaxMessage;
    })();
    ChatRoom_1.AjaxMessage = AjaxMessage;
    //Mixin
    Utils.applyMixins(Client, [ChatRoom]);
    function scorllBottom($ele) {
        var $eleTmp = $ele[0], eleHeight = $eleTmp.scrollHeight;
        $ele.scrollTop(eleHeight);
    }
    ChatRoom_1.scorllBottom = scorllBottom;
})(ChatRoom || (ChatRoom = {}));
$(function () {
    var host = 'ws://127.0.0.1:8000/chat_room', chatRoom = new ChatRoom.Client(host);
    chatRoom.loop();
    $('form#chatroom').submit(function (e) {
        e.preventDefault();
        var sendMessage = new ChatRoom.AjaxMessage(), content = $('textarea[name="content"]').val();
        sendMessage.send(content);
    });
});
