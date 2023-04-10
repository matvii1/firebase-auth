import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

function wait(delay) {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, delay)
  })
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  function signup(auth, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(auth, email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function changeEmail(email) {
    return updateEmail(currentUser, email)
  }

  function changePassword(password) {
    return updatePassword(currentUser, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    loading,
    login,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && <p>Loading...</p>}
    </AuthContext.Provider>
  )
}
