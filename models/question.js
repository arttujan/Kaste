const mongoose = require('mongoose')

var questionSchema = new mongoose.Schema({
    question: String,
    answers : [],
    added: Date,
    updated : Date
})

questionSchema.set('toJSON', {
    transform: (document, returnable) => {
        returnable.id = returnable._id.toString()
        delete returnable._id
        delete returnable.__v
    }
})

module.exports = mongoose.model('Question', questionSchema)