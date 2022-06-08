/*
var http = require('http');

const server = http.createServer((req, res) => {
	res.sendfile('registration.html');
})
server.listen(8081, function(){
  console.log('listening on *:8081');
});*/
//const app = require('express');
const http = require('http');
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {

    let filePath = path.join(__dirname, req.url === '/' ? 'login.html' : req.url)
    const ext = path.extname(filePath)
    let contentType = 'text/html'

    switch (ext) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        default:
            contentType = 'text/html'
    }

    if (!ext) {
        filePath += '.html'
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {/*
            fs.readFile(path.join(__dirname, 'error.html'), (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end('Error')
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.end(data)
                }
            })*/
        } else {
            res.writeHead(200, {
                'Content-Type': contentType
            })
            res.end(content)
        }
    })
});

server.listen(3000, function(){
    console.log('listening on *:3000');
});
