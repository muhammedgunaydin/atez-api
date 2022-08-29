const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atezapi',
  password: '12345',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM tbl_users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports={
    getUsers,
}
