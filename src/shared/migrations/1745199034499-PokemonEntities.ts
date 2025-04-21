import { MigrationInterface, QueryRunner } from "typeorm";

export class PokemonEntities1745199034499 implements MigrationInterface {
    name = 'PokemonEntities1745199034499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "type" ("type_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_5baefb525328568515ffa7cce29" PRIMARY KEY ("type_id"))`);
        await queryRunner.query(`CREATE TABLE "trainer" ("trainer_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "second_name" character varying(100) NOT NULL, "age" smallint, "region" character varying(50), "badges" smallint NOT NULL DEFAULT '0', CONSTRAINT "PK_875d262be6ebcdf8ae82ba1cfdc" PRIMARY KEY ("trainer_id"))`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("pokemon_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "level" smallint NOT NULL DEFAULT '1', "attack" smallint NOT NULL DEFAULT '0', "defense" smallint NOT NULL DEFAULT '0', "speed" smallint NOT NULL DEFAULT '0', "is_legendary" boolean NOT NULL DEFAULT false, "type_id" uuid, "trainer_id" uuid, CONSTRAINT "UQ_1cb8fc72a68e5a601312c642c82" UNIQUE ("name"), CONSTRAINT "PK_8826fe3f317289857fe055cc976" PRIMARY KEY ("pokemon_id"))`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_9975e2038d190b4ac724d1f553d" FOREIGN KEY ("type_id") REFERENCES "type"("type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_2b55e0d79c6f14e669d9722d67a" FOREIGN KEY ("trainer_id") REFERENCES "trainer"("trainer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_2b55e0d79c6f14e669d9722d67a"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_9975e2038d190b4ac724d1f553d"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`DROP TABLE "trainer"`);
        await queryRunner.query(`DROP TABLE "type"`);
    }

}
