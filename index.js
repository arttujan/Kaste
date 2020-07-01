const http = require("http");
var fs = require('fs');
const port = process.env.PORT || 3000;

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'test/html'});
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