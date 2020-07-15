import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm'
import Users from './Users'

@Entity({ name: "posts" })
export default class Posts {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column()
    title!: string
    
    @Column({
        type: "text"
    })
    content!: string

    @Column()
    urlImage!: string

    @Column({
        default: 0
    })
    views!: number

    @Column()
    userId!: number

    @CreateDateColumn()
    date!: Date

    @ManyToOne(type => Users, users => users.posts)
    user!: Users
}