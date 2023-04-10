import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useAuth } from './context/AuthContext'
import DashBoard from './pages/Dashboard/DashBoard'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Login from './pages/Login/Login'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Signup from './pages/Signup/Signup'
import UpdateProfile from './pages/UpdateProfile/UpdateProfile'

function App() {
  const { currentUser } = useAuth()
  console.log({currentUser});

  return (
    <div className="container">
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={currentUser ? <DashBoard /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="//update-profile" element={<UpdateProfile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
