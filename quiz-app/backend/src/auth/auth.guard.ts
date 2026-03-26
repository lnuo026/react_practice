/**
 * 后端的"门卫"，每次前端发请求过来，先经过这里检查 有没有合法的登录凭证。  
- Injectable — 告诉 NestJS "这个类可以被注入使用"
  - CanActivate — 一个接口，规定"守卫必须有 canActivate 方法"
  - ExecutionContext — 包含当前请求的所有信息（请求头、body等）                   
  - UnauthorizedException — NestJS 内置的"401 未授权"错误 
 */ 

// ：导入 NestJS 工具  
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

import{ admin} from './firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate{
    // 返回 true = 放行，返回 false / 抛出异常 = 拒绝 
    async canActivate(context: ExecutionContext): Promise<boolean> {
        //  前端发请求时会在 Header 里带：
        // Authorization: Bearer eyJhbGciOi...（token） 这里把那个值取出来
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization
        // 格式检查，如果没有 Authorization 头，或者格式不对 → 直接报 401 
        // 'Bearer' 后面少了空格，应该是 'Bearer '   
        // 因为实际格式是：Bearer eyJhbGci...，Bearer 和 token 之间有空格                                          
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new UnauthorizedException('lake token')
        }

        // 提取纯 token，"Bearer eyJhbGci..." 按空格切割，取后半段纯 token  
        const token = authHeader.split('Bearer ')[1]
        try{
            // 验证 token - Firebase Admin 去验证这个 token 是不是真的、有没有过期   
            // 验证通过：把用户信息存到       
            const decoded = await admin.auth().verifyIdToken(token)
            request.user =  decoded
            return true
        }catch {
            throw new UnauthorizedException('token无效')
        }
    }
}