import { Routes, Route } from 'react-router-dom'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { ProtectedRoutes } from './ProtectedRoutes.js'
import { Dashboard } from '../pages/Dashboard.js'

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
      </Routes>
    </>
  )
}
