import { MigrationInterface, QueryRunner } from "typeorm";

export class PokemonEntities1746408370918 implements MigrationInterface {
    name = 'PokemonEntities1746408370918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "token_session" character varying, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"), CONSTRAINT "UQ_user_email" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
