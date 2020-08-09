import { Test, TestingModule } from '@nestjs/testing';

import { AuditController } from './audit.controller';
import { AuditService } from '../services/audit.service';
import { CreateAuditDTO } from '../dto/create-audit.dto';
import { UpdateAuditDTO } from '../dto/update-audit.dto';

describe('Audit Controller', () => {
  let auditController: AuditController;
  let auditService: AuditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditController],
      providers: [{
        provide: AuditService,
        useFactory: () => ({
          create: jest.fn(),
          get: jest.fn(),
          getAll: jest.fn(),
          update: jest.fn(),
          delete: jest.fn()
        })
      }]
    }).compile();

    auditController = module.get<AuditController>(AuditController);
    auditService = module.get<AuditService>(AuditService);
  });

  it('should be defined', () => {
    expect(auditController).toBeDefined();
  });

  it('should call mock create for GET /audit', async () => {
    const audit: CreateAuditDTO = {
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

    auditController.create(audit);
    expect(auditService.create).toHaveBeenCalledWith(audit);
  });

  it('should call mock get for GET /audit/:id', async () => {
    const id: string = '2e3f4324f2f2f3f52334krk5';
    auditController.get(id);
    expect(auditService.get).toHaveBeenCalledWith(id);
  });

  it('should call mock getAll for GET /audit', async () => {
    auditController.getAll();
    expect(auditService.getAll).toHaveBeenCalledWith();
  });

  it('should call mock update for PUT /audit/:id', async () => {
    const id: string = '2e3f4324f2f2f3f52334krk5';
    const audit: UpdateAuditDTO = {
      name: 'Store audit'
    };
    auditController.update(id, audit);
    expect(auditService.update).toHaveBeenCalledWith(id, audit);
  });

  it('should call mock delete for Delete /audit/:id', async () => {
    const id: string = '2e3f4324f2f2f3f52334krk5';
    auditController.delete(id);
    expect(auditService.delete).toHaveBeenCalledWith(id);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
