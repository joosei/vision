const express = require ('express');
const http = require ('http');
const morgan = require('morgan');
const bodyParser = require ('body-parser');

const hostname = 'localhost';
const port = 8080;

const app = express();
app.use (morgan('dev'));
app.use (bodyParser.json ());

app.all('/results', (req,res,next) => {

    res.statusCode = 200;
    res.setHeader ('Content-Type', 'text/plain');
    next();
} );

app.get ('/results', (req,res,next) => {  // get operation
    res.end ('get test');
} );

app.post ('/results', (req,res,next) => { //post operation

    res.end ('post test:' + req.body.name + 'with details:' + req.body.description );
});

app.use (express.static (__dirname + '/tools'));
app.use ( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader ( 'content-type', 'text/html' );
    res.end ('<html><body><h1>This is an express Server</h1></body></html>')
});
const server = http.createServer (app);
server.listen (port,hostname, () =>{
    console.log (`server running at http://${hostname}:${port}`)

} );