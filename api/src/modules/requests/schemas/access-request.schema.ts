import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AccessRequestDocument = HydratedDocument<AccessRequest>;
export type AccessRequestStatus = 'pending' | 'approved' | 'rejected';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class AccessRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status!: AccessRequestStatus;

  createdAt!: Date;
}

export const AccessRequestSchema = SchemaFactory.createForClass(AccessRequest);
