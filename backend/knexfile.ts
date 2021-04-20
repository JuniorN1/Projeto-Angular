// Update with your config settings.

interface KnexConfig {
  [key: string]: object;
};

const knexConfig: KnexConfig = {
  development: {
    client: 'pg',
    connection: {
        host:'banco-postgress',
        port: 5432,
        user: 'test',
        password: 'test',
        database: 'test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'src/migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: {
        host:'banco-postgress',
        port: 5432,
        user: 'test',
        password: 'test',
        database: 'test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
        host:'banco-postgress',
        port: 5432,
        user: 'test',
        password: 'test',
        database: 'test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'src/migrations'
    }
  }
};

export default knexConfig;
