const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
    console.log(req.url , req.method);
    if(req.method == 'GET'){
        var fileUrl;
        if(req.url=='/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filepath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filepath);
        if(fileExt == '.html'){
            fs.exists(filepath,(exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>Error 404:' + fileUrl + ' not found</h1></body></html>');
                    return;
                }
                res.statusCode = 200;     // everything is perfect
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filepath).pipe(res);   // pipe the content of file in response;
            });
        }
        else{
            res.statusCode = 404;           // not found
            res.setHeader('Content-Type','text/html');
            res.end('<html><body><h1>Error 404:' + fileUrl + ' not an HTML file</h1></body></html>');
            return;
        }
    }
    else{    // this is the case of method other than GET
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>Error 404:' + req.method + ' not supported by this server</h1></body></html>');
        return;
    }
    // res.statusCode = 200;
    // res.setHeader('Content-Type','text/html');
    // res.end('<html><body><h1>Hello,Wodrd</h1></body></html>');
})

server.listen(port,hostname , () => {
    console.log(`Server running at http://${hostname}:${port}`);
})
