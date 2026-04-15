import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
//  读取 .env 文件，让 process.env.PORT这类变量可以用    
import dotenv from 'dotenv'

    dotenv.config()

const app = express()
app.use(cors())
// 让后端能读取请求体里的 JSON数据，不加这行 req.body 是 undefined 
app.use(express.json())

// 健康检查接口，用来确认后端服务器是否正常运行
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
const PORT = process.env.PORT || 5000

const MONGODB_URI = process.env.MONGODB_URI

mongoose
.connect(MONGODB_URI)
.then( () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })  
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
})
