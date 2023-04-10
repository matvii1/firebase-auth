import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
  const navigate = useNavigate()

  return (
    <div>
      <h3 style={{ fontWeight: 400 }}>Whoops... Page not found</h3>
      <div
        style={{ textAlign: 'center', marginTop: '0.6rem', cursor: 'pointer' }}
        onClick={() => navigate(-1)}
      >
        <a>Go back</a>
      </div>
    </div>
  )
}
