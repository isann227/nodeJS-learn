const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_node',
    password: 'postgres',
    port: 5432, // Default PostgreSQL port
})

module.exports = pool