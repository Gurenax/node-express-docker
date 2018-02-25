'use strict'

const express = require('express')

// Create express router
const router = express.Router()

// GET /products
router.get('/products', (req, res) => {
  res.json('Hello Products!')
})

// Export router
module.exports = router
