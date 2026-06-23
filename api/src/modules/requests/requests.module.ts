import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { AccessRequest, AccessRequestSchema } from './schemas/access-request.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: AccessRequest.name, schema: AccessRequestSchema },
    ]),
  ],
  providers: [RequestsService],
  controllers: [RequestsController],
  exports: [RequestsService, MongooseModule],
})
export class RequestsModule {}
