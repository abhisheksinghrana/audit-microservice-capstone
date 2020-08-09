import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

import { AuditService } from '../services/audit.service';
import { CreateAuditDTO } from '../dto/create-audit.dto';
import { Audit } from '../schemas/audit.schema';
import { ValidateObjectId } from '../pipes/validate-object-id.pipe';
import { UpdateAuditDTO } from '../dto/update-audit.dto';

@Controller('audit')
export class AuditController {

    constructor(private auditService: AuditService) { }

    // Create an audit
    @Post()
    async create(@Body() createAuditDTO: CreateAuditDTO): Promise<Audit> {
        return await this.auditService.create(createAuditDTO);
    }

    // Fetch an audit using ID
    @Get(':id')
    async get(@Param('id', new ValidateObjectId()) id: string): Promise<Audit> {
        return await this.auditService.get(id);
    }

    // Fetch all the audits
    @Get()
    async getAll(): Promise<Audit[]> {
        return await this.auditService.getAll();
    }

    // Update an particular audit
    @Put(':id')
    async update(
        @Param('id', new ValidateObjectId()) id: string, @Body() updateAuditDTO: UpdateAuditDTO): Promise<Audit> {
        return await this.auditService.update(id, updateAuditDTO);
    }

    // Delete an audit
    @Delete(':id')
    async delete(@Param('id', new ValidateObjectId()) id: string): Promise<any> {
        return await this.auditService.delete(id);
    }
}
