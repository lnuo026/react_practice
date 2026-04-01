import { Routes, Route, useLocation } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import ItemMatchPage from "./pages/ItemMatchPage"
import ProtectedRouter from "./components/ProtectedRoute"
import { useChiptuneMusic } from "./hooks/useChiptuneMusic"

function MusicButton() {
  const { isPlaying, toggle } = useChiptuneMusic()
  const { pathname } = useLocation()
  if (pathname === '/') return null
  return (
    <button
      onClick={toggle}
      title={isPlaying ? '关闭音乐' : '开启音乐'}
      className={`fixed bottom-5 right-5 z-[200] w-[52px] h-[52px] pixel-border font-pixel text-[22px] flex items-center justify-center transition-colors duration-200 cursor-pointer ${isPlaying ? 'bg-gold' : 'bg-sand'}`}
      onMouseDown={e => {
        e.currentTarget.style.transform = 'translate(2px,2px)'
        e.currentTarget.style.boxShadow = '2px 2px 0 #4a3728'
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = '4px 4px 0 #4a3728'
      }}
    >
      {isPlaying ? '🎵' : '🔇'}
    </button>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/home" element={
          <ProtectedRouter><HomePage /></ProtectedRouter>
        } />

        <Route path="/dashboard" element={
          <ProtectedRouter><DashboardPage /></ProtectedRouter>
        } />

        <Route path="/item-match" element={
          <ProtectedRouter><ItemMatchPage /></ProtectedRouter>
        } />
      </Routes>

      <MusicButton />
    </>
  )
}
