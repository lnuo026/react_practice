// 是游戏的数据中心。
import { create } from 'zustand'

  //  定义一个类型叫 Color，它只能是这4个字符串之一
  type Color = 'red' | 'blue' | 'green' | 'yellow';
  //  游戏的5个阶段： 
  // - idle = 等待开始
  // - showing = 正在闪烁颜色序列
  // - input = 用户点击输入
  // - feedback = 显示对/错
  // - summary = 游戏结束总结
  type Phase = 'idle' | 'showing' | 'input' | 'feedback' | 'summary';


   interface GameState {
    phase: Phase
    sequence: Color[]
    userInput: Color[]
    activeColor: Color | null
    level: number 
    score: number
    round: number
    correctRounds: number
    streak: number

    // 点"开始游戏"按钮时调用，重置所有数据
    startGame: () => void
    // 把新生成的颜色序列存进 store
    setSequence: (seq: Color[]) => void
    // 告诉动画组件"现在该亮哪个颜色"
    setActiveColor: (c: Color | null) => void
    // 用户每点一个颜色块，追加到 userInput
    addInput: (c: Color) => void
    // 切换游戏阶段
    setPhase: (p: Phase) => void
    // 一轮结束后调用，correct=true表示答对，更新分数/等级/连胜
    nextRound: (correct: boolean) => void
    // 游戏结束后重置，回到 idle 等待状态
    resetGame: () => void

  }


  // 4个颜色的数组，用于随机生成序列
  const COLORS: Color[] = ['red', 'blue', 'green', 'yellow']

  // 生成随机颜色序列，length 是序列长度（等于当前 level）
  const generateSequence = (length: number): Color[] =>
    Array.from({ length }, () => COLORS[Math.floor(Math.random() * 4)])

   // create() 是 Zustand 的函数，创建一个全局 store
  // set 用来更新状态，s 代表当前状态（state 的缩写）
  export const useGameStore = create<GameState>((set, get) => ({
    // 初始值
    phase: 'idle',
    sequence: [],
    userInput: [],
    activeColor: null,
    level: 3,
    score: 0,
    round: 0,
    correctRounds: 0,
    streak: 0,

   // 开始游戏：进入 showing 阶段，重置所有计数
    startGame: () => set({
      phase: 'showing', round: 1, score: 0,
      correctRounds: 0, level: 3, userInput: [], streak: 0,
    }),

    // 直接替换 sequence
    setSequence: (seq) => set({ sequence: seq }),
    // 直接替换 activeColor
    setActiveColor: (c) => set({ activeColor: c }),
    // 在原有 userInput 数组末尾追加一个颜色
    addInput: (c) => set(s => ({ userInput: [...s.userInput, c] })),
    // 直接替换 phase
    setPhase: (p) => set({ phase: p }),

    // 一轮结束的核心逻辑
    nextRound: (correct) => set(s => {
      // 答对连胜+1，答错归零
      const newStreak = correct ? s.streak + 1 : 0
      // 答对等级+1（最高9），答错等级-1（最低2）
      const newLevel = correct ? Math.min(s.level + 1, 9) :
  Math.max(s.level - 1, 2)
      // 轮数+1
      const newRound = s.round + 1
      return {
        // 答对才加分，分数 = 等级 × 10
        score: correct ? s.score + s.level * 10 : s.score,
        correctRounds: correct ? s.correctRounds + 1 :
  s.correctRounds,
        streak: newStreak,
        level: newLevel,
        round: newRound,
        userInput: [],
        // 超过10轮进入总结，否则继续显示下一轮序列
        phase: newRound > 10 ? 'summary' : 'showing',
      }
    }),

    // 完全重置，回到初始状态
    resetGame: () => set({
      phase: 'idle', sequence: [], userInput: [],
      activeColor: null, level: 3, score: 0,
      round: 0, correctRounds: 0, streak: 0,
    }),
  }))
