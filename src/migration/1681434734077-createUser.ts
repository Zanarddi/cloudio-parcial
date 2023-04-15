import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUser1681434734077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `create table user (
                email varchar(255) primary key not null,
                nome varchar(100) not null,
                theme char(1) default 'D' check (theme in ('L', 'D')),
                language char(2) default 'en',
                magic_create boolean default false,
                created_at timestamp not null default current_timestamp,
                updated_at timestamp not null default current_timestamp on update current_timestamp
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `drop table user;`
        )
    }

}
