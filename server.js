const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('json-server/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.id = Date.now()
        req.body.date = Date.now()
    }
    // Continue to JSON Server router
    next()
})

server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is running')
})