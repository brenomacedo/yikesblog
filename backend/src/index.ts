import express from 'express'
import "reflect-metadata"

import { useExpressServer } from 'routing-controllers'
import UsersController from './controllers/UsersController'
import PostsController from './controllers/PostsController'
import './database'

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

useExpressServer(server, {
    controllers: [UsersController, PostsController],
    classTransformer: false
})

server.listen(3003)