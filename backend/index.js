const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = process.env.DB_PORT

// Use CORS middleware
app.use(cors())

// Parse incoming requests with JSON payloads
app.use(bodyParser.json())

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: false }))

// Import and use employeesRouter
const employeesRouter = require('./routes/employees')
app.use('/api/employees', employeesRouter)

// Import and use positionsRouter
const positionsRouter = require('./routes/positions')
app.use('/api/positions', positionsRouter)

// Start the server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
