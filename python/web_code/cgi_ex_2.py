#!/usr/bin/env python
#-*-coding:utf-8-*-

from BaseHTTPServer import BaseHTTPRequestHandler
from BaseHTTPServer import HTTPServer

from string import Template


class RequestHandler(BaseHTTPRequestHandler):

    def _writehead(self):
        self.send_response(200)
        self.send_header('Context-type', 'text/html')
        self.end_headers()

    def do_HEAD(self):
        self._writehead()

    def do_GET(self):
        html_template = Template( \
                """
                <html>
                    <head>
                        <title>$title</title>
                    </head>
                    <body>$body</body>
                </html>
                """)
        html_content = ''
        self._writehead()

        if self.path == '/':
            html_content = html_template.substitute(title='index', body='this is home')
        elif self.path == '/test/':
            html_content = html_template.substitute(title='test', body='this is test')

        self.wfile.write(html_content)

server_addr = ('', 31337)
server = HTTPServer(server_addr, RequestHandler)
server.serve_forever()
