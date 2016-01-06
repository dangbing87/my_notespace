#!/usr/bin/env python
#-*-coding:utf-8-*-

from BaseHTTPServer import BaseHTTPRequestHandler
from BaseHTTPServer import HTTPServer


class ResquestHandler(BaseHTTPRequestHandler):

    def _writeheaders(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_HEAD(self):
        self._writeheaders()

    def do_GET(self):
        self._writeheaders()
        self.wfile.write(
                """
                <html>
                    <head>
                        <title>hello world</title>
                    <head>
                    <body>
                        <p>hello world</p>
                    <body>
                </html>
                """
                )


server_addr = ('', 9999)
srvr = HTTPServer(server_addr, ResquestHandler)
srvr.serve_forever()
