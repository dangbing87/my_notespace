/// <reference path="./typings/jquery/jquery.d.ts" />
/// <reference path="./utils.ts" />

namespace ChatRoom {
    export interface IChatMessage {
        session: string;
        content: string;
        username: string;
    }

    export interface IResponseData {
        status: string;
        data: any;
        message: string;
    }

    export interface IOnlineSession {
        session: string;
        username: string;
    }

    export interface IChatRoomMessage extends JSON {
        code?: number;
        online_list?: Array<IOnlineSession>;
        session?: string;
        content?: string;
        username?: string;
    }

    export interface IUserInfo {
        session: string;
        username: string;
    }

    export enum ServerMessageCode {
        messageList,
        onlineSessionList
    }

    export class ChatRoomMixin {
        userInfo: IUserInfo;

        dispatcher(data: IChatRoomMessage): void {
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
        }

        displayOnlineList(data: IChatRoomMessage): void {
            var $onlineList: JQuery = $('#online-list'),
                liTmp: string;

            $onlineList.html('');

            for (let datum of data.online_list) {
                if (datum.session !== this.userInfo.session) {
                    liTmp = `<li data-session="${datum.session}">
                                <a href="javascript:;">${datum.username}</a>
                            </li>`;
                    $onlineList.append(liTmp);
                }
            }
        }

        displayMessageList(data: IChatRoomMessage): void {
            let $messageList: JQuery = $('#message-list'),
                dialogue: string = `<li class='other-user'>
                                        <dl>
                                            <dt>${data.username}</dt>
                                            <dd>${data.content}</dd>
                                        </dl>
                                    </li>`;

            if (data.session !== this.userInfo.session) {
                $messageList.append(dialogue);
                scorllBottom($messageList.parents('div.message-list'));
            }
        }
    }

    export class Client extends Utils.Client implements ChatRoomMixin {
        session: string;
        username: string;

        onConnected(): void {
            let registerMessage = {
                'status': 'register',
                'session': this.session,
                'username': this.username
            };

            this.sendMessage(registerMessage);
        }

        setRegisterInfo(username: string, session: string) {
            this.username = username;
            this.session = session;

            this.userInfo = {
                username: this.username,
                session: this.session
            };
        }

        onMessage(evt: MessageEvent): void {
            let senderSession: string = evt.data.session,
                data: IChatRoomMessage = this.loadsSocketData(evt.data);
            this.dispatcher(data);
        }

        onClosed(error: CloseEvent): void {
            console.log('connect closed');
        }

        loadsSocketData(data: string): IChatRoomMessage {
            let context: IChatRoomMessage;
            context = $.extend({}, super.loadsSocketData(data));

            return context;
        }

        // ChatRoom
        userInfo: IUserInfo;
        dispatcher: (data: IChatRoomMessage) => void;
        displayOnlineList: (data: IChatRoomMessage) => void;
        displayMessageList: (data: IChatRoomMessage) => void;
    }

    export class AjaxMessage {
        session: string;
        username: string;

        constructor(username:string, session: string) {
            this.username = username;
            this.session = session;
        }

        send(session: string, content: string): void {
            let chatContent: IChatMessage;

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
                success: function(response: IResponseData) {
                    this.successHandler(response, session, content);
                }.bind(this)
            });
        }

        successHandler(response: IResponseData, content: string): void {
            let $messageTextarea: JQuery = $('textarea[name="content"]'),
                $messageList: JQuery = $('#message-list'),
                dialogue: string = `<li class='current-user'>
                                        <dl>
                                            <dt>${this.username}</dt>
                                            <dd>${content}</dd>
                                        </dl>
                                    </li>`;

            if (response.status === 'success') {
                $messageTextarea.val('');
                $messageList.append(dialogue);

                scorllBottom($messageList.parents('div.message-list'));
            }
        }
    }

    //Mixin
    Utils.applyMixins(Client, [ChatRoomMixin]);

    export function scorllBottom($ele: JQuery) {
        var $eleTmp: HTMLElement = $ele[0],
            eleHeight: number = $eleTmp.scrollHeight;

        $ele.scrollTop(eleHeight);
    }
}


$(function() {
    let host: string = 'ws://127.0.0.1:8000/chat_room',
        username = prompt('set your name'),
        session: string = $('input[name="session"]').val(),
        chatRoom: ChatRoom.Client = new ChatRoom.Client(host);

    chatRoom.setRegisterInfo(username, session);
    chatRoom.loop();

    $('form#chatroom').submit(function(e: Event) {
        e.preventDefault();

        let sendMessage: ChatRoom.AjaxMessage = new ChatRoom.AjaxMessage(username,
                                                                         session),
            content: string = $('textarea[name="content"]').val();

        sendMessage.send(session, content);
    });
});
