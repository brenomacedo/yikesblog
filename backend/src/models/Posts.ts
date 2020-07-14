import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity({ name: "posts" })
export default class Users {
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

    @Column()
    views!: number

    @CreateDateColumn()
    date!: Date

    @Column()
    userId!: number
}