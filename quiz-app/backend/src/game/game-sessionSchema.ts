import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type GameSessionDocument = GameSession & Document

@Schema({ timestamps: true })
export class GameSession {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  score: number

  @Prop({ required: true })
  level: number

  @Prop({ default: 0 })
  duration: number

  @Prop({ default: Date.now })
  playedAt: Date

  @Prop({ default: 0 })
  accuracy: number   // 本局答对率 0-100

@Prop({ default: 0 })
  totalRounds: number  // 本局总轮数
}

export const GameSessionSchema = SchemaFactory.createForClass(GameSession)
