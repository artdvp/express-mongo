var express = require('express')
var app = express()
var wiki = require('./wiki.js')

app.use('/wiki',wiki)

app.get('/', function(req,res){
    res.send('Hello express');
});

app.all('/secret',function (req,res) {
    console.log('Accessing the secret section...')
    next();
    // pass control to the next handler
})
// access all

app.listen(3000, function(){
    console.log("Example app listening on port 3000");
})