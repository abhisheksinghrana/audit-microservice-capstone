import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuditController } from './controllers/audit.controller';
import { AuditService } from './services/audit.service';
import { AuditSchema } from './schemas/audit.schema';
import { ValidateObjectId } from './pipes/validate-object-id.pipe';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Audit', schema: AuditSchema }])],
    controllers: [AuditController],
    providers: [AuditService, ValidateObjectId]
})
export class AuditModule { }
