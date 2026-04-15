import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


// 规定数据长什么样
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true ,trim: true},
    email:{type: String, required: true, unique: true ,lowercase: true},
    password:{ type: String, required: true },
},
{
    timestamps: true
}
)

// 存密码前自动加密 
// pre('save') 每次调用 user.save() 之前自动先执行这个函数  
userSchema.pre('save', async function(next){
    // 如果密码没有被修改（比如只改了用户名），跳过加密，直接保存
    // 防止已经加密的密码被二次加密 
    if(!this.isModified('password')) {
        return next()
    }else{
        // 把明文密码变成加密的乱码                                      
        // 10 是加密强度，数字越大越安全，但越慢 
        this.password = await bcrypt.hash(this.password, 10)
        next()  
    }
})

// 验证密码 ,自定义方法comparing
//   bcrypt.compare — bcrypt 库的方法 
//   bcrypt.hash('abc123', 10)           // bcrypt提供：加密
//   bcrypt.compare('abc123', '加密后')  // bcrypt提供：对比
userSchema.methods.comparing = async function(candidatePassword) {
    // bcrypt.compare(明文密码, 加密后的密码)
    // 明文用同样的规则（盐值）再加密一次 - 对比两个加密结果是否匹配
    return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)


