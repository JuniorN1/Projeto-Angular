import { Knex } from "knex";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('prestador', function (table) {
        table.increments("prestador_id");
        table.string('tipo').notNullable();
        table.string('cpf_cnpj').notNullable();
        table.string('nome_razao_social').notNullable();
        table.string('email').notNullable();
        table.string('cep').notNullable();
        table.string('logradouro').notNullable();
        table.string('numero').notNullable();
        table.string('complemento').notNullable();
        table.string('bairro').notNullable();
        table.integer('cidade_id').notNullable().references('cidade_id').inTable('cidade');
        table.integer('uf_id').notNullable().references('uf_id').inTable('uf');;
        table.boolean('delete_status').notNullable();
     
 });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('prestador');
}


