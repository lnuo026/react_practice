import jwt from 'jsonwebtoken';

export  default function auth(req, res , next){
    // 前端发来的请求头长这样：Authorization: Bearer eyJhbGci...  ,去掉Bearer 保留token
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if(!token){
        return res.status(401).json({ message: 'No token'})
    }

    try{
        // decoded = { userId: 'abc123', iat: ..., exp: ... }       
        // 把用户id挂到req上，后面的路由可以用,后续路由可以直接取到当前用户是谁
        // 比如 : const decks = await Deck.find({ owner: req.userId  })  这个id就是auth中间件放进去的
        // 不需要前端额外传用户id，从token里就能知道是谁。
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    }catch(err){
        return res.status(401).json({ message: 'Invalid token'})
    }
}