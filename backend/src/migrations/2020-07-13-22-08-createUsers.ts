import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm'

export class createUsers implements MigrationInterface {
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
                }, {
                    name: "posts",
                    type: "int",
                    isArray: true
                }
            ]
        }))

        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["posts"],
            referencedColumnNames: ["id"],
            referencedTableName: "posts",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }))
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("question")
    }
}