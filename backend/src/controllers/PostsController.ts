import { Controller, Get, Post, Put, Delete, Req, Res } from 'routing-controllers'
import { Request, Response, response } from 'express'
import { Repository, getRepository, Like } from 'typeorm'
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

    @Get("/posts/get")
    async getPosts(@Req() request: Request, @Res() response: Response) {
        const posts = await this.postsRepository.find()
        return response.status(200).json(posts)
    }

    @Get("/posts/get/:id")
    async getPost(@Req() request: Request, @Res() response: Response) {
        const post = await this.postsRepository.findOne(request.params.id, {
            relations: ["user"]
        })
        return response.status(200).json(post)
    }

    @Get("/posts/search")
    async searchPosts(@Req() request: Request, @Res() response: Response) {
        const posts = await this.postsRepository.find({
            where: {
                title: Like(`%${request.query.post}%`)
            }
        })

        return response.status(200).json(posts)
    }

    @Put("/posts/update/:id")
    async updatePost(@Req() request: Request, @Res() response: Response) {
        const post = await this.postsRepository.findOne(request.params.id)
        
        if(!post) {
            return response.send(404).send("post not found")
        }

        post.title = request.body.title
        post.content = request.body.content

        await this.postsRepository.save(post)

        return response.status(200).send("post successfuly updated")
    }

    @Delete("/posts/delete/:id")
    async deletePost(@Req() request: Request, @Res() response: Response) {
        await this.postsRepository.delete(request.params.id)
        
        return response.status(200).send("post successfuly deleted")
    }
}