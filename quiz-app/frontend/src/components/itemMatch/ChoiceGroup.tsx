import { motion } from 'framer-motion'
import type { ItemGroup } from '../../store/memoryMatchStore'

type GroupState = 'idle' | 'correct' | 'wrong'

interface Props {
  items: ItemGroup
  state: GroupState
  onClick: () => void
  colorAccent: string
}

export default function ChoiceGroup({ items, state, onClick, colorAccent }: Props) {
  const bgClass =
    state === 'correct' ? 'bg-[#d3f9d8]' :
    state === 'wrong'   ? 'bg-[#ffe3e3]' :
    'bg-cream'

  const borderColor =
    state === 'correct' ? '#2f9e44' :
    state === 'wrong'   ? '#c92a2a' :
    '#4a3728'

  const shadow =
    state === 'correct' ? '4px 4px 0 #2f9e44' :
    state === 'wrong'   ? '4px 4px 0 #c92a2a' :
    '4px 4px 0 #4a3728'

  const leftBorder = `8px solid ${state === 'idle' ? colorAccent : borderColor}`

  return (
    <motion.div
      onClick={state === 'idle' ? onClick : undefined}
      animate={
        state === 'correct'
          ? { scale: 1.04 }
          : state === 'wrong'
          ? { x: [0, -7, 7, -7, 7, 0] }
          : { scale: 1 }
      }
      transition={{ duration: 0.35 }}
      whileHover={state === 'idle' ? { y: -3, boxShadow: '4px 7px 0 #4a3728' } : {}}
      className={`flex gap-[10px] items-center justify-center px-[18px] py-[14px] relative ${bgClass} ${state === 'idle' ? 'cursor-pointer' : 'cursor-default'}`}
      style={{
        border: `4px solid ${borderColor}`,
        borderLeft: leftBorder,
        boxShadow: shadow,
        borderRadius: 0,
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      {state === 'correct' && (
        <span className="absolute top-[-2px] right-[6px] font-pixel text-[10px] text-[#2f9e44]">✓</span>
      )}
      {state === 'wrong' && (
        <span className="absolute top-[-2px] right-[6px] font-pixel text-[10px] text-[#c92a2a]">✗</span>
      )}
      {items.map((item, i) => (
        <img
          key={item.id + i}
          src={item.src}
          alt={item.label}
          className="w-[52px] h-[52px] pixelated object-contain"
        />
      ))}
    </motion.div>
  )
}
