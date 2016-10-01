/// <reference path="./typings/jquery/jquery.d.ts" />
/// <reference path="./utils.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChatRoom;
(function (ChatRoom) {
    (function (ServerMessageCode) {
        ServerMessageCode[ServerMessageCode["messageList"] = 0] = "messageList";
        ServerMessageCode[ServerMessageCode["onlineSessionList"] = 1] = "onlineSessionList";
    })(ChatRoom.ServerMessageCode || (ChatRoom.ServerMessageCode = {}));
    var ServerMessageCode = ChatRoom.ServerMessageCode;
    var ChatRoomMixin = (function () {
        function ChatRoomMixin() {
        }
        ChatRoomMixin.prototype.dispatcher = function (data) {
            console.log(this.userInfo);
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
        ChatRoomMixin.prototype.displayOnlineList = function (data) {
            var $onlineList = $('#online-list'), liTmp;
            $onlineList.html('');
            for (var _i = 0, _a = data.online_list; _i < _a.length; _i++) {
                var datum = _a[_i];
                if (datum.session !== this.userInfo.session) {
                    liTmp = "<li data-session=\"" + datum.session + "\">\n                                <a href=\"javascript:;\">" + datum.username + "</a>\n                            </li>";
                    $onlineList.append(liTmp);
                }
            }
        };
        ChatRoomMixin.prototype.displayMessageList = function (data) {
            var $messageList = $('#message-list'), dialogue = "<li class='other-user'>\n                                        <dl>\n                                            <dt>" + data.username + "</dt>\n                                            <dd>" + data.content + "</dd>\n                                        </dl>\n                                    </li>";
            if (data.session !== this.userInfo.session) {
                $messageList.append(dialogue);
                scorllBottom($messageList.parents('div.message-list'));
            }
        };
        return ChatRoomMixin;
    }());
    ChatRoom.ChatRoomMixin = ChatRoomMixin;
    var Client = (function (_super) {
        __extends(Client, _super);
        function Client() {
            _super.apply(this, arguments);
        }
        Client.prototype.onConnected = function () {
            var registerMessage = {
                'status': 'register',
                'session': this.session,
                'username': this.username
            };
            this.sendMessage(registerMessage);
        };
        Client.prototype.setRegisterInfo = function (username, session) {
            this.username = username;
            this.session = session;
            this.userInfo = {
                username: this.username,
                session: this.session
            };
        };
        Client.prototype.onMessage = function (evt) {
            var senderSession = evt.data.session, data = this.loadsSocketData(evt.data);
            this.dispatcher(data);
        };
        Client.prototype.onClosed = function (error) {
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
    var AjaxMessage = (function () {
        function AjaxMessage(username, session) {
            this.username = username;
            this.session = session;
        }
        AjaxMessage.prototype.send = function (session, content) {
            var chatContent;
            chatContent = {
                content: content,
                username: this.username,
                session: this.session
            };
            $.ajax({
                url: '/',
                type: 'POST',
                dataType: 'json',
                data: chatContent,
                success: function (response) {
                    this.successHandler(response, session, content);
                }.bind(this)
            });
        };
        AjaxMessage.prototype.successHandler = function (response, content) {
            var $messageTextarea = $('textarea[name="content"]'), $messageList = $('#message-list'), dialogue = "<li class='current-user'>\n                                        <dl>\n                                            <dt>" + this.username + "</dt>\n                                            <dd>" + content + "</dd>\n                                        </dl>\n                                    </li>";
            if (response.status === 'success') {
                $messageTextarea.val('');
                $messageList.append(dialogue);
                scorllBottom($messageList.parents('div.message-list'));
            }
        };
        return AjaxMessage;
    }());
    ChatRoom.AjaxMessage = AjaxMessage;
    //Mixin
    Utils.applyMixins(Client, [ChatRoomMixin]);
    function scorllBottom($ele) {
        var $eleTmp = $ele[0], eleHeight = $eleTmp.scrollHeight;
        $ele.scrollTop(eleHeight);
    }
    ChatRoom.scorllBottom = scorllBottom;
})(ChatRoom || (ChatRoom = {}));
$(function () {
    var host = 'ws://127.0.0.1:8000/chat_room', username = prompt('set your name'), session = $('input[name="session"]').val(), chatRoom = new ChatRoom.Client(host);
    chatRoom.setRegisterInfo(username, session);
    chatRoom.loop();
    $('form#chatroom').submit(function (e) {
        e.preventDefault();
        var sendMessage = new ChatRoom.AjaxMessage(username, session), content = $('textarea[name="content"]').val();
        sendMessage.send(session, content);
    });
});
