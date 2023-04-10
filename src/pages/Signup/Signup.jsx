import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import { useAuth } from '../../context/AuthContext'
import { auth } from '../../firebase'
import { getErrorSignupMessage } from '../../utils/getErrorMessage'
import styles from './Signup.module.css'

const schema = yup.object({
  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
})

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  async function submitForm({ email, password }) {
    try {
      setLoading(true)

      await signup(auth, email, password)
      toast.success('User successfully created \n Redirecting...')

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      const errorMessage = getErrorSignupMessage(error.code)
      toast.error(errorMessage)

      setLoading(false)
    } finally {
      setLoading(false)
    }

    reset()
  }

  return (
    <div className={styles.signup}>
      <ToastContainer />
      <form noValidate onSubmit={handleSubmit(submitForm)}>
        <h1 className={styles.signup__title}>Sign up</h1>

        <div className={styles.signup__inputs}>
          <div>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              {...register('email')}
              type="text"
              className={styles.signup__input}
              name="email"
              id="email"
            />
            {errors?.email && (
              <p className={styles.signup__error}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.signup__input}
              {...register('password')}
              type="password"
              name="password"
              id="password"
            />
            {errors?.password && (
              <p className={styles.signup__error}>{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className={styles.label} htmlFor="password_confirm">
              Confirm your password
            </label>
            <input
              className={styles.signup__input}
              {...register('password_confirm')}
              type="password"
              id="password_confirm"
            />
            {errors?.password_confirm && (
              <p className={styles.signup__error}>
                {errors.password_confirm.message}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className={styles.signup__button}
        >
          Sign up
        </button>
      </form>
      <p className={styles.login__link}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  )
}
