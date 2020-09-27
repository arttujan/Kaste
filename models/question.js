const mongoose = require('mongoose')

var questionSchema = new mongoose.Schema({
    question: String,
    answers : [{answer : String, correct : Boolean}],
    added: Date,
    updated : Date,
    order: Number
})

questionSchema.set('toJSON', {
    transform: (document, returnable) => {
        returnable.id = returnable._id.toString()
        //returnable.answer.id = returnable.answer._id.toString()
        delete returnable._id
        delete returnable.__v
        //delete returnable.answer_.id
    }
})

module.exports = mongoose.model('Question', questionSchema)