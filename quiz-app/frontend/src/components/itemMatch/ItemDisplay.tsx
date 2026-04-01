import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { ItemGroup } from '../../store/memoryMatchStore'

const SLOT_COLORS = ['#f783ac', '#74c0fc', '#ffd43b']

interface Props {
  items: ItemGroup
  duration: number
}

export default function ItemDisplay({ items, duration }: Props) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    setProgress(100)
    const start = Date.now()
    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.max(0, 100 - (elapsed / duration) * 100))
      if (elapsed >= duration) clearInterval(tick)
    }, 50)
    return () => clearInterval(tick)
  }, [duration, items])

  const barColor = progress > 60 ? '#69db7c' : progress > 30 ? '#ffd43b' : '#f47373'

  return (
    <div className="flex flex-col items-center gap-5">

      {/* 标题牌 */}
      <div className="bg-gold pixel-border px-5 py-2">
        <span className="font-pixel text-[11px] text-brown">记住这三件物品！</span>
      </div>

      {/* 三个物品槽 */}
      <div className="flex gap-5">
        {items.map((item, i) => (
          <motion.div
            key={item.id + i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 180 }}
            className="w-24 h-24 bg-cream flex items-center justify-center"
            style={{
              border: '4px solid #4a3728',
              boxShadow: `4px 4px 0 #4a3728, inset 0 0 0 3px ${SLOT_COLORS[i]}`,
              borderRadius: 0,
            }}
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-[68px] h-[68px] pixelated object-contain"
            />
          </motion.div>
        ))}
      </div>

      {/* 倒计时进度条 */}
      <div className="w-[340px] h-[14px] bg-sand border-[3px] border-brown shadow-[2px_2px_0_#4a3728]">
        <div
          className="h-full transition-[background] duration-400"
          style={{ width: `${progress}%`, background: barColor }}
        />
      </div>

    </div>
  )
}
