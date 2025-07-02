// Step 1 import ....
const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')
const path = require('path')

// const authRouter = require('./routes/auth')
// const categoryRouter = require('./routes/category')

// middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(cors())
// app.use('/api',authRouter)
// app.use('/api',categoryRouter)
readdirSync('./routes')
    .map((c) => app.use('/api', require('./routes/' + c)))


app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})


// Step 2 Start Server
app.listen(8888,
    () => console.log('Server is running on port 8888'))


