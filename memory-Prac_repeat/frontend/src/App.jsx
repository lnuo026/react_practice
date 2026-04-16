 import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' ;
 import Navbar from './components/Navbar';
 import DeckCard from './components/DeckCard';
 import FlashCard from './components/FlashCard';
 import ProtectedRoute from './components/ProtectedRoute';
 import { AuthProvider } from './auth/AuthContext';
 import StudyPage from './pages/StudyPage';
 import RegisterPage from './pages/RegisterPage'; 
 import HomePage from './pages/HomePage';
 import LoginPage from './pages/LoginPage';
 import DeckPage from './pages/DeckPage';


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
        

          <Route 
          path= "/deck/:deckId"
          element={
            <ProtectedRoute>
            <DeckPage />
            </ProtectedRoute>
        
          } 
        />

        <Route 
        path="/study/:deckId" 
        element={
          <ProtectedRoute>
            <StudyPage />
          </ProtectedRoute>
        
        } 
        />

      {/*
       * 是通配符，意思是"所有其他路径"。 */}
          <Route 
          path="/*" 
          element={<div>About Page</div>} 
          />

        </Routes>
        </BrowserRouter>
        </AuthProvider>
  )
}