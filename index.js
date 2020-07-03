const http = require("http");
var fs = require('fs');
const port = process.env.PORT || 3000;

//function to handle HTTP requests
function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./' + request.url, function(err, data) {
        if (!err) {
            var dotoffset = request.url.lastIndexOf('.');
            var mimetype = dotoffset == -1
                            ? 'text/plain'
                            : {
                                '.html' : 'text/html',
                                '.ico' : 'image/x-icon',
                                '.jpg' : 'image/jpeg',
                                '.png' : 'image/png',
                                '.gif' : 'image/gif',
                                '.css' : 'text/css',
                                '.js' : 'text/javascript'
                                }[ request.url.substr(dotoffset) ];
            response.setHeader('Content-type' , mimetype);
            response.end(data);
            console.log( request.url, mimetype );
        } else {
            console.log ('file not found: ' + request.url);
            response.writeHead(404, "Not Found");
            response.end();
        }
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