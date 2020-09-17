const questionRouter = require('express').Router()

questionRouter.get('/', (req, res) => {
    res.send('Annetaan tässä kaikki kysymykset mitä on')
})

questionRouter.get('/:id', (req, res) => {
    res.send('Annetaan tässä yksi kysymys id:n perusteella minkä syötti')
})

questionRouter.post('/', (req, res) => {
    res.send('Lisätään tässä uusi kysymys')
})

questionRouter.put('/:id', (req, res) => {
    res.send('Muokataan tässä vanhaa kysymystä')
})

questionRouter.delete('/:id', (req, res) => {
    res.send('Poistetaan tässä kysymys')
})

module.exports = questionRouter