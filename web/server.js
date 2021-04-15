const express = require('express')

const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
console.log(dev);
const app = next({
    dev
})
const handler = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    server.get('*', (req, res) => {
        return handler(req, res)
    })
    server.listen(3004, console.log('running to localhost:3004'))
})
