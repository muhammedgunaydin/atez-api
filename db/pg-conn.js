const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atezapi',
  password: '12345',
  port: 5432,
})

const getUsers = (req, res) => {
  pool.query('SELECT * FROM tbl_users', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM tbl_users WHERE id =$1', [id], (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows)
  })
}

const createUsers = (req, res) => {
  const {
    name,
    surname,
    mail,
    start_date,
    salary,
    department,
    degree,
    leader,
  } = req.body
  pool.query(
    'INSERT INTO tbl_users (name,surname,mail,start_date,salary,department,degree,leader) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
    [name, surname, mail, start_date, salary, department, degree, leader],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID ${result.rows[0].id}`)
    }
  )
}

const updateUserDegree = (req, res) => {
  const id = parseInt(req.params.id)
  const { degree } = req.body
  pool.query(
    'UPDATE tbl_users SET degree = $1 where id = $2',
    [degree, id],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(202).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('DELETE FROM tbl_users WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error
    }
    res.status(202).json(result.rows)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUsers,
  updateUserDegree,
  deleteUser,
}
