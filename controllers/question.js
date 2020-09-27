const questionRouter = require('express').Router()
const Question = require('../models/question')

// Returns all questions
questionRouter.get('/', (req, res) => {
    Question.find({}).then(questions => {
        // Lets give the results in correct order sorted by order number
        res.json([...questions].sort((a, b) => a.order - b.order).map(q => q.toJSON()))
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
    console.log(req.body)
    const question = new Question({
        question: req.body.question,
        added: new Date(),
        updated: new Date(),
        answers: req.body.answers,
        order : req.body.order
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
        updated : new Date(),
        order : req.body.order
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