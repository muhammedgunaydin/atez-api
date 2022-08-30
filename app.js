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

const port = 8000
app.listen(port, () => {
  console.log(`App started on port ${port}`)
})
