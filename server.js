'use strict'

const express = require('express')

// Create the server
const server = express()

// Routes
server.use('/', [
  require('./routes/products')
])

// Start the server
server.listen(7000, error => {
  if(error) {
    console.error(error)
  } else {
    console.log('Started at http://localhost:7000')
  }
})
