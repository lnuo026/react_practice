  import mongoose from 'mongoose'                                  
                                              
  const cardSchema = new mongoose.Schema(                          
    {             
        // 外键，这张卡片属于哪个卡片组 
      deck: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck',required: true },
      front: { type: String, required: true }, 
      back: { type: String, required: true }, 
        // SM-2 算法的四个字段

        // 距离下次复习的天数，默认1天
      interval: { type: Number, default: 1 },
       // 难度系数，越大 = 越简单  默认 2.5，每次答对答错都会调整    
      easeFactor: { type: Number, default: 2.5 },
        // 连续答对次数，默认0 每次答对就加1，答错就归零
      repetitions: { type: Number, default: 0 },
        // 下次复习日期 默认今天 = 新卡片马上就要学
      nextReviewDate: { type: Date, default: Date.now },
    },
    { timestamps: true }                                           
  )
                                                                   
  export default mongoose.model('Card', cardSchema)