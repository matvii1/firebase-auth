import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import * as yup from 'yup'
import { useAuth } from '../../context/AuthContext'
import styles from './ForgotPassword.module.css'

const schema = yup.object({
  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is required'),
})

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  async function submitForm({ email }) {
    setLoading(true)
    try {
      await resetPassword(email)
      setLoading(false)

      toast.success('Check your inbox for further instructions')
      reset()
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error('Could not reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.signup}>
      <ToastContainer />
      <form noValidate onSubmit={handleSubmit(submitForm)}>
        <h1 className={styles.signup__title}>Password Reset</h1>

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
        </div>

        <button
          disabled={loading}
          type="submit"
          className={styles.signup__button}
        >
          Reset password
        </button>
      </form>
      <p className={styles.register__link}>
        Don't have an account yet? <Link to="/signup">Register</Link>
      </p>
      <p className={styles.login__link}>
        <Link to="/login">Log In</Link>
      </p>
    </div>
  )
}
