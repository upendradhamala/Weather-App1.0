import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import './Auth.css'
const Login = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userDetails } = userLogin
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  useEffect(() => {
    userDetails && history.push('/')
  }, [history, userDetails])
  return (
    <div className='container'>
      <div className='inner-container'>
        <h1 className='title'>SIGN IN</h1>
        {error && <Message message={error} color='#00A170' />}

        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your Email'
              required
            />
          </div>
          <div className='form-control'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your Password'
              required
            />
          </div>
          <button type='submit' className='btn'>
            Login
          </button>
        </form>
        <span className='auth-bottom'>
          Not Registered Yet? <Link to='/register'>Register</Link>
        </span>
      </div>
    </div>
  )
}

export default Login
