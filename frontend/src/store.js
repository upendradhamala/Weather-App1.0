import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { WeatherDetailsReducer } from './reducers/weatherReducers'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  WeatherDetails: WeatherDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails'))
  : null
const initialState = {
  userLogin: {
    userDetails: userInfoFromStorage,
  },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
