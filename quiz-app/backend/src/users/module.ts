// 把 Users 相关的三个文件打包注册，告诉 NestJS 它们是一家人。
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./controller";
import { UsersService } from "./service";
import  {User, UserSchema}from './schema'
import { AuthModule } from "../auth/auth.module";

//  Mongoose 是连接 MongoDB 的工具库，MongooseModule 是 NestJS 把它包装后的版本，方便在模块里使用
// .forFeature() 的意思是：在当前这个模块里，注册以下这些数据库表。      
//"在 UsersModule 里，注册一张叫 User 的表，表的结构按照 UserSchema 
//  定义的来"  注册完之后，NestJS 才知道有这张表存在，@InjectModel  才能把它注入进来用。      
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}