import express from 'express'
import Deck from '../models/Deck.js'
import Card from '../models/Card.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// GET /api/decks — get all decks for current user
router.get('/', auth, async (req, res) => {
  try {
    // .sort({ 字段名: 顺序 }) 1  = 正序（小→大，旧→新）-1 = 倒序（大→小，新→旧） 
    // 段是什么就按什么排，AZ ，时间，价格... 
    const decks = await Deck.find({ owner: req.userId }).sort({ createdAt: -1 })
    
    //同时开多个窗口，一起办理 Promise.all() 传一个数组，
    // 数组里每个元素都是一个 Promise，等所有 Promise 都完成了才继续。
    // 总时间 = 最慢那个请求的时间
    const decksWithStats = await Promise.all(
      decks.map(async (deck) => {

        // find() 把数据全取出来  ，then ，countDocuments() 只数数量 （Mongoose 提供）
        // $lte = MongoDB 的查询语法，意思是 "小于或等于"
        // 这里用来找出 nextReviewDate 在当前时间之前的卡片，也就是到期需要复习的卡片。
        const totalCards = await Card.countDocuments({ deck: deck._id })
        const dueCards = await Card.countDocuments({
          deck: deck._id,
          nextReviewDate: { $lte: new Date() },
        })
        //deck 是 Mongoose 文档，不是普通 JS 对象 ，不能直接展开，要先转成对象。
        // Mongoose 文档不能直接加新属性
        return { ...deck.toObject(), totalCards, dueCards }
      })
    )
    res.json(decksWithStats)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// POST /api/decks — create new deck
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title) return res.status(400).json({ message: 'Title is required' })
    const deck = new Deck({ title, description, owner: req.userId })
    await deck.save()
    res.status(201).json(deck)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// PUT /api/decks/:id — update deck
router.put('/:id', auth, async (req, res) => {
  try {
    const deck = await Deck.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { title: req.body.title, description: req.body.description },
      { new: true }
    )
    if (!deck) return res.status(404).json({ message: 'Deck not found' })
    res.json(deck)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// DELETE /api/decks/:id — delete deck and its cards
router.delete('/:id', auth, async (req, res) => {
  try {
    const deck = await Deck.findOneAndDelete({ _id: req.params.id, owner: req.userId })
    if (!deck) return res.status(404).json({ message: 'Deck not found' })
    await Card.deleteMany({ deck: req.params.id })
    res.json({ message: 'Deck deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router
