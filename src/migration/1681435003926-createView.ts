import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateView1681435003926 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `create view v_user as
            select email, nome, theme, language, magic_create
            from user;;`
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `drop view v_user;`
        )
    }
}
