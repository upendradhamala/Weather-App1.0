import { WEATHER_DETAIL_FAIL, WEATHER_DETAIL_REQUEST, WEATHER_DETAIL_SUCCESS } from "../constants/weatherConstants"

export const WeatherDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case WEATHER_DETAIL_REQUEST:
      return { loading: true }
    case WEATHER_DETAIL_SUCCESS:
      return { loading: false, data: action.payload }
    case WEATHER_DETAIL_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
