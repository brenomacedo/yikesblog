import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import Posts from './Posts'

@Entity({ name: "users" })
export default class Users {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column()
    nickname!: string
    
    @Column({
        unique: true
    })
    login!: string

    @Column()
    password!: string

    @OneToMany(type => Posts, posts => posts.user)
    posts!: Posts[]
}