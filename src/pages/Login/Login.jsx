import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import * as yup from 'yup'
import { useAuth } from '../../context/AuthContext'
import { auth } from '../../firebase'
import { getErrorLoginMessage } from '../../utils/getErrorMessage'
import styles from './Login.module.css'

const schema = yup.object({
  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
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
    setLoading(true)
    try {
      await login(auth, email, password)
      setLoading(false)

      navigate('/')
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorLoginMessage(error.code)

      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }

    reset()
  }

  return (
    <div className={styles.signup}>
      <ToastContainer />
      <form noValidate onSubmit={handleSubmit(submitForm)}>
        <h1 className={styles.signup__title}>Log In</h1>

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
        </div>

        <button
          disabled={loading}
          type="submit"
          className={styles.signup__button}
        >
          Log in
        </button>
      </form>
      <div className={styles.register__link}>
        Don't have an account yet? <Link to="/signup">Register</Link>
        <div>
          <Link className={styles.forgot} to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  )
}
