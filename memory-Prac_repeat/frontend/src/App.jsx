 import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' ;
 import HomePage from './pages/HomePage';
 import LoginPage from './pages/LoginPage';
 import RegisterPage from './pages/RegisterPage'; 
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';


//  任何页面都需要知道"当前用户是谁"  ，所以AuthProvider 包裹整个 App，任何页面都能访问到用户信息。 localStorage
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
          path="/"
          element= {
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          />
        </Routes>
        </BrowserRouter>
        </AuthProvider>
  )
}