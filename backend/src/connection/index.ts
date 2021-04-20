import knex from 'knex';
import knexConfig from '../../knexfile'
const connection = knex(knexConfig.production);

export default connection;
