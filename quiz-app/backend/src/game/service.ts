/** 操作数据库    
 * 3 方法：                                               
  saveSession()  →  把一局游戏记录存进数据库                             
  getHistory()   →  从数据库查这个用户的历史记录
  
  getStats 是给 Dashboard 页面用的，从数据库里统计这个用户的游戏数据
  做了什么：                              
            
    前端 Dashboard 页面                                                 
        ↓ 发请求 GET /game/stats                
    后端 getStats(userId)                                               
        ↓ 查数据库，找这个用户最近20局记录                    
        ↓ 计算：                                                        
            bestLevel    = 所有局里最高的 level
            avgAccuracy  = 所有局准确率的平均值                         
            totalSessions = 一共玩了几局                                
            recentSessions = 最近10局数据（给折线图用）                 
        ↓ 返回给前端                                                    
    Dashboard 显示统计卡片 + 折线图     
                                                                         
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
  userId: string; score: number; level: number;
  duration: number; accuracy: number; totalRounds: number; gameType?: string
}): Promise<GameSession> {
  return this.gameModel.create(data)
}

  async getHistory(userId: string): Promise<GameSession[]> {
    return this.gameModel
      .find({ userId })
      .sort({ playedAt: -1 })
      .limit(20)
  }

  async getStats(userId: string) {
    const sessions = await this.gameModel.find({ userId }).sort({ playedAt: -1 }).limit(20)
    if (!sessions.length) return { bestLevel: 0, avgAccuracy: 0, totalSessions: 0, recentSessions: [] }
    return {
      bestLevel: Math.max(...sessions.map(s => s.level)),
      avgAccuracy: Math.round(sessions.reduce((a, s) => a + s.accuracy, 0) / sessions.length),
      totalSessions: sessions.length,
      recentSessions: sessions.slice(0, 10),
    }
  }
}
