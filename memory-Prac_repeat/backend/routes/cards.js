import express from 'express'
import Card from '../models/Card.js'
import Deck from '../models/Deck.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// GET /api/cards/:deckId — get all cards in a deck
router.get('/:deckId', auth, async (req, res) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.deckId, owner: req.userId })
    if (!deck) return res.status(404).json({ message: 'Deck not found' })
    const cards = await Card.find({ deck: req.params.deckId }).sort({ createdAt: -1 })
    res.json(cards)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// POST /api/cards/:deckId — create card
router.post('/:deckId', auth, async (req, res) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.deckId, owner: req.userId })
    if (!deck) return res.status(404).json({ message: 'Deck not found' })

    const { front, back } = req.body
    if (!front || !back) return res.status(400).json({ message: 'Front and back are required' })

    const card = new Card({ deck: req.params.deckId, front, back })
    await card.save()
    res.status(201).json(card)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// PUT /api/cards/:id — update card content
router.put('/:id', auth, async (req, res) => {
  try {
    
    //  findById 根据 id 查到卡片 ，populate('deck') 把卡片里的 deck 字段（id）换成完整的 deck 数据（因为 deck 里有 owner 字段，能用来验证权限）
    // 而且下一行要用 card.deck.owner
    const card = await Card.findById(req.params.id).populate('deck')
    // card.deck.owner  →  ObjectId 类型（MongoDB的id格式）。需要转string
    // req.userId       →  String 类型（jwt解码出来的字符串） 
    if (!card || card.deck.owner.toString() !== req.userId) {
      return res.status(404).json({ message: 'Card not found' })
    }

    card.front = req.body.front ?? card.front
    card.back = req.body.back ?? card.back
    await card.save()
    res.json(card)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// DELETE /api/cards/:id — delete card
router.delete('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate('deck')
    if (!card || card.deck.owner.toString() !== req.userId) {
      return res.status(404).json({ message: 'Card not found' })
    }
    await card.deleteOne()
    res.json({ message: 'Card deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router
