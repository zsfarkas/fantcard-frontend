var express = require('express');
var proxyMiddleware = require('http-proxy-middleware');
var app = express();

app.use(proxyMiddleware('/auth', {"target": "http://localhost:8081"}));
app.use(express.static(__dirname + '/build/'));

app.listen(8080);
