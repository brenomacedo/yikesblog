import {MigrationInterface, QueryRunner, getRepository} from "typeorm"
import SeedUsers from '../seeds/SeedUsers'
import Users from "../models/Users"

export class SeedUsers1594783104087 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository(Users).save(SeedUsers)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // do nothing
    }

}
