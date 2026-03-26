/** 操作数据库    
 * 两个方法：                                               
  saveSession()  →  把一局游戏记录存进数据库                             
  getHistory()   →  从数据库查这个用户的历史记录
                                                                         
  不接收 HTTP 请求，只和数据库打交道，被 Controller 调用。  
 */ 

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { GameSession, GameSessionDocument } from './game-sessionSchema'

@Injectable()
export class GameService {
  constructor(
    @InjectModel(GameSession.name)
    private gameModel: Model<GameSessionDocument>
  ) {}

  async saveSession(data: {
    userId: string
    score: number
    level: number
    duration: number
  }): Promise<GameSession> {
    return this.gameModel.create(data)
  }

  async getHistory(userId: string): Promise<GameSession[]> {
    return this.gameModel
      .find({ userId })
      .sort({ playedAt: -1 })
      .limit(20)
  }
}
