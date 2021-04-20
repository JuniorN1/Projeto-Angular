import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('contrato', function (table) {
        table.increments("contrato_id");
        table.integer('prestador_id').notNullable();
        table.date('data_inicio').notNullable();
        table.date('data_fim').notNullable();
        table.string('servico_prestado').notNullable();
       
     
 });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('contrato');
}


