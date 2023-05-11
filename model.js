const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    question: String,
    aiResponse: String,
})

const conversationSchema = mongoose.Schema({
    username: String,
    chat: [questionSchema],

}, { timestamps: true})

const Conversation = mongoose.model("Conversation", conversationSchema)
module.exports = Conversation
