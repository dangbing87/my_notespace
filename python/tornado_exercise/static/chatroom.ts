/// <reference path="./typings/jquery/jquery.d.ts" />
/// <reference path="./utils.ts" />

namespace ChatRoom {
    let session: string = $('input[name="session"]').val();

    export interface IChatMessage {
        session: string;
        content: string;
    }

    export class Client extends Utils.Client {
        onConnected(evt: Utils.WebSocketEvent): void {
            let registerMessage = {'status': 'register', 'session': session};
            this.sendMessage(registerMessage);
        }

        onMessage(evt: Utils.WebSocketEvent): void {
            console.log(evt);
        }

        onClosed(evt: Utils.WebSocketEvent): void {
            console.log('connect closed');
        }
    }

    export function sendMessage(content: string) {
        let chatContent: IChatMessage;

        chatContent =$.extend( {}, { 'content': content,'session': session });

        $.ajax({
            'url': '/',
            'type': 'POST',
            'dataType': 'json',
            'data': chatContent,
            'success': function(response) {
                console.log(response);
            }
        });
    }
}


$(function() {
    let host: string = 'ws://127.0.0.1:8000/chat_room',
        chatRoom: ChatRoom.Client = new ChatRoom.Client(host);

    chatRoom.loop();

    $('form#chatroom').submit(function(e: Event) {
        e.preventDefault();

        var content: string = $('textarea[name="content"]').val();
        ChatRoom.sendMessage(content);
    });
});
