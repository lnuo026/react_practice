import express from 'express'
import Groq from 'groq-sdk'
import Card from '../models/Card.js'
import Deck from '../models/Deck.js'
import auth from '../middleware/auth.js'
import { sm2 } from '../utils/SM2.js'

const router = express.Router()


// GET /api/review/:deckId/due获取今天到期的卡片
router.get('/:deckId/due', auth, async (req, res) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.deckId, owner: req.userId })
    if (!deck) return res.status(404).json({ message: 'Deck not found' })

        // 查今天到期的卡片
    const cards = await Card.find({
      deck: req.params.deckId,
      nextReviewDate: { $lte: new Date() },
    })
    res.json(cards)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})


// POST /api/review/:cardId  POST — 提交复习结果 
// 第一步：取出打分 quality = 0 ,3 , 5
router.post('/:cardId', auth, async (req, res) => {
 try {
    const { quality } = req.body
    if (quality === undefined) return res.status(400).json({ message: 'quality is required' })

    const card = await Card.findById(req.params.cardId).populate('deck')
    if (!card || card.deck.owner.toString() !== req.userId) {
      return res.status(404).json({ message: 'Card not found' })
    }
// 运行 SM-2 算法   , 把卡片当前数据传进去：
    const result = sm2(quality, card.repetitions, card.easeFactor, card.interval)
    // 第三步：更新卡片数据存回数据库  
    card.interval = result.interval
    card.easeFactor = result.easeFactor
    card.repetitions = result.repetitions
    card.nextReviewDate = result.nextReviewDate
    await card.save()

    // 第四步：调用 Groq AI（只有忘了才调用）
//     let hint = null
//     if (quality === 0 && process.env.GROQ_API_KEY) {
//       try {
//         const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
//         const completion = await groq.chat.completions.create({
//           model: 'llama-3.3-70b-versatile',
//           messages: [
//             {
//               role: 'user',
//               content: `I'm trying to memorize a flashcard but I keep forgetting it.
// Front: "${card.front}"
// Back: "${card.back}"
// Please give me a short, creative memory tip or mnemonic (2-3 sentences) to help me remember the answer. Be concrete and vivid.`,
//             },
//           ],
//         })
//         hint = completion.choices[0].message.content
//       } catch (groqErr) {
//         console.error('Groq error:', groqErr.message)
//       }
//     }

    res.json({ card, hint, nextReviewDate: result.nextReviewDate })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router
