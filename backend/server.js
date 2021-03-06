import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import userRoutes from './routes/UserRoutes.js'
import weatherRoutes from './routes/WeatherRoutes.js'
import path from 'path'

const app = express()
dotenv.config()
connectDB()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/weather', weatherRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}
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
