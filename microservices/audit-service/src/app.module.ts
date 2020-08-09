import { Module } from '@nestjs/common';
import * as env from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';

import { AuditModule } from './audit/audit.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

env.config();

const DB_SERVICE_URL = process.env.DB_SERVICE_URL || 'mongodb://localhost:27017/audit-db';

@Module({
  imports: [
    MongooseModule.forRoot(DB_SERVICE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
