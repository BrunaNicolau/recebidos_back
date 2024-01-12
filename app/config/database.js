const pgp = require('pg-promise')();
const db = pgp({
    user: 'postgres',
    password: 'pg@2022',
    host: 'localhost',
    port: 5432,
    database: 'recebidos'
});

module.exports = db;

