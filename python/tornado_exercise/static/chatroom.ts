/// <reference path="./typings/jquery/jquery.d.ts" />
/// <reference path="./utils.ts" />

namespace ChatRoom {
    let session: string = $('input[name="session"]').val();

    export interface IChatMessage extends JSON {
        session: string;
        content: string;
    }

    export interface IResponseData {
        status: string;
        data: any;
        message: string;
    }

    export interface IOnlineSession {
        session: string;
    }

    export interface IChatRoomMessage extends JSON {
        code?: number;
        online_list?: Array<IOnlineSession>;
        session?: string;
        content?: string;
    }

    export enum ServerMessageCode {
        messageList,
        onlineSessionList
    }

    export class ChatRoom {
        dispatcher(data: IChatRoomMessage): void {
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
                liTmp = `<li data-session="${datum.session}">
                            <a href="javascript:;">${datum.session}</a>
                         </li>`;
                $onlineList.append(liTmp);
            }
        }

        displayMessageList(data: IChatRoomMessage): void {
            let $messageList: JQuery = $('#message-list'),
                dialogue: string = `<li class='other-user'>
                                        <dl>
                                            <dt>${data.session}</dt>
                                            <dd>${data.content}</dd>
                                        </dl>
                                    </li>`;

            if (!(data.session === session)) {
                $messageList.append(dialogue);
                scorllBottom($messageList.parents('div.message-list'));
            }
        }
    }

    export class Client extends Utils.Client implements ChatRoom {
        onConnected(evt: Event): void {
            let registerMessage = {'status': 'register', 'session': session};
            this.sendMessage(registerMessage);
        }

        onMessage(evt: MessageEvent): void {
            let senderSession: string = evt.data.session,
                data: IChatRoomMessage = this.loadsSocketData(evt.data);
            this.dispatcher(data);
        }

        onClosed(evt: CloseEvent): void {
            console.log('connect closed');
        }

        loadsSocketData(data: string): IChatRoomMessage {
            let context: IChatRoomMessage;
            context = $.extend({}, super.loadsSocketData(data));

            return context;
        }

        // ChatRoom
        dispatcher: (data: IChatRoomMessage) => void;
        displayOnlineList: (data: IChatRoomMessage) => void;
        displayMessageList: (data: IChatRoomMessage) => void;
    }

    export class AjaxMessage {
        send(content: string): void {
            let chatContent: IChatMessage;

            chatContent =$.extend( {}, { 'content': content,'session': session });


            $.ajax({
                'url': '/',
                'type': 'POST',
                'dataType': 'json',
                'data': chatContent,
                'success': function(response: IResponseData) {
                    this.successHandler(response, content);
                }.bind(this)
            });
        }

        successHandler(response: IResponseData, content: string): void {
            let $messageTextarea: JQuery = $('textarea[name="content"]'),
                $messageList: JQuery = $('#message-list'),
                dialogue: string = `<li class='current-user'>
                                        <dl>
                                            <dt>${session}</dt>
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
    Utils.applyMixins(Client, [ChatRoom]);

    export function scorllBottom($ele: JQuery) {
        var $eleTmp: HTMLElement = $ele[0],
            eleHeight: number = $eleTmp.scrollHeight;

        $ele.scrollTop(eleHeight);
    }
}


$(function() {
    let host: string = 'ws://127.0.0.1:8000/chat_room',
        chatRoom: ChatRoom.Client = new ChatRoom.Client(host);

    chatRoom.loop();

    $('form#chatroom').submit(function(e: Event) {
        e.preventDefault();

        let sendMessage: ChatRoom.AjaxMessage = new ChatRoom.AjaxMessage(),
            content: string = $('textarea[name="content"]').val();

        sendMessage.send(content);
    });
});
