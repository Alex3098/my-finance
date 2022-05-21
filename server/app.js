require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models')

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

// Routers
const userRoutes = require('./routes/register')
const accountRoutes = require('./routes/accounts')

app.use('/api/v1/register', userRoutes)
app.use('/api/v1/accounts', accountRoutes)

app.listen(PORT, async () => {
  console.log(`Sever started on port ${PORT}`)
  // Recreate DB
  await sequelize.sync({ force: true })
  // await sequelize.authenticate()
  console.log('DB connected')
})
