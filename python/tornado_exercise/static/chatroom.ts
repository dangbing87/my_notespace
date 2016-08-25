/// <reference path="./typings/jquery/jquery.d.ts" />
/// <reference path="./utils.ts" />

namespace ChatRoom {
    let session: string = $('input[name="session"]').val();

    export interface IChatMessage {
        session: string;
        content: string;
    }

    export class Client extends Utils.Client {
    }

    export function sendMessage(message: string) {
        let chatContent: IChatMessage;

        chatContent =$.extend( {}, { 'message': message,'session': session });

        console.log(chatContent);
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
    $('form#chatroom').submit(function(e: Event) {
        e.preventDefault();

        var message: string = $('textarea[name="content"]').val();
        ChatRoom.sendMessage(message);
    });
});
