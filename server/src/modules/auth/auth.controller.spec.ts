import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const service = {
    signup: jest.fn().mockResolvedValue({ accessToken: 'token' }),
    login: jest.fn().mockResolvedValue({ accessToken: 'token' }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: service }],
    }).compile();

    controller = moduleRef.get(AuthController);
  });

  it('signup works', async () => {
    await expect(controller.signup({ email: 'a@a.com', password: '123456' })).resolves.toHaveProperty('accessToken');
  });

  it('login works', async () => {
    await expect(controller.login({ email: 'a@a.com', password: '123456' })).resolves.toHaveProperty('accessToken');
  });
});
