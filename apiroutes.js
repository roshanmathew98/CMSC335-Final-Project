const express = require('express')
const Conversation = require('./model')
const router = express.Router()

router.post('/conversations', async (req, res) => {
    try {
        const conversation = await Conversation.create(req.body)
        res.json(conversation)
    } catch {
        res.status(500).json({message: "Something went wrong"})
    }
})

router.get('/conversations/:username', async (req, res) => {
    try {
        const conversations = await Conversation.find({username: req.params.username})
        res.json(conversations)
    } catch {
        res.status(500).json({message: "Something went wrong"})
    }
})

module.exports = router