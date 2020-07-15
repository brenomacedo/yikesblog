import { Controller, Param, Body, Get, Post, Put, Delete, BodyParam, QueryParam, Req, Res, UseBefore } from 'routing-controllers'
import { Request, Response } from 'express'
import { getConnectionManager, Repository, getRepository } from 'typeorm'
import Users from '../models/Users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { key } from '../hash.json'


@Controller()
export default class UsersController {

    private userRepository: Repository<Users>

    constructor () {
        this.userRepository = getConnectionManager().get().getRepository(Users)
    }

    @Post("/users/signup")
    async createUser(@Req() request: Request, @Res() response: Response) {
       const user = new Users()

       const password = await bcrypt.hash(request.body.password, 10)
       user.login = request.body.login
       user.nickname = request.body.nickname
       user.password = password

       await this.userRepository.save(user)

       response.send("usuario criado com sucesso")
    }

    @Post("/users/signin")
    async loginUser(@Req() request: Request, @Res() response: Response) {
        const user = await this.userRepository.findOne({
            where: {
                login: request.body.login
            }
        })

        if(!user) {
            return response.status(400).send("Usuário não encontrado!")
        }

        if(!await bcrypt.compare(request.body.password, user.password)) {
            return response.status(400).send("Senha incorreta!")
        }

        const token = jwt.sign({ id: user.id }, key, { expiresIn: 86400 })

        return response.status(400).json({
            token, user: {
                id: user.id,
                login: user.login,
                nickname: user.nickname
            }
        })

        
    }
}