import { Controller, Get, Post, Put, Delete, Req, Res, UploadedFile, UseBefore } from 'routing-controllers'
import { Request, Response } from 'express'
import { Repository, getRepository, Like } from 'typeorm'
import fs from 'fs'
import path from 'path'
import multerConfig from '../config/multer'
import Posts from '../models/Posts'


@Controller()
export default class PostsController {

    public postsRepository: Repository<Posts>

    constructor() {
        this.postsRepository = getRepository(Posts)
    }

    @Post("/posts/create")
    async uploadFile(@UploadedFile("filename", { options: multerConfig }) file: any,
    @Req() request: Request, @Res() response: Response) {
        const post = new Posts()
        post.title = request.body.title
        post.content = request.body.content
        post.userId = request.body.userId
        post.urlImage = file.key
        post.path = request.body.path

        await this.postsRepository.save(post)

        return response.status(200).send("Post criado com sucesso")
    }

    @Get("/posts/all/get")
    async getAllPosts(@Req() request: Request, @Res() response: Response) {
        const posts = await this.postsRepository.find({
            select: ['title', 'urlImage', 'id', 'path'],
            order: {
                id: "DESC"
            }
        })

        return response.status(200).json(posts)
    }

    @Get("/posts/get")
    async getPosts(@Req() request: Request, @Res() response: Response) {
        const posts = await this.postsRepository.find({
            take: 4,
            select: ['title', 'urlImage', 'id', 'path'],
            order: {
                id: "DESC"
            }
        })

        return response.status(200).json(posts)
    }

    @Get("/views/get")
    async getMostViewedPosts(@Req() request: Request, @Res() response: Response) {
        const posts = await this.postsRepository.find({
            take: 3,
            select: ['title', 'urlImage', 'id', 'path', 'views'],
            order: {
                views: "DESC"
            }
        })

        return response.status(200).json(posts)
    }

    @Get("/posts/get/:id")
    async getPost(@Req() request: Request, @Res() response: Response) {
        const post = await this.postsRepository.findOne(request.params.id)

        if(!post) {
            return response.status(400).send("user not found")
        }

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

    @Get("/posts/path/get")
    async getPostsByPath(@Req() request: Request, @Res() response: Response) {
        const post = await this.postsRepository.findOne({
            where: {
                path: request.query.path
            }, relations: ["user"]
        })

        if(!post) {
            return response.status(400).send("post not found")
        }

        post.views++
        await this.postsRepository.save(post)
        post.user.password = undefined as unknown as string

        return response.status(200).json(post)
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
        fs.unlink(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', String(request.query.urlImage)), (err) => {
            if(err) {
                console.log(err)
                return
            }

            console.log('file deleted')
        })
        return response.status(200).send("post successfuly deleted")
    }
}