import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
}