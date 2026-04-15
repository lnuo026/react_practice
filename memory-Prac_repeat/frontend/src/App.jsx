 import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' ;
 import Navbar from './components/Navbar';
//  import DeckPage from './components/DeckPage';
 import FlashCard from './components/FlashCard';
 import ProtectedRoute from './components/ProtectedRoute';
 import { AuthProvider } from './auth/AuthContext';
 import StudyPage from './pages/StudyPage';
 import RegisterPage from './pages/RegisterPage'; 
 import HomePage from './pages/HomePage';
 import LoginPage from './pages/LoginPage';


//  任何页面都需要知道"当前用户是谁"  ，所以AuthProvider 包裹整个 App，任何页面都能访问到用户信息。 localStorage
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/flashcard" element={<FlashCard 
          front="Hi" back="Hello!" />} />

          
          <Route
          path="/"
          element= {
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          />
          <Route 
          path="/study" 
          element={
            <ProtectedRoute>
              <StudyPage />
            </ProtectedRoute>
          
          } 
          />

          <Route 
          path="/about" 
          element={<div>About Page</div>} 
          />
        </Routes>
        </BrowserRouter>
        </AuthProvider>
  )
}