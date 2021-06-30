import axios from 'axios'
import {
  WEATHER_DETAIL_FAIL,
  WEATHER_DETAIL_REQUEST,
  WEATHER_DETAIL_SUCCESS,
} from '../constants/weatherConstants'

export const getWeatherData = (cityName) => async (dispatch, getState) => {
  console.log('actions page')

  try {
    dispatch({
      type: WEATHER_DETAIL_REQUEST,
    })
    console.log('City', cityName)

    const {
      userLogin: { userDetails },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    }

    const { data } = await axios.get(`/api/weather/${cityName}`, config)

    dispatch({
      type: WEATHER_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: WEATHER_DETAIL_FAIL,
      payload: message,
    })
  }
}
