// Step 1 import ....
const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')
const path = require('path')

// ===== ✅ CORS SETUP =====
const allowedOrigins = [
  'https://e-commerce-client-azure.vercel.app', // ✅ ใส่ domain frontend ที่ deploy จริง
  'http://localhost:5173' // ✅ สำหรับใช้งานตอน dev ในเครื่อง
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
// ==========================

// middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))

// dynamic routes
readdirSync('./routes').map((c) =>
  app.use('/api', require('./routes/' + c))
)

// static files from frontend
app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

// Step 2 Start Server
app.listen(5002, () => console.log('Server is running on port 5002'))
