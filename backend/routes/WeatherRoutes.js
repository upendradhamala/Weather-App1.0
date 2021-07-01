import express from 'express'
import asyncHandler from 'express-async-handler'
import Weather from '../models/Weather.js'
import { protect } from '../middlewares/authMiddleware.js'
import capitalize from '../utils/capitalize.js'
import axios from 'axios'
const router = express.Router()

router.get(
  '/:cityName',
  protect,
  asyncHandler(async (req, res) => {
    try {
      let city = req.params.cityName
      console.log('city name', city)

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
      )
      if (data) {
        await Weather.create({
          city: data.name,
          temperature: data.main.temp,
          mintemperature: data.main.temp_min,
          maxtemperature: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          country: data.sys.country,
          condition: data.weather[0].main,
          conditionIcon: data.weather[0].icon,
        })

        res.status(201).json(data)
      } else {
        const dataOld = await Weather.findOne({ city: capitalize(city) })

        if (dataOld) {
          res.status(201).json(dataOld)
        }
      }
    } catch (error) {
      res.status(403)
      throw new Error('No Data Found')
    }
  })
)
export default router
