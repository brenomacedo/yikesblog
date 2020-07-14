import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm'

export class createUsers1594693164813 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                }, {
                    name: "nickname",
                    type: "varchar",
                    isUnique: true
                }, {
                    name: "login",
                    type: "varchar",
                    isUnique: true
                }, {
                    name: "password",
                    type: "varchar"
                }
            ]
        }))
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }
}