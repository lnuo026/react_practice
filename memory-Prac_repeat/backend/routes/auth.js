import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


const router = express.Router()

// 注册接口  POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
    // 400 = 请求有问题（客户端的错），三个字段任何一个是空的 → 直接拒绝  
      return res.status(400).json({ message: 'All fields are required' })
    }
    // 检查是否已存在     $or 是 MongoDB 的查询语法：email或者 username找到任意一个就返回
    const existing = await User.findOne({ $or: [{ email }, { username }] })
    if (existing) {
      return res.status(409).json({ message: 'Username or email already exists' })
    }
    // 创建用户 user.save() 触发 User.js 里的 pre('save') 自动加密密码
    const user = new User({ username, email, password })
    await user.save()
    // 生成 token 返回给前端，后续请求带上这个 token 就能证明自己的身份了
    // jwt.sign(payload, secret, options) payload（存什么数据 id），secret是加密用的字符串，options里设置过期时间
    // 返回：token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.xxx'
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// 登录
// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    // 芒果model带的findOne
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const isMatch = await user.comparing(password)
    if (!isMatch) return res.status(401)
        .json({ message: 'Invalid credentials' })
    
    // 生成 token 返回
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
                  res.json({ token, user: { id: user._id, username: user.username, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router
