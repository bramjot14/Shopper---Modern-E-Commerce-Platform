import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign up</h1>
        <div className="loginsignup-feilds">
          <input type="text" placeholder='Your Name' />
          <input type="email" placeholder='Email Address' />
          <input type="passsword" placeholder='Password' />
          <button>Continue</button>
          <p className='loginsignup-login'>Already have an account? <span>Login</span></p>
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing, I agree to the terms of use & privacy policy. </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup