import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/module'
import { GameModule } from './game/module'

//forRoot  NestJS 模块的全局初始化方法，只在根模块（app.module.ts）调用一次，整个项目都能用。                          
//   forRoot    → 建立数据库连接（全局，只做一次）                          
  //forFeature → 注册某张表（局部，每个模块各自注册自己用的表）  
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UsersModule,
    GameModule,
  ],
})
export class AppModule {}