import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('uf', function (table) {
        table.increments("uf_id");
        table.string('uf').notNullable();
     
 });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cidade');
}


