import chatroom

import tornado.testing
import tornado.websocket

from uuid import uuid4 as uuid
import json

import unittest
import urllib


class TestBase(tornado.testing.AsyncHTTPTestCase):
    def get_app(self):
        app = chatroom.Application()
        return app


class IndexTestCase(TestBase):
    url = '/'

    def test_get_method_status(self):
        response = self.fetch(self.url, method='GET')
        self.assertEqual(response.code, 200)

    def test_post_method(self):
        post_data = {
            'content': '1111',
            'username': 'nick',
            'session': str(uuid()),
        }
        expected_result = {
            'status': 'success',
            'message': '',
        }
        response_body = {}
        body = urllib.urlencode(post_data)

        response = self.fetch(self.url, method='POST', body=body)
        response_body = json.loads(response.body)

        self.assertEqual(response_body, expected_result)


class ChatRoomWebSocketTestCase(TestBase):
    ws = None
    ws_url = ''

    @tornado.testing.gen_test
    def test_connect(self):
        self.ws_url =   \
            'ws://localhost:{port}/chat_room'.format(port=self.get_http_port())
        self.ws = yield tornado.websocket.websocket_connect(self.ws_url)

if __name__ == '__main__':
    unittest.main()
