import React, { useEffect, useState } from 'react'
import { getWeatherData } from '../actions/weatherActions'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import Loading from './Loading'
import { logout } from '../actions/userActions'
import Moment from 'react-moment'
import './landing.css'
const Landing = ({ history }) => {
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getWeatherData(city))
  }
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetails } = userLogin
  const WeatherDetails = useSelector((state) => state.WeatherDetails)
  const { error, loading, data } = WeatherDetails
  const [city, setCity] = useState('')
  const celsiusTemp = (Kelvintemp) => {
    return parseFloat(Kelvintemp - 273.15).toFixed(2)
  }
  useEffect(() => {
    !userDetails && history.push('/login')
    dispatch(getWeatherData('Hongkong'))
  }, [dispatch, history, userDetails])
  const LogOut = () => {
    dispatch(logout())
  }
  const showMenu = () => {
    document.querySelector('.logout').classList.toggle('showMenu')
  }
  return (
    <div className='container'>
      <h1 className='title title-landing'>Weather App</h1>
      <div className='UserInfo'>
        <AccountCircleIcon />
        <div className='UserInfoInner'>
          <span style={{ fontSize: '13px' }}>{userDetails?.name}</span>
          <ExpandMoreIcon onClick={showMenu} style={{ cursor: 'pointer' }} />
          <span className='logout' onClick={LogOut}>
            LogOut
          </span>
        </div>
      </div>
      <div className='weather-Info'>
        <div className='top'>
          <form className='landing-form' onSubmit={handleSubmit}>
            <input
              className='landing-input'
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <button className='landing-btn' type='submit'>
              <SearchIcon style={{ cursor: 'pointer' }} />
            </button>
          </form>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {error && <Message message={error} color='#00A170' />}

            {data && (
              <>
                <div className='middle'>
                  <div className='middle-top'>
                    <span>
                      {data?.name}, <span>{data?.sys.country}</span>
                    </span>
                    <span>
                      As of <Moment format='hh:mm a'>{Date.now()}</Moment>
                    </span>
                    <div className='middle-info'>
                      <span>
                        {' '}
                        {data && celsiusTemp(data?.main.temp)} &deg; C
                      </span>
                      <div className='middle-info-inner'>
                        <img
                          src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                          alt='image'
                        />
                        <span>{data?.weather[0].description}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='middle-bottom'>
                  <div className='info-control'>
                    <span>High/Low</span>
                    <span>
                      {celsiusTemp(data?.main.temp_min)} &deg;C /{' '}
                      {celsiusTemp(data?.main.temp_max)} &deg;C
                    </span>
                    <div className='underline'></div>
                  </div>
                  <div className='info-control'>
                    <span>Pressure</span>
                    <span>{data?.main.pressure} mm of hg</span>
                    <div className='underline'></div>
                  </div>
                  <div className='info-control'>
                    <span>Humidity</span>
                    <span>{data?.main.humidity} %</span>
                    <div className='underline'></div>
                  </div>
                  <div className='info-control'>
                    <span>Wind Speed</span>
                    <span>{data?.wind.speed} m/s</span>
                    <div className='underline'></div>
                  </div>
                  <div className='info-control'>
                    <span>Sunrise</span>
                    <span>
                      {' '}
                      <Moment format='hh:mm a' unix>
                        {data?.sys.sunrise}
                      </Moment>{' '}
                    </span>
                    <div className='underline'></div>
                  </div>{' '}
                  <div className='info-control'>
                    <span>Sunset</span>
                    <span>
                      <Moment format='hh:mm a' unix>
                        {data?.sys.sunset}
                      </Moment>{' '}
                    </span>
                    <div className='underline'></div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Landing
