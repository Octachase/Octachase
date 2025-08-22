const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const errorMiddleware = require('./middlewares/error.middleware')
const appRouter = require('./routes')

const app = express()
app.use(morgan('combined'))

app.use(express.json())

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  })
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'text/plain, Domain')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next() // Continue with the main request
  }
})

app.use((req, res, next) => {
  // Skip domain check for local development
  if (
    req.headers.origin &&
    (req.headers.origin.includes('localhost') ||
      req.headers.origin.includes('127.0.0.1'))
  ) {
    return next()
  }

  // Domain check for production
  if (!req.headers.domain || req.headers.domain !== process.env.BACKEND_URL) {
    res
      .status(401)
      .json({ error: 'User not authorized to perform this action' })
  }
  next()
})

app.use('/api', appRouter)

app.use(errorMiddleware)

module.exports = app
