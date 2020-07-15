import {
    MigrationInterface,
    TableForeignKey,
    Table,
    QueryRunner
} from 'typeorm'

export default class createPosts1594693202586 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "posts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
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
        }), true)

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