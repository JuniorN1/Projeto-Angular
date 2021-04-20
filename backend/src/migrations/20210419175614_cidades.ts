import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cidade', function (table) {
        table.increments("cidade_id");
        table.string('cidade').notNullable();
     
 });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cidade');
}

