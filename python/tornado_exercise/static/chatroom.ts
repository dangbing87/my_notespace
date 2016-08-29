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

    export class Client extends Utils.Client {
        onConnected(evt: Event): void {
            let registerMessage = {'status': 'register', 'session': session};
            this.sendMessage(registerMessage);
        }

        onMessage(evt: MessageEvent): void {
            let senderSession: string = evt.data.session,
                data: IChatMessage = this.loadsSocketData(evt.data),

                $messageList: JQuery = $('#message-list'),
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

        onClosed(evt: CloseEvent): void {
            console.log('connect closed');
        }

        loadsSocketData(data: string): IChatMessage {
            let context: IChatMessage;
            context = $.extend({}, super.loadsSocketData(data));

            return context;
        }
    }

    export class SendMessage {
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

        let sendMessage: ChatRoom.SendMessage = new ChatRoom.SendMessage(),
            content: string = $('textarea[name="content"]').val();

        sendMessage.send(content);
    });
});
