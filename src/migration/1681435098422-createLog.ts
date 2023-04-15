import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateLog1681435098422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `create table log (
                id int primary key auto_increment,
                description varchar(255) not null,
                created_at timestamp not null default current_timestamp
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `drop table log`
        )
    }

}
