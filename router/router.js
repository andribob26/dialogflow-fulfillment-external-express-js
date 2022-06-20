const router = require('express').Router()
const {textQuery, webhook} = require('../controllers/chatbot')

router.get('/', (req, res) => {
    res.send("halloooo")
})

router.post('/webhook', webhook)

router.post('/text-query', textQuery)


module.exports = router

