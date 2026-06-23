import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name !: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  provider!: string; // google or github

  @Prop({ default: 'user' })
  role!: string;

  @Prop({ default: false })
  isApproved!: boolean;

  @Prop()
  telegramChatId!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);