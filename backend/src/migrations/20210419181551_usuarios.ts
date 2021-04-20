import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('usuarios', function (table) {
        table.increments("usuario_id");
        table.string('usuario_nome').notNullable();
        table.string('usuario_senha').notNullable();
     
 });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('usuarios');
}