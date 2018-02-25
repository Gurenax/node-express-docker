# Node Express Docker using Yarn
These are procedures to run Docker on Node/Express while using Yarn instead of NPM. The main reason for creating this guide is to enable Yarn-built repositories to run on a Docker images (e.g. React Apps, React Native Apps).

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
1. Install docker: `brew cask install docker`
2. Run docker app and configure your login to docker cloud
3. Create a Dockerfile `touch Dockerfile`

```Dockerfile
FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+) and yarn.lock because we are using yarn
COPY package*.json yarn.lock ./

# Run yarn without generating a yarn.lock file
RUN yarn --pure-lockfile

# Bundle app source
COPY . .

# Use the port used by our server.js configuration
EXPOSE 7000

# This will run `yarn start` when the docker image is ran
CMD [ "yarn", "start" ]
```

4. Create .dockerignore file: `touch .dockerignore`
```
node_modules
npm-debug.log
```

5. Login using Docker CLI
```
docker login
```

6. Build the docker image
```
docker build -t <your username>/node-express-docker .
```

7. Print list of docker images
```
docker images
```

8. Run the docker image. This will run the image on port 49160 as it was forwarded from port 7000. The `-d` flag specifies that the container is running in detached mode.
```
docker run -p 49160:7000 -d <your username>/node-express-docker
```

9. Print list of deployed docker images
```
docker ps
```

10. Print log of a specific docker container
```
docker logs <container id>
```

11. Entering into the container's shell mode
```
docker exec -it <container id> /bin/bash
```

12. Test the app using curl or simply `localhost:49160/products` in a browser
```
curl -i localhost:49160/products
```

Should output something like :
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 17
ETag: W/"11-ek8eHQf3jVcXpzn7ZZ5GiWlH1gg"
Date: Sun, 25 Feb 2018 02:42:49 GMT
Connection: keep-alive

"Hello Products!"%
```