import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import styles from './Dashboard.module.css'

export default function DashBoard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    try {
      logout()
      navigate('/login')
    } catch (error) {
      toast.error('Could not log out')
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className={styles.dashboard}>
        <h2 className={styles.profile}>Profile</h2>

        <div className={styles.email}>
          <p>
            <b>Email:</b>
            {` ${currentUser.email}`}
          </p>
        </div>

        <Link to='/update-profile' className={styles.button}>Update profile</Link>
      </div>
      <div onClick={handleLogout} className={styles.link}>
        Log out
      </div>
    </div>
  )
}
