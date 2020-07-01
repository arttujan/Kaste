const http = require("http");
const port = process.env.PORT || 3000;

const handler = (req, res) => {
    console.log('server received request');
    res.end('Testi5');
};

const server = http.createServer(handler);

server.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on port: ${port}`);
    }
});