const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode =200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Will send all this ");
})
.post((req,res,next) =>{
    res.end("The request of dishes to be added on server: "+ req.body.name + 'with details: ' + req.body.description);
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end("put not allowed o dishes" );
})
.delete((req,res,next) => {
    res.end("Deleting all the dishes ");   // will need authentication though
});

module.exports = dishRouter;
