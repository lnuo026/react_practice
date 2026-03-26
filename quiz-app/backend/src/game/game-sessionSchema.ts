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
}

export const GameSessionSchema = SchemaFactory.createForClass(GameSession)
