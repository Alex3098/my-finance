
import { React, useState } from 'react'
import Axios from 'axios'

const StartPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: ""
  })

  const [regStatus, setRegStatus] = useState(false)

  const handleChange = (e) => {    
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(formData.password === formData.passwordConfirm) {
      Axios.post('http://localhost:5000/api/v1/auth/register', {
        userName: formData.userName,
        email: formData.email,
        password: formData.password
      }).then(resonse => {
        if (resonse.status === 201) {
          setFormData({
            userName: '',
            email: '',
            password: '',
            passwordConfirm: ""
          })
          setRegStatus(prevStatus => !prevStatus)
        }
      })
      return
    }

    console.log('wrong passes');
  }

  return (
    <div>
      {
      !regStatus ?
      <form action='/' method='post' onSubmit={handleSubmit}>
        <input type='text' name='userName' onChange={handleChange} value={formData.userName} placeholder='UserName' required />
        <input type='email' name='email' onChange={handleChange} value={formData.email} placeholder='Email' required />
        <input type='password'name='password' onChange={handleChange} value={formData.password} placeholder='Password' required />
        <input type='password'name='passwordConfirm' onChange={handleChange} value={formData.passwordConfirm} placeholder='Confirm password' required />
        <input type='submit' value='Sign up' />
      </form>
      :
      <div>zaebok</div>
      }
    </div>
  )
}

export default StartPage