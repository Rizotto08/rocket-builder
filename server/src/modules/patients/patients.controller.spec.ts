import { Test } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

describe('PatientsController', () => {
  let controller: PatientsController;

  const service = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, firstName: 'A' }]),
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
    findOne: jest.fn().mockResolvedValue({ id: 1, firstName: 'A' }),
    update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn().mockResolvedValue({ message: 'Patient deleted' }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [{ provide: PatientsService, useValue: service }],
    }).compile();

    controller = moduleRef.get(PatientsController);
  });

  it('returns patients', async () => {
    await expect(controller.findAll()).resolves.toHaveLength(1);
  });

  it('creates patient', async () => {
    await expect(controller.create({ firstName: 'A', lastName: 'B', phone: '1' })).resolves.toMatchObject({ id: 1 });
  });
});
