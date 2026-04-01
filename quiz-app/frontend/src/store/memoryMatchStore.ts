import { create } from 'zustand'
import { ALL_ITEMS, type GameItem } from '../data/items'

export type Phase = 'idle' | 'showing' | 'choosing' | 'feedback' | 'summary'
export type ItemGroup = [GameItem, GameItem, GameItem]

// 随机取 n 个不重复元素
function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr]
  const result: T[] = []
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * (copy.length - i))
    result.push(copy[idx])
    copy[idx] = copy[copy.length - 1 - i]
  }
  return result
}

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 根据轮数决定展示时间（ms）—— 共5轮
function getShowDuration(round: number): number {
  if (round <= 2) return 5000
  if (round <= 4) return 3000
  return 2000
}

// 生成3组干扰（每组替换1-2个物品）
function makeDecoys(target: ItemGroup, pool: GameItem[]): [ItemGroup, ItemGroup, ItemGroup] {
  return [0, 1, 2].map(() => {
    const decoy: GameItem[] = [...target]
    const replaceCount = Math.random() < 0.5 ? 1 : 2
    const positions = shuffle([0, 1, 2]).slice(0, replaceCount)
    const replacements = pickRandom(pool, replaceCount)
    positions.forEach((pos, i) => {
      decoy[pos] = replacements[i]
    })
    return decoy as ItemGroup
  }) as [ItemGroup, ItemGroup, ItemGroup]
}

// 生成4个分组并打乱，返回打乱后的分组和正确答案下标
function generateGroups(target: ItemGroup): {
  groups: [ItemGroup, ItemGroup, ItemGroup, ItemGroup]
  correctIndex: number
} {
  const pool = ALL_ITEMS.filter(item => !target.includes(item))
  const decoys = makeDecoys(target, pool)
  const all = [target, ...decoys] as [ItemGroup, ItemGroup, ItemGroup, ItemGroup]
  const shuffled = shuffle(all) as [ItemGroup, ItemGroup, ItemGroup, ItemGroup]
  const correctIndex = shuffled.findIndex(g => g === target)
  return { groups: shuffled, correctIndex }
}

interface MemoryMatchState {
  phase: Phase
  round: number
  score: number
  correctRounds: number
  streak: number
  lastCorrect: boolean | null

  targetItems: ItemGroup
  groups: [ItemGroup, ItemGroup, ItemGroup, ItemGroup]
  correctGroupIndex: number
  selectedGroupIndex: number | null
  showDuration: number

  startGame: () => void
  beginRound: () => void
  endShowing: () => void
  selectGroup: (index: number) => void
  nextRound: () => void
  resetGame: () => void
}

const EMPTY_GROUP: ItemGroup = [ALL_ITEMS[0], ALL_ITEMS[1], ALL_ITEMS[2]]

export const useMemoryMatchStore = create<MemoryMatchState>((set, get) => ({
  phase: 'idle',
  round: 1,
  score: 0,
  correctRounds: 0,
  streak: 0,
  lastCorrect: null,
  targetItems: EMPTY_GROUP,
  groups: [EMPTY_GROUP, EMPTY_GROUP, EMPTY_GROUP, EMPTY_GROUP],
  correctGroupIndex: 0,
  selectedGroupIndex: null,
  showDuration: 5000,

  startGame: () => {
    set({ phase: 'idle', round: 1, score: 0, correctRounds: 0, streak: 0, lastCorrect: null })
    get().beginRound()
  },

  beginRound: () => {
    const { round } = get()
    const target = pickRandom(ALL_ITEMS, 3) as ItemGroup
    const { groups, correctIndex } = generateGroups(target)
    set({
      phase: 'showing',
      targetItems: target,
      groups,
      correctGroupIndex: correctIndex,
      selectedGroupIndex: null,
      lastCorrect: null,
      showDuration: getShowDuration(round),
    })
  },

  endShowing: () => {
    set({ phase: 'choosing' })
  },

  selectGroup: (index: number) => {
    const { correctGroupIndex, score, correctRounds, streak } = get()
    const correct = index === correctGroupIndex
    const newStreak = correct ? streak + 1 : 0
    const bonus = Math.max(1, streak)
    set({
      selectedGroupIndex: index,
      lastCorrect: correct,
      score: correct ? score + 10 * bonus : score,
      correctRounds: correct ? correctRounds + 1 : correctRounds,
      streak: newStreak,
      phase: 'feedback',
    })
  },

  nextRound: () => {
    const { round } = get()
    if (round >= 5) {
      set({ phase: 'summary' })
    } else {
      set({ round: round + 1 })
      get().beginRound()
    }
  },

  resetGame: () => {
    set({
      phase: 'idle',
      round: 1,
      score: 0,
      correctRounds: 0,
      streak: 0,
      lastCorrect: null,
      selectedGroupIndex: null,
    })
  },
}))
