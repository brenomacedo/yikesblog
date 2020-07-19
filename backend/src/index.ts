import express from 'express'
import cors from 'cors'
import path from 'path'
import "reflect-metadata"

import { useExpressServer } from 'routing-controllers'
import UsersController from './controllers/UsersController'
import PostsController from './controllers/PostsController'
import './database'

const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.resolve('tmp', 'uploads')))

useExpressServer(server, {
    controllers: [UsersController, PostsController],
    classTransformer: false
})

server.listen(3003)