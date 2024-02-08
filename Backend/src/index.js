const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const accountRoutes = require('./routes/account')
const sequelize = require('./database/connection')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(bodyParser.json())
app.use(cors({
  origin: '*'
}))
app.use('/users', userRoutes)
app.use('/accounts', accountRoutes)
sequelize.sync({
  alter: true
  // force:true
}).then(() => {
  console.log('Database Synced')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
