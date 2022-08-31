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

const getDepartments = (req, res) => {
  pool.query('SELECT * FROM tbl_department', (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows)
  })
}

const getDepartmentsById = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query(
    'SELECT * FROM tbl_department where id = $1',
    [id],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).json(result.rows)
    }
  )
}

const createDepartments = (req, res) => {
  const { name, leader, location } = req.body
  pool.query(
    'INSERT INTO tbl_department (name, leader, location) VALUES ($1,$2,$3) RETURNING *',
    [name, leader, location],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with id ${result.rows[0].id}`)
    }
  )
}

const updateDepartmentLeader = (req, res) => {
  const id = parseInt(req.params.id)
  const { leader } = req.body
  pool.query(
    'UPDATE tbl_department SET leader =$1 where id = $2',
    [leader, id],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(202).send(`User modified with ID : ${id}`)
    }
  )
}

const deleteDepartment = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query(
    'DELETE FROM tbl_department WHERE id = $1',
    [id],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(202).send('Department deleted successfully')
    }
  )
}

const getLocation = (req, res) => {
  pool.query('SELECT * FROM tbl_location', (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows)
  })
}

const getLocationById = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query(
    'SELECT * FROM tbl_location where id=$1',
    [id],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).json(result.rows)
    }
  )
}

const createLocation = (req, res) => {
  const { name, location, city, country } = req.body
  pool.query(
    'INSERT INTO tbl_location (name,location,city,country) VALUES ($1,$2,$3,$4) RETURNING *',
    [name, location, city, country],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(201).json(`Location added with id ${result.rows[0].id}`)
    }
  )
}

const updateLocationAdress = (req, res) => {
  const id = parseInt(req.params.id)
  const { location } = req.body
  pool.query(
    'UPDATE tbl_location set location=$1 where id = $2',
    [location, id],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(202).json(`Location modified with ID:${id}`)
    }
  )
}

const deleteLocation = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query(
    'DELETE FROM tbl_location WHERE id = $1',
    [id],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(202).send('Location deleted successfully')
    }
  )
}

const getDegree = (req, res) => {
  pool.query('SELECT * FROM tbl_degree', (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows)
  })
}

const getDegreeById = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query(
    'SELECT * FROM tbl_degree WHERE id = $1',
    [id],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).json(result.rows)
    }
  )
}

const createDegree = (req, res) => {
  const { start, finish, degree, department } = req.body
  pool.query(
    'INSERT INTO tbl_degree (start,finish,degree,department) VALUES ($1,$2,$3,$4) RETURNING *',
    [start, finish, degree, department],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(201).json(`Degree added with id ${result.rows[0].id}`)
    }
  )
}

const updateDegreeDate = (req, res) => {
  const id = parseInt(req.params.id)
  const { start, finish } = req.body
  pool.query(
    'UPDATE tbl_degree SET start=$1,finish=$2 where id=$3',
    [start, finish, id],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(202).send(`Degree modified with ID: ${id}`)
    }
  )
}

const deleteDegree = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('DELETE FROM tbl_degree WHERE id=$1', [id], (error, result) => {
    if (error) {
      throw error
    }
    res.status(202).send('Degree deleted successfully')
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUsers,
  updateUserDegree,
  deleteUser,

  getDepartments,
  getDepartmentsById,
  createDepartments,
  updateDepartmentLeader,
  deleteDepartment,

  getLocation,
  getLocationById,
  createLocation,
  updateLocationAdress,
  deleteLocation,

  getDegree,
  getDegreeById,
  createDegree,
  updateDegreeDate,
  deleteDegree,
}
