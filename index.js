const express = require('express')
const axios = require('axios')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const apiroutes = require('./apiroutes')
dotenv.config()
mongoose.connect(process.env.MongoDB_URI).then(() => console.log("MongoDB connected"))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get('/conversations', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/conversations.html"))
})

app.post('/', async (req,res) => {
    const options = {
        method: 'GET',
        url: 'https://random-stuff-api.p.rapidapi.com/ai/response',
        params: {
          message: req.body.message,
          user_id: '63716235'
        },
        headers: {
          Authorization: process.env.API_key,
          'X-RapidAPI-Key': 'e289e9567emsh5a3ce99e3da0750p104616jsn46e9a53e3131',
          'X-RapidAPI-Host': 'random-stuff-api.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          res.json(response.data)
      } catch (error) {
          console.error(error);
      }
})

app.use('/api', apiroutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})