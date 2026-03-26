import { Module} from '@nestjs/common'
import { AuthGuard } from './auth.guard'

// 营业执照（@Module 装饰器）   
@Module({
    providers:[AuthGuard],
    exports:[AuthGuard]
})

//  @Module({...}) 这个 @ 开头的东西叫装饰器，本质上是一个函数它在类定义之前运行，给类"贴标签、加信息"
// 公司实体（export class AuthModule {}）                     
//空壳，真正的信息在营业执照上      
export class AuthModule{}