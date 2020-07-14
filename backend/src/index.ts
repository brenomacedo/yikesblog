import express from 'express'
import "reflect-metadata"

import { useExpressServer } from 'routing-controllers'
import UsersController from './controllers/UsersController'
import bodyParser from 'body-parser'
import './database'

const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

useExpressServer(server, {
    controllers: [UsersController],
    classTransformer: false
})

server.listen(3003)