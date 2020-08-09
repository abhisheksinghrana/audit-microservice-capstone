import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

import { AuditService } from './audit.service';
import { AuditSchema, Audit } from '../schemas/audit.schema';
import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import dbConfiguration from '../../../test/db.module.config';

const auditDetails = {
  id: '5f1dfd056e50022f2f603110',
  name: 'Store audit',
  projectName: 'Store',
  reviewerId: 'XXY144655',
  categoryId: 'design',
  collaboratorIds: [],
  status: 'New',
  progress: 40,
  priority: 'High',
  creatorId: 'XYD144537',
  createdOn: new Date(),
  modifiedOn: new Date(),
  isDeleted: false
};
describe('AuditService', () => {
  let auditService: AuditService;
  let model: Model<Audit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        dbConfiguration(),
        MongooseModule.forFeature([{ name: 'Audit', schema: AuditSchema }])
      ],
      providers: [AuditService],
    }).compile();

    auditService = module.get<AuditService>(AuditService);
    model = module.get<Model<Audit>>(getModelToken('Audit'));
  });

  it('should be defined', () => {
    expect(auditService).toBeDefined();
  });

  it('should be able to create a new audit', async () => {
    const audit = await auditService.create(auditDetails);
    expect(audit).toBeDefined();
  });

  it('should be able to get audit by ID', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(auditDetails),
    } as any);

    const audit = await auditService.get(auditDetails.id);
    expect(audit).toEqual(auditDetails);
  });

  it('should throw error when audit by ID is not found', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    await auditService.get(auditDetails.id).catch(e => {
      expect(e.response.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(e.response.error).toBe('Audit not found');
    });
  });

  it('should be able to get all the audit', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([auditDetails]),
    } as any);

    const audits = await auditService.getAll();
    expect(audits.length).toBe(1);
  });

  it('should not return deleted audit in audit list', async () => {
    const deletedAudit = { ...auditDetails, ...{ isDeleted: true } };
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([auditDetails, deletedAudit]),
    } as any);

    const audits = await auditService.getAll();
    expect(audits.length).toBe(1);
  });

  it('should return empty array if no audit found', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    const audits = await auditService.getAll();
    expect(audits.length).toBe(0);
  });

  it('should be able to update audit', async () => {
    const updatedAuditDetails: any = {
      _id: '5f1dfd056e50022f2f603110',
      name: 'Updated audit',
      projectName: 'Store',
      reviewerId: 'XXY144655',
      categoryId: 'design',
      collaboratorIds: [],
      status: 'New',
      progress: 40,
      priority: 'High',
      creatorId: 'XYD144537',
      createdOn: new Date(),
      modifiedOn: new Date(),
      isDeleted: false
    };
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(updatedAuditDetails),
    } as any);

    const audit = await auditService.update(auditDetails.id, auditDetails);
    expect(audit.name).not.toBe(auditDetails.name);
  });

  it('should throw error when audit is not available to update in DB', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    const audit = await auditService.update(auditDetails.id, auditDetails).catch(e => {
      expect(e.response.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(e.response.error).toBe('Audit not found');
    });
  });

  it('should be able to delete audit', async () => {
    const deletedAuditDetails: any = {
      _id: '5f1dfd056e50022f2f603110',
      name: 'Store audit',
      projectName: 'Store',
      reviewerId: 'XXY144655',
      categoryId: 'design',
      collaboratorIds: [],
      status: 'New',
      progress: 40,
      priority: 'High',
      creatorId: 'XYD144537',
      createdOn: new Date(),
      modifiedOn: new Date(),
      isDeleted: true
    };
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(deletedAuditDetails),
    } as any);

    const audit = await auditService.delete(auditDetails.id);
    expect(audit.isDeleted).toBe(true);
  });

  it('should throw error when audit is not available to delete in DB', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    const audit = await auditService.delete(auditDetails.id).catch(e => {
      expect(e.response.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(e.response.error).toBe('Audit not found');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
