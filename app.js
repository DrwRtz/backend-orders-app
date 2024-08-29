const express = require('express')
const app = express()
const cors = require('cors')
const ordersRouter = require('./controllers/orders')

app.use(cors())
app.use(express.json())
app.use('/api/orders', ordersRouter)

module.exports = app