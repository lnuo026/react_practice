// 打包注册 把game 三个文件注册到 NestJS，没有实际业务逻辑。  
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GameController } from './controller'
import { GameService } from './service'
import { GameSession, GameSessionSchema } from './game-sessionSchema'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GameSession.name, schema: GameSessionSchema },
    ]),
    AuthModule,
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}