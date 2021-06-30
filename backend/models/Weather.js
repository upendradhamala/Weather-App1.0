import mongoose from 'mongoose'

const weatherSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  date: {
    type: Date,

    default: Date.now(),
  },
  temperature: {
    type: String,
    required: true,
  },
  mintemperature: {
    type: String,
    required: true,
  },
  maxtemperature: {
    type: String,
    required: true,
  },
  pressure: {
    type: String,
    required: true,
  },
  humidity: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  conditionIcon: {
    type: String,
    required: true,
  },
  sunrise: {
    type: Date,
    required: true,
  },
  sunset: {
    type: Date,
    required: true,
  },
})

const Weather = mongoose.model('Weather', weatherSchema)

export default Weather
