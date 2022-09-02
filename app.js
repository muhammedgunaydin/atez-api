const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db/pg-conn')

app.use(express.json())
app.use(bodyParser.json())
app.use( 
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(volleyball)

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUsers)
app.put('/users/:id', db.updateUserDegree)
app.delete('/users/:id', db.deleteUser)

app.get('/department', db.getDepartments)
app.get('/department/:id', db.getDepartmentsById)
app.post('/department', db.createDepartments)
app.put('/department/:id', db.updateDepartmentLeader)
app.delete('/department/:id', db.deleteDepartment)

app.get('/location', db.getLocation)
app.get('/location/:id', db.getLocationById)
app.post('/location', db.createLocation)
app.put('/location/:id', db.updateLocationAdress)
app.delete('/location/:id', db.deleteLocation)

app.get('/degree', db.getDegree)
app.get('/degree/:id', db.getDegreeById)
app.post('/degree',db.createDegree)
app.put('/degree/:id',db.updateDegreeDate)
app.delete('/degree/:id',db.deleteDegree)

const port = 8000
app.listen(port, () => {
  console.log(`App started on port ${port}`)
})
