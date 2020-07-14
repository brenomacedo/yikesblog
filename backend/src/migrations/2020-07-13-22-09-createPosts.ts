import {
    MigrationInterface,
    TableForeignKey,
    Table,
    QueryRunner
} from 'typeorm'

export default class createPosts implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "posts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                }, {
                    name: "title",
                    type: "varchar",
                    isUnique: true
                }, {
                    name: "content",
                    type: "text"
                }, {
                    name: "urlImage",
                    type: "varchar"
                }, {
                    name: "views",
                    type: "int"
                }, {
                    name: "date",
                    type: "date"
                }, {
                    name: "userId",
                    type: "int"
                }
            ]
        }))

        await queryRunner.createForeignKey("posts", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users"
        }))
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("posts")
    }
}