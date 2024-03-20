import { Routes, Route } from 'react-router-dom'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { UserWizard1 } from '../components/new_user_wizard/NewUserWizard-1.js'
import { UserWizard2 } from '../components/new_user_wizard/NewUserWizard-2.js'
import { ProtectedRoutes } from './ProtectedRoutes.js'
import { Dashboard } from '../pages/Dashboard.js'
import { Errorpage } from '../pages/404.js'
import { UserProfile } from '../pages/UserProfile.js'
import { EditUserProfile } from '../pages/EditUserProfile.js'
import { Update } from '../pages/Update.js'
import { UnitProfile } from '../pages/UnitProfile.js'


export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="404" element={<Errorpage />} />

        <Route path="dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path="user" element={<ProtectedRoutes><UserProfile /></ProtectedRoutes>} />
        <Route path="user/edit" element={<ProtectedRoutes><EditUserProfile /></ProtectedRoutes>} />
        <Route path="update" element={<ProtectedRoutes><Update /></ProtectedRoutes>} />
        <Route path="unit" element={<ProtectedRoutes><UnitProfile /></ProtectedRoutes>} />
        <Route path="new-user-wizard-1" element={<ProtectedRoutes><UserWizard1 /></ProtectedRoutes>} />
        <Route path="new-user-wizard-2" element={<ProtectedRoutes><UserWizard2 /></ProtectedRoutes>} />
      </Routes>
    </>
  )
}
