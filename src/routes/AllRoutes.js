import { Routes, Route } from 'react-router-dom'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { ProtectedRoutes } from './ProtectedRoutes.js'
import { Dashboard } from '../pages/Dashboard.js'
import { Errorpage } from '../pages/404.js'

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="404" element={<Errorpage />} />

        <Route path="dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
      </Routes>
    </>
  )
}
