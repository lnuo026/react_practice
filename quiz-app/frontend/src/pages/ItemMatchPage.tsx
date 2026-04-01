import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMemoryMatchStore } from '../store/memoryMatchStore'
import ItemDisplay from '../components/itemMatch/ItemDisplay'
import ChoiceBoard from '../components/itemMatch/ChoiceBoard'
import PixelSummary from '../components/itemMatch/PixelSummary'
import { apiFetch } from '../lib/api'

function PixelButton({ children, bg, onClick, small }: {
  children: React.ReactNode; bg: string; onClick: () => void; small?: boolean
}) {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseDown={() => {
        if (ref.current) {
          ref.current.style.transform = 'translate(2px,2px)'
          ref.current.style.boxShadow = '2px 2px 0 #4a3728'
        }
      }}
      onMouseUp={() => {
        if (ref.current) {
          ref.current.style.transform = ''
          ref.current.style.boxShadow = '4px 4px 0 #4a3728'
        }
      }}
      className={`pixel-border text-brown rounded-none cursor-pointer font-pixel leading-snug ${small ? 'px-[18px] py-[10px] text-sm' : 'px-8 py-[14px] text-lg'}`}
      style={{ background: bg }}
    >
      {children}
    </button>
  )
}

export default function ItemMatchPage() {
  const navigate = useNavigate()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    phase, round, score, correctRounds, streak,
    targetItems, groups, correctGroupIndex, selectedGroupIndex, showDuration,
    startGame, endShowing, selectGroup, nextRound, resetGame,
  } = useMemoryMatchStore()

  function clearTimer() {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
  }

  useEffect(() => {
    clearTimer()
    if (phase === 'showing')  timerRef.current = setTimeout(endShowing, showDuration)
    if (phase === 'feedback') timerRef.current = setTimeout(nextRound, 1200)
    return clearTimer
  }, [phase, showDuration])

  useEffect(() => { return () => { clearTimer(); resetGame() } }, [])

  const handleQuit = useCallback(async () => {
    clearTimer()
    const playedRounds = round - (phase === 'summary' ? 0 : 1)
    if (playedRounds > 0) {
      await apiFetch('/game/session', {
        method: 'POST',
        body: JSON.stringify({
          score, level: 1, duration: 0,
          accuracy: Math.round((correctRounds / playedRounds) * 100),
          totalRounds: playedRounds, gameType: 'item-match',
        }),
      }).catch(() => {})
    }
    resetGame()
    navigate('/dashboard')
  }, [round, phase, score, correctRounds, resetGame, navigate])

  return (
    <div className="grass-bg min-h-screen flex flex-col items-center justify-center p-6">

      {/* 退出按钮 */}
      <div className="fixed top-4 left-4 z-[100]">
        <PixelButton bg="#f87171" onClick={handleQuit} small>← 退出</PixelButton>
      </div>

      {/* 主面板 */}
      <div className="bg-cream pixel-border-xl p-7 w-full max-w-[620px] flex flex-col items-center gap-5">

        {/* HUD 顶部 */}
        <div className="flex justify-between items-center w-full border-b-[4px] border-[#d9c4a8] pb-[14px]">
          <span className="font-pixel text-base text-brown">ITEM MATCH</span>
          {phase !== 'idle' && phase !== 'summary' && (
            <div className="flex gap-3">
              {[
                { label: 'ROUND',  val: `${round}/5`,   bg: '#f783ac' },
                { label: 'SCORE',  val: String(score),  bg: '#ffd43b' },
                { label: 'STREAK', val: String(streak), bg: '#69db7c' },
              ].map(item => (
                <div
                  key={item.label}
                  className="border-[3px] border-brown shadow-[2px_2px_0_#4a3728] px-3 py-[5px] flex flex-col items-center"
                  style={{ background: item.bg }}
                >
                  <span className="font-pixel text-[8px] text-brown">{item.label}</span>
                  <span className="font-pixel text-sm text-brown">{item.val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 开始界面 */}
        {phase === 'idle' && (
          <div className="flex flex-col items-center gap-6 py-2">
            <div className="bg-pink pixel-border p-3 px-9">
              <span className="font-pixel text-[22px] text-brown">ITEM MATCH</span>
            </div>

            <div className="bg-warm border-[3px] border-[#c8a96e] p-5 px-7 max-w-[380px] text-left">
              {[
                '👀  观察展示的 3 件物品',
                '🧠  快速记住它们',
                '🎯  从 4 组中选出相同的',
                '⚡  共 5 轮，时间越来越短',
              ].map(line => (
                <p key={line} className="font-pixel text-sm text-mocha m-0 mb-3 leading-loose">{line}</p>
              ))}
            </div>

            <PixelButton bg="#69db7c" onClick={startGame}>开始游戏</PixelButton>
          </div>
        )}

        {/* 展示阶段 */}
        {phase === 'showing' && (
          <ItemDisplay items={targetItems} duration={showDuration} />
        )}

        {/* 选择 / 反馈 */}
        {(phase === 'choosing' || phase === 'feedback') && (
          <ChoiceBoard
            groups={groups}
            correctGroupIndex={correctGroupIndex}
            selectedGroupIndex={selectedGroupIndex}
            phase={phase}
            onSelect={selectGroup}
          />
        )}

        {/* 结算 */}
        {phase === 'summary' && (
          <PixelSummary
            score={score}
            correctRounds={correctRounds}
            streak={streak}
            onRestart={startGame}
            onHome={() => navigate('/dashboard')}
          />
        )}

      </div>
    </div>
  )
}
