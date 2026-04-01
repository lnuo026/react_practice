import type { Phase, ItemGroup } from '../../store/memoryMatchStore'
import ChoiceGroup from './ChoiceGroup'

const ACCENTS = ['#f783ac', '#74c0fc', '#69db7c', '#b197fc']

interface Props {
  groups: [ItemGroup, ItemGroup, ItemGroup, ItemGroup]
  correctGroupIndex: number
  selectedGroupIndex: number | null
  phase: Phase
  onSelect: (index: number) => void
}

export default function ChoiceBoard({ groups, correctGroupIndex, selectedGroupIndex, phase, onSelect }: Props) {
  function getState(i: number): 'idle' | 'correct' | 'wrong' {
    if (phase !== 'feedback') return 'idle'
    if (i === correctGroupIndex) return 'correct'
    if (i === selectedGroupIndex) return 'wrong'
    return 'idle'
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-[540px]">

      {/* 选择提示 */}
      <div className="bg-sky pixel-border-sm self-start px-[14px] py-[6px]">
        <span className="font-pixel text-[9px] text-brown">
          {phase === 'choosing' ? '选出刚才展示的那组' : ''}
        </span>
      </div>

      {/* 2×2 网格 */}
      <div className="grid grid-cols-2 gap-3">
        {groups.map((group, i) => (
          <ChoiceGroup
            key={i}
            items={group}
            state={getState(i)}
            colorAccent={ACCENTS[i]}
            onClick={() => phase === 'choosing' && onSelect(i)}
          />
        ))}
      </div>
    </div>
  )
}
