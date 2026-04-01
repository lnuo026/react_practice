import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { apiFetch } from '../../lib/api'

interface Props {
  score: number
  correctRounds: number
  streak: number
  onRestart: () => void
  onHome: () => void
}

export default function PixelSummary({ score, correctRounds, streak, onRestart, onHome }: Props) {
  const saved = useRef(false)

  useEffect(() => {
    if (saved.current) return
    saved.current = true
    apiFetch('/game/session', {
      method: 'POST',
      body: JSON.stringify({
        score,
        level: 1,
        duration: 0,
        accuracy: Math.round((correctRounds / 5) * 100),
        totalRounds: 5,
        gameType: 'item-match',
      }),
    }).catch(() => {})
  }, [])

  const accuracy = Math.round((correctRounds / 5) * 100)

  const rows = [
    { label: '总得分',   value: String(score),        color: '#ffd43b' },
    { label: '准确率',   value: `${accuracy}%`,        color: '#69db7c' },
    { label: '答对轮数', value: `${correctRounds}/5`,  color: '#74c0fc' },
    { label: '最长连胜', value: String(streak),         color: '#f783ac' },
  ]

  function btnPress(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.transform = 'translate(2px,2px)'
    e.currentTarget.style.boxShadow = '2px 2px 0 #4a3728'
  }
  function btnRelease(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.transform = ''
    e.currentTarget.style.boxShadow = '4px 4px 0 #4a3728'
  }

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="bg-cream pixel-border-xl p-8 px-9 flex flex-col items-center gap-5 max-w-[460px] w-full"
    >
      {/* 标题 */}
      <div className="bg-pink pixel-border px-7 py-[10px]">
        <span className="font-pixel text-lg text-brown">GAME CLEAR!</span>
      </div>

      {/* 数据行 */}
      <div className="w-full flex flex-col gap-3">
        {rows.map(row => (
          <div
            key={row.label}
            className="flex justify-between items-center bg-warm border-[3px] border-brown px-[18px] py-3"
          >
            <span className="font-pixel text-sm text-mocha">{row.label}</span>
            <span
              className="font-pixel text-[20px] shadow-[2px_2px_0_#4a3728]"
              style={{ color: row.color }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* 按钮 */}
      <div className="flex gap-4 mt-2">
        {[
          { label: '再来一局', bg: '#69db7c', fn: onRestart },
          { label: '返回主页', bg: '#ffd43b', fn: onHome },
        ].map(btn => (
          <button
            key={btn.label}
            onClick={btn.fn}
            onMouseDown={btnPress}
            onMouseUp={btnRelease}
            className="px-[26px] py-[14px] text-brown pixel-border rounded-none font-pixel text-base cursor-pointer leading-snug"
            style={{ background: btn.bg }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
