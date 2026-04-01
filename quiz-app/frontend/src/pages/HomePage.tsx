import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function HomePage() {
  const user = useAuthStore(s => s.user)
  const navigate = useNavigate()

  return (
    <div className="grass-bg min-h-screen flex flex-col items-center justify-center gap-7 p-8">

      {/* 游戏标题牌 */}
      <div className="bg-pink pixel-border-xl px-12 py-[18px] text-center">
        <div className="font-pixel text-[36px] text-brown leading-relaxed">ITEM</div>
        <div className="font-pixel text-[36px] text-brown leading-relaxed">MATCH</div>
      </div>

      {/* 玩家信息面板 */}
      <div className="bg-cream pixel-border-lg px-9 py-7 flex flex-col items-center gap-4 min-w-[320px]">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            className="w-20 h-20 border-[4px] border-brown shadow-[3px_3px_0_#4a3728] pixelated"
          />
        ) : (
          <div className="w-20 h-20 bg-gold border-[4px] border-brown shadow-[3px_3px_0_#4a3728] flex items-center justify-center text-[40px]">
            🧑
          </div>
        )}

        {/* 用户名 */}
        <div className="bg-gold border-[3px] border-brown px-5 py-2">
          <span className="font-pixel text-base text-brown">{user?.displayName ?? 'Player'}</span>
        </div>

        {/* 邮箱 */}
        <span className="font-pixel text-xs text-tan">{user?.email}</span>
      </div>

      {/* 进入游戏按钮 */}
      <button
        onClick={() => navigate('/dashboard')}
        onMouseDown={e => {
          e.currentTarget.style.transform = 'translate(3px,3px)'
          e.currentTarget.style.boxShadow = '3px 3px 0 #4a3728'
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = ''
          e.currentTarget.style.boxShadow = '6px 6px 0 #4a3728'
        }}
        className="px-14 py-[18px] bg-mint text-brown pixel-border-xl font-pixel text-lg rounded-none cursor-pointer"
      >
        ▶ 进入游戏
      </button>

    </div>
  )
}
