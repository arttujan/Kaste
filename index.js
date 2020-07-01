const http = require("http");
var fs = require('fs');
const port = process.env.PORT || 3000;
 
//these are the only file types we will support for now
extensions = {
	".html" : "text/html",
	".css" : "text/css",
	".js" : "application/javascript",
	".png" : "image/png",
	".gif" : "image/gif",
	".jpg" : "image/jpeg"
}; 
//function to handle HTTP requests
function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'application/content-stream'});
        fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}
 

const server = http.createServer(onRequest);

server.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on port: ${port}`);
    }
});