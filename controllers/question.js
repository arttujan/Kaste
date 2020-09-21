const questionRouter = require('express').Router()
const Question = require('../models/question')

// Returns all questions
questionRouter.get('/', (req, res) => {
    Question.find({}).then(questions => {
        res.json(questions.map(q => q.toJSON()))
    })
})
// Returns one question based on id
questionRouter.get('/:id', (req, res) => {
    Question.findById(req.params.id).then(q => {
         res.send(q.toJSON())
    })
})
// Adds new questions
questionRouter.post('/', (req, res) => {
    const question = new Question({
        question: req.body.question,
        date: new Date(),
        updated: new Date(),
        answers: req.body.answers
    })
    question.save().then(q => {
        res.json(q.toJSON())
    }).catch(e => {
        res.status(401).end()
    })
})
// Updates question based on given id
questionRouter.put('/:id', (req, res) => {
    // TODO
    const question = {
        question : req.body.question,
        answers : req.body.answers,
        updated : new Date()
    }

    Question.findByIdAndUpdate(req.params.id, question, {new : true}).then(q => {
         res.json(q.toJSON());
    })

})
// Deltes question based on given id
questionRouter.delete('/:id', (req, res) => {
    Question.findByIdAndRemove(req.params.id).then(() => {
        res.status(204).end();
    })
})

module.exports = questionRouter