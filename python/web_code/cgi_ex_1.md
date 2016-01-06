#### BaseHTTPRequestHandler
##### 发送head
> 
1. __writeheaders(self)
2. to_Head(self)
> 

##### http方法
>　
1.to_GET(self)
2.to_POST(self)
>　

#### 设置头信息
> 
> ``` 
self.send_request(< http code >)
self.send_header(< document type >)
self.end_headers()
>``` 
> 

#### HTTPServer
```
serv = HTTPServer(server_addr, Handler)
serv.server_forever()
```