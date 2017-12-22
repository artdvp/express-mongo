// Load HTTP Module
var http = require("http")

// Create HTTP server and listen on port 8000 for request
http.createServer(function(req,res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello node');
}).listen(8500);

console.log("Server running at http://127.0.0.1:8500");