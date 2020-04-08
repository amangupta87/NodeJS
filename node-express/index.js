const express  = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes',(req,res,next)=>{
    res.statusCode =200;
    res.setHeader('Content-Type','text/plain');
    next();
});
app.get('/dishes',(req,res,next) => {
    res.end("Will send all this ");
});
app.post('/dishes',(req,res,next) =>{
    res.end("The request of dishes to be added on server: "+ req.body.name + 'with details: ' + req.body.description);
});

app.put('/dishes',(req,res,next) =>{
    res.statusCode = 403;
    res.end("put not allowed o dishes" );
});
app.delete('/dishes',(req,res,next) => {
    res.end("Deleting all the dishes ");   // will need authentication though
});

app.get('/dishes/:dishId',(req,res,next) => {
    res.end("Will send dish number " + req.params.dishId);
});
app.post('/dishes/:dishId',(req,res,next) =>{
    res.statusCode = 403;
    res.end("Post not allowed on dish " +req.params.dishId );
});

app.put('/dishes/:dishId',(req,res,next) =>{
    res.write("updating the dish number" + req.params.dishId + '\n');
    res.end("will update the dish" + req.body.name + req.body.description);
});
app.delete('/dishes/:dishId',(req,res,next) => {
    res.end("Deleting dish  " + req.params.dishId);   // will need authentication though
});
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    // console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is Express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server running if I did it right, at http://${hostname}:${port}`);
});
