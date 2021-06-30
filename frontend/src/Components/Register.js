import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../Components/Message'
import { Link } from 'react-router-dom'
import './Auth.css'
const Register = ({ history }) => {
  const [message, setMessage] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordagain, setPasswordagain] = useState('')
  const [username, setUsername] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage(null)
    if (password !== passwordagain) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(username, email, password))
    }
  }
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userDetails } = userRegister
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetails: userInfo } = userLogin

  useEffect(() => {
    userInfo && history.push('/')
  }, [history, userInfo])
  return (
    <div className='container'>
      <div className='inner-container'>
        <h1 className='title'>SIGN UP</h1>
        {message && <Message message={message} color='#00A170' />}
        {error && <Message message={error} color='#00A170' />}

        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your Name'
              required
            />
          </div>
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
          <div className='form-control'>
            <input
              type='password'
              value={passwordagain}
              onChange={(e) => setPasswordagain(e.target.value)}
              placeholder='Enter password again'
              required
            />
          </div>
          <button type='submit' className='btn'>
            Register
          </button>
        </form>
        <span className='auth-bottom'>
          Already Have An Account? <Link to='/login'>Login</Link>
        </span>
      </div>
    </div>
  )
}

export default Register
