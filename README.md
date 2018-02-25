# Node Express Docker

## Steps to get this working

### Create Basic Express Code

1. Initialise the project: `yarn init`
2. Add express: `yarn add express`
3. Create server.js: `touch server.js`

```javascript
'use strict'

const express = require('express')

// Create the server
const server = express()

// Start the server
server.listen(7000, error => {
  if (error) {
    console.error(error)
  } else {
    console.log('Started at http://localhost:7000')
  }
})
```

4. Add a routes folder: `mkdir routes && cd routes`
5. Create a route for products: `touch products.js`

```javascript
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
```

6. Add Routes in server.js

```javascript
// Routes
server.use('/', [require('./routes/products')])
```

7. Start the server to test if it's running: `yarn start`


### Setup Docker
