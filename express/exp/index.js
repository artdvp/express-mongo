var express = require('express')
var logger = require('morgan')
var app = express()
var wiki = require('./wiki.js')

var MongoClient = require('mongodb').MongoClient;


var a_middleware_function = function (req,res,next) {
    
    // ... perform some operation
    next();
}

app.use(a_middleware_function)
app.use(logger('dev'))
app.use('/wiki',wiki)

app.use('/someroute',a_middleware_function)

app.use(express.static('public'))
app.use(express.static('media'))

app.use('/media',express.static('public'))

// app.get('/', function(req,res){
//     res.send('Hello express');
// });
app.get('/',a_middleware_function)

// app.all('/secret',function (req,res,next) {
//     console.log('Accessing the secret section...')
//     next();
//     // pass control to the next handler
// })
// access all

app.set('view',path.join(__dirname,'view'))

app.set('view engine', 'some_templae')


// Handling errors
app.use(function(err,req,res,next){
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000, function(){
    console.log("Example app listening on port 3000");
})