import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Audit } from '../schemas/audit.schema';
import { CreateAuditDTO } from '../dto/create-audit.dto';
import { UpdateAuditDTO } from '../dto/update-audit.dto';


@Injectable()
export class AuditService {
    constructor(@InjectModel('Audit') private model: Model<Audit>) { }

    async create(createAuditDTO: CreateAuditDTO): Promise<Audit> {
        const audit = new this.model(createAuditDTO);
        return audit.save();
    }

    async get(id: string): Promise<Audit> {
        const audit = await this.model.findById(id).exec();
        if (!audit || audit.isDeleted) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'Audit not found'
                },
                HttpStatus.NOT_FOUND
            );
        }
        return audit;
    }

    async getAll(): Promise<Audit[]> {
        const audits = await this.model.find().exec() || [];
        if (audits && audits.length) {
            audits.forEach((audit: Audit, index: number) => {
                if (audit.isDeleted) {
                    audits.splice(index, 1);
                }
            });
        }
        return audits;
    }

    async update(id: string, updateAuditDTO: UpdateAuditDTO): Promise<Audit> {
        const audit = await this.model.findByIdAndUpdate(id, updateAuditDTO, { new: true }).exec();
        if (!audit || audit._id != id) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'Audit not found'
                },
                HttpStatus.NOT_FOUND
            );
        }
        return audit;
    }

    async delete(id: string): Promise<Audit> {
        const audit = await this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
        if (!audit || audit._id != id) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'Audit not found'
                },
                HttpStatus.NOT_FOUND
            );
        }
        return audit;
    }
}
