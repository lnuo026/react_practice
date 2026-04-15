import jwt from 'jsonwebtoken';

export  default function auth(req, res , next){
    // 前端发来的请求头长这样：Authorization: Bearer eyJhbGci...  ,去掉Bearer 保留token
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if(!token){
        return res.status(401).json({ message: 'No token'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded
        next()

    }catch(err){
        return res.status(401).json({ message: 'Invalid token'})
    }
}