import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDueCards, submitReview } from '../services/api'
import FlashCard from '../components/FlashCard'
import { motion, AnimatePresence } from 'framer-motion'

export default function StudyPage() {
  const { deckId } = useParams()
  const navigate = useNavigate()
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [flipped, setFlipped] = useState(false)
  const [hint, setHint] = useState('')
  const [hintLoading, setHintLoading] = useState(false)
  const [done, setDone] = useState(false)
//   带复习的具体卡片数量，复习过程中每打完一张就 +1，最后显示在完成页面上
  const [reviewed, setReviewed] = useState(0)


//   从后端拿数据，存到 cards 里。如果一张都没有，直接 setDone(true)。  
  useEffect(() => {
    const fetchDue = async () => {
      try {
        const res = await getDueCards(deckId)
        setCards(res.data)
        if (res.data.length === 0) setDone(true)
      } catch (err) {
        if (err.response?.status === 404) navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchDue()
  }, [deckId])



  const handleRate = async (quality) => {
    const card = cards[index]
    // 如果打0分，显示"AI加载中，下面代码" 
    setHintLoading(quality === 0)
    setHint('')
    try {
        const res = await submitReview(card._id, quality)
        // 从后端返回的数据里取出 hint 这个字段，存到 hint 里显示在页面上
      if (res.data.hint) setHint(res.data.hint)
    } catch (err) {
      console.error(err)
    } finally {
      setHintLoading(false)
    }
    // 复习数+1
    setReviewed((r) => r + 1)
//   不管几分都进入下一张 advance，只有0分才显示提示，是0分的话等用户看完AI提示再点"Got it"才跳下一张 
    if (quality !== 0) {
      advance()
    }
  }



// 跳下一张
  const advance = () => {
    // // 卡片重置为未翻面
    setFlipped(false)
    // 清空AI提示 
    setHint('')
    // 最后一张了，结束
    if (index + 1 >= cards.length) {
      setDone(true)
    } else {
      setIndex((i) => i + 1)
    }
  }


//   2显示状态 ，加载中、完成
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading cards...</p>
      </div>
    )
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 p-4">
        <div className="text-5xl">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800">搞定🤝</h2>
        <p className="text-gray-500">你复习了 {reviewed} 张卡片{reviewed !== 1 ? 's' : ''}.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Back to Home
        </button>
      </div>
    )
  }


//  进行中 ，第三种状态，显示卡片和打分按钮
  const card = cards[index]

  return (
    <div className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">
      {/* 布局是左上角的推出 */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <button onClick={() => navigate('/')} className="hover:text-gray-700">
          ← Exit
        </button>
        <span>
          {index + 1} / {cards.length}
        </span>
      </div>

      {/* 右上角的‘还剩几张’ */}
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all"
          style={{ width: `${((index + 1) / cards.length) * 100}%` }}
        />
      </div>



      {/* Flash card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={card._id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
        >
          <FlashCard front={card.front} back={card.back} />
        </motion.div>
      </AnimatePresence>



      {/*具体的‘忘记’  ‘ 难’ ‘easy ’ 按钮 + ai hint*/}
      <div className="flex flex-col gap-3">
        <p className="text-center text-sm text-gray-400">你会不会啊？</p>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleRate(0)}
            className="bg-red-50 border border-red-200 text-red-600 py-3 rounded-xl text-sm font-medium hover:bg-red-100 transition"
          >
            Forgot
            <span className="block text-xs font-normal opacity-60 mt-0.5">别试了，没用的</span>
          </button>
          <button
            onClick={() => handleRate(3)}
            className="bg-yellow-50 border border-yellow-200 text-yellow-700 py-3 rounded-xl text-sm font-medium hover:bg-yellow-100 transition"
          >
            Hard
            <span className="block text-xs font-normal opacity-60 mt-0.5">啥啊</span>
          </button>
          <button
            onClick={() => handleRate(5)}
            className="bg-green-50 border border-green-200 text-green-700 py-3 rounded-xl text-sm font-medium hover:bg-green-100 transition"
          >
            Easy
            <span className="block text-xs font-normal opacity-60 mt-0.5">so easy</span>
          </button>
        </div>
      </div>

      {/* Gemini hint (shown when user forgot) */}
      {hintLoading && (
        <div className="bg-indigo-50 rounded-xl p-4 text-sm text-indigo-700 animate-pulse">
          AI给了个提示...
        </div>
      )}
      {hint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-50 border border-indigo-100 rounded-xl p-4"
        >
          <p className="text-lg font-semibold text-indigo-400 mb-1">小tips</p>
          <p className="text-lg text-indigo-800">{hint}</p>
          <button
            onClick={advance}
            className="mt-3 text-lg text-indigo-600 hover:underline"
          >
            Got it, 🦐一个
          </button>
        </motion.div>
      )}
    </div>
  )
}
