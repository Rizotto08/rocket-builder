import { Test } from '@nestjs/testing';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';

describe('VisitsController', () => {
  let controller: VisitsController;

  const service = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, treatment: 'Cleaning' }]),
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
    findOne: jest.fn().mockResolvedValue({ id: 1, treatment: 'Cleaning' }),
    update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn().mockResolvedValue({ message: 'Visit deleted' }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [VisitsController],
      providers: [{ provide: VisitsService, useValue: service }],
    }).compile();

    controller = moduleRef.get(VisitsController);
  });

  it('returns visits', async () => {
    await expect(controller.findAll()).resolves.toHaveLength(1);
  });

  it('creates visit', async () => {
    await expect(
      controller.create({ patientId: 1, visitDate: new Date().toISOString(), treatment: 'X', cost: 30, status: 'scheduled' }),
    ).resolves.toMatchObject({ id: 1 });
  });
});
