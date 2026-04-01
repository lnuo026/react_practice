/**
 * 接收前端请求       
 * 两个接口：                                                             
                                                            
  POST /game/session                                                     
    接收：{ score, level, duration }
    做什么：调用 saveSession() 存到数据库                                
                                                            
  GET /game/history                       
    接收：无（从 token 里拿 userId）                                     
    做什么：调用 getHistory() 查这个用户的历史 
 * 
 */ 
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { GameService } from './service'
import { AuthGuard } from '../auth/auth.guard'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // POST /game/session — 保存一局游戏记录
  @Post('session')
  @UseGuards(AuthGuard)
  async saveSession(
    @Req() req,
    @Body() body: { score: number; level: number; duration: number; accuracy: number; totalRounds: number; gameType?: string }
  ) {
    return this.gameService.saveSession({
      userId: req.user.uid,
      ...body,
    })
  }

  // GET /game/history — 获取当前用户游戏历史
  @Get('history')
  @UseGuards(AuthGuard)
  async getHistory(@Req() req) {
    return this.gameService.getHistory(req.user.uid)
  }

  // GET /game/stats — 获取当前用户统计数据
  @Get('stats')
  @UseGuards(AuthGuard)
  async getStats(@Req() req) {
    return this.gameService.getStats(req.user.uid)
  }
}