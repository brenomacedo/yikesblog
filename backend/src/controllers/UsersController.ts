import { Controller, Param, Body, Get, Post, Put, Delete, BodyParam, QueryParam, Req, Res, UseBefore } from 'routing-controllers'
import { Request, Response } from 'express'
import { getConnectionManager } from 'typeorm'
import Users from '../models/Users'


@Controller()
export default class UsersController {
    @Post("/users")
    async post(@Req() request: Request, @Res() response: Response) {
       const usersRepository = getConnectionManager().get().getRepository(Users)
       const User = new Users()
       User.login = request.body.login
       User.nickname = request.body.nickname
       User.password = request.body.password
       await usersRepository.save(User)

       response.send(`user ${request.body.nickname} was created successfuly`)
    }
}