import mongoose from 'mongoose'

const deckSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    // owner 是外键，ObjectId 是 MongoDB 的 ID 类型，ref: 'User' 表示关联 User 集合
    // 字段里面有 ref 用 .populate() 把 id 自动换成完整数据。
    // type:....层一层往里取，每一层都是上一层里的东西。 可解构
    // mongoose 这个库                   
    // Schema 这个类                     
    // Types 这个对象（存着所有数据类型）
    // ObjectId 这个具体类型
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Deck', deckSchema)
