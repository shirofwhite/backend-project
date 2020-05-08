// const Sequelize = require('sequelize');
// // your credentials
// DATABASE_URL = 'postgres://postgres:kororok66@127.0.0.1:5432/REALESTATE';

// const database = new Sequelize(DATABASE_URL);


const { Pool} = require('pg')
// const connectionString = 'postgresql://postgres:kororok66@127.0.0.1:5432/REALESTATE'
// const pool = new Pool({
//   connectionString: connectionString,
// })
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'REALESTATE',
    password: 'fk051098',
    port: 5432,
  })

pool.connect()

module.exports = pool;