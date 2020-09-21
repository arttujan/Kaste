// Lets put all the middlewares here
const unknownEndpoint = (req, res) => {
    res.status(404).send(({error : 'Unknown endpoint'}));;
}

module.exports = {
    unknownEndpoint
}