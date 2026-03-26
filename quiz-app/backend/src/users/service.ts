/**
 * 数据流总结
                                                                         
  用户登录                                                  
     ↓                                                                   
  Controller 收到请求                                                    
     ↓                                        
  调用 upsert() → 数据库里有这个用户？                                   
                    ├── 有 → 更新 lastLogin                 
                    └── 没有 → 新建一条记录                              
     ↓                                        
  返回用户数据给前端   
 */ 

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schema'

@Injectable()
export class UsersService {
    /** - @InjectModel(User.name) — 告诉NestJS：把 User 这个数据库模型注入进来 
            - private userModel — 存到 this.userModel，后面三个方法都用它操作数据库
            - Model<UserDocument> — 类型声明，说明 userModel 是操作 UserDocument
            的模型                                                                                                                     
               类比：工厂开工前，先领取操作数据库的"工具"，存起来备用。*/
    constructor(
    // 这个 .name 不是 User 类里面的字段，而是 JavaScript 每个类自带的属性，表示这个类的名字。
        @InjectModel(User.name) private userModel: Model<UserDocument>) {}

        //  存/更新用户  
    async upsert(userData: {
        uid:string
        email:string
        displayName: string
        photoURL: string
    }): Promise<User> {
        /**  findOneAndUpdate = 找到就更新，找不到就新建 
             { upsert: true } = 找不到时自动新建（upsert = update + insert 合体词）              
                { new: true } = 返回更新后的数据，不加这个默认返回更新前的         
            ...userData = 把 userData 里所有字段展开，再额外加上 lastLogin  */  
        return this.userModel.findOneAndUpdate(
        { uid: userData.uid },
        { ...userData, lastLogin: new Date() },
        { upsert: true, new: true }
        )
    }

    // 获取所有用户（管理员用）
    async findAll():Promise<User[]>{
        // .sort({ lastLogin: -1 }) — 按最后登录时间排序，-1 = 从新到旧
        return this.userModel.find().sort( { lastLogin:-1} )
    }


    //   - .findOne({ uid }) — 找第一个 uid 匹配的用户                          
    //      - { uid } 是 { uid: uid } 的简写，JS 对象简写语法
    async findByUid(uid: string): Promise<User | null> {
        return this.userModel.findOne({ uid })
    }
    }