import { Controller, Get, Post, Put, Delete, Req, Res } from 'routing-controllers'
import { Request, Response } from 'express'
import { Repository, getRepository } from 'typeorm'
import Posts from '../models/Posts'

@Controller()
export default class PostsController {

    public postsRepository: Repository<Posts>

    constructor() {
        this.postsRepository = getRepository(Posts)
    }

    @Post("/posts/create")
    async createPost(@Req() request: Request, @Res() response: Response) {
        const post = new Posts()
        post.title = request.body.title
        post.content = request.body.content
        post.userId = request.body.userId
        post.urlImage = request.body.urlImage

        await this.postsRepository.save(post)

        return response.status(200).send("Post criado com sucesso")
    }
}