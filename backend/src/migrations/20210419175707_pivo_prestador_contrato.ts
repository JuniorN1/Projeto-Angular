import { Knex } from "knex";




export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('pivo_prestador_contrato', function (table) {
        table.increments("pivo_prestador_id");
        table.integer('prestador_id').notNullable().references('prestador_id').inTable('prestador');
        table.integer('contrato_id').notNullable().references('contrato_id').inTable('contrato');
        table.boolean('delete_status').notNullable();
        // table.integer('user_id').references('user.id');
     
 });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('pivo_prestador_contrato');
}

