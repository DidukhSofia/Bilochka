const Pool = require('pg').Pool

const pool = new Pool( {
    user: "postgres",
    host: "localhost",
    database: "beer",
    password: "sofia2004",
    port: 5432
});
module.exports = pool;