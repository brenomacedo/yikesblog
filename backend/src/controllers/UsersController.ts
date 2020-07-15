import { Controller, Param, Body, Get, Post, Put, Delete, BodyParam, QueryParam, Req, Res, UseBefore } from 'routing-controllers'
import { Request, Response } from 'express'
import { getConnectionManager, Repository, getRepository } from 'typeorm'
import Users from '../models/Users'
import bcrypt from 'bcrypt'


@Controller()
export default class UsersController {

    private userRepository: Repository<Users>

    constructor () {
        this.userRepository = getConnectionManager().get().getRepository(Users)
    }

    @Post("/users")
    async post(@Req() request: Request, @Res() response: Response) {
       const user = new Users()

       const password = await bcrypt.hash(request.body.password, 10)
       user.login = request.body.login
       user.nickname = request.body.nickname
       user.password = password

       await this.userRepository.save(user)

       response.send("usuario criado com sucesso")
    }

    
}