const http = require("http");
const port = process.env.PORT || 3000;

const handler = (req, res) => {
    console.log('server received request');
    fs.readFile('./index.html', null, function(error, data){
        if (error) {
            Response.writeHead(404);
            Response.write('File not found!');
        } else {
            Response.write(data);
        }
        Response.end();
    });
    Response.end();
};

const server = http.createServer(handler);

server.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on port: ${port}`);
    }
});