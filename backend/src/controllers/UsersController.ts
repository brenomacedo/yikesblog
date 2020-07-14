import { Controller, Param, Body, Get, Post, Put, Delete, BodyParam, QueryParam, Req, Res, UseBefore } from 'routing-controllers'
import { Request, Response } from 'express'
import bodyParser from 'body-parser'
@Controller()
export default class UsersController {
    @Post("/users")
    post(@Req() request: Request, @Res() response: Response) {
       return response.send(request.body)
    }
}