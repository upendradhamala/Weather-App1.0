import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import userRoutes from './routes/UserRoutes.js'
import weatherRoutes from './routes/WeatherRoutes.js'

const app = express()
dotenv.config()
connectDB()
const PORT = 5000 || process.env.PORT
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Backend is working perfectly')
})
app.use('/api/users', userRoutes)
app.use('/api/weather', weatherRoutes)

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  console.log('err', err)
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})