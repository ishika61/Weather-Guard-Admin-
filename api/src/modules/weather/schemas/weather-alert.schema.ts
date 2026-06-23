import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WeatherAlertDocument = HydratedDocument<WeatherAlert>;

@Schema()
export class WeatherAlert {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  message!: string;

  @Prop({ default: Date.now })
  sentAt!: Date;
}

export const WeatherAlertSchema = SchemaFactory.createForClass(WeatherAlert);
