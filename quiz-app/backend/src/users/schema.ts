
import{ Document} from "mongoose"
import {Prop,Schema , SchemaFactory}  from '@nestjs/mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true})
export class User {
    @Prop({ required: true ,unique: true})
    uid:string
    
    @Prop({ required: true ,unique: true})
    email:string

    @Prop()
    displayName:string
    
    @Prop()
    photoURL:string

    @Prop({ default: Date.now})
    lastLogin:string
}

export const UserSchema  = SchemaFactory.createForClass(User)