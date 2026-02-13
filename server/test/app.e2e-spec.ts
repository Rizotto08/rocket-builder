import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';

describe('DentalPro e2e', () => {
  let app: INestApplication;
  let token = '';

  const db = {
    users: [] as any[],
    patients: [] as any[],
    visits: [] as any[],
    userId: 1,
    patientId: 1,
    visitId: 1,
  };

  const prismaMock = {
    $connect: jest.fn(),
    $on: jest.fn(),
    user: {
      findUnique: jest.fn(async ({ where: { email } }) => db.users.find((u) => u.email === email) || null),
      create: jest.fn(async ({ data }) => {
        const user = { id: db.userId++, ...data, createdAt: new Date() };
        db.users.push(user);
        return user;
      }),
    },
    patient: {
      findMany: jest.fn(async () => db.patients),
      findUnique: jest.fn(async ({ where: { id } }) => db.patients.find((p) => p.id === id) || null),
      create: jest.fn(async ({ data }) => {
        const patient = { id: db.patientId++, ...data, createdAt: new Date(), updatedAt: new Date() };
        db.patients.push(patient);
        return patient;
      }),
      update: jest.fn(async ({ where: { id }, data }) => {
        const idx = db.patients.findIndex((p) => p.id === id);
        db.patients[idx] = { ...db.patients[idx], ...data, updatedAt: new Date() };
        return db.patients[idx];
      }),
      delete: jest.fn(async ({ where: { id } }) => {
        db.patients = db.patients.filter((p) => p.id !== id);
        return {};
      }),
      count: jest.fn(async () => db.patients.length),
    },
    visit: {
      findMany: jest.fn(async () => db.visits.map((v) => ({ ...v, patient: db.patients.find((p) => p.id === v.patientId) }))),
      findUnique: jest.fn(async ({ where: { id } }) => {
        const found = db.visits.find((v) => v.id === id);
        return found ? { ...found, patient: db.patients.find((p) => p.id === found.patientId) } : null;
      }),
      create: jest.fn(async ({ data }) => {
        const visit = { id: db.visitId++, ...data, createdAt: new Date(), updatedAt: new Date() };
        db.visits.push(visit);
        return { ...visit, patient: db.patients.find((p) => p.id === visit.patientId) };
      }),
      update: jest.fn(async ({ where: { id }, data }) => {
        const idx = db.visits.findIndex((v) => v.id === id);
        db.visits[idx] = { ...db.visits[idx], ...data, updatedAt: new Date() };
        return { ...db.visits[idx], patient: db.patients.find((p) => p.id === db.visits[idx].patientId) };
      }),
      delete: jest.fn(async ({ where: { id } }) => {
        db.visits = db.visits.filter((v) => v.id !== id);
        return {};
      }),
      count: jest.fn(async () => db.visits.length),
      aggregate: jest.fn(async () => ({ _sum: { cost: db.visits.reduce((sum, v) => sum + Number(v.cost), 0) } })),
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('signup + login', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send({ email: 'demo@dentalpro.com', password: 'secret12' }).expect(201);
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'demo@dentalpro.com', password: 'secret12' })
      .expect(201);

    expect(res.body.accessToken).toBeDefined();
    token = res.body.accessToken;
  });

  it('patients CRUD', async () => {
    const created = await request(app.getHttpServer())
      .post('/patients')
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName: 'John', lastName: 'Doe', phone: '12345' })
      .expect(201);

    await request(app.getHttpServer()).get('/patients').set('Authorization', `Bearer ${token}`).expect(200);

    await request(app.getHttpServer())
      .put(`/patients/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ notes: 'Updated' })
      .expect(200);
  });

  it('visits CRUD', async () => {
    const patientId = db.patients[0].id;
    const created = await request(app.getHttpServer())
      .post('/visits')
      .set('Authorization', `Bearer ${token}`)
      .send({
        patientId,
        visitDate: new Date().toISOString(),
        treatment: 'Cleaning',
        cost: 55,
        status: 'scheduled',
      })
      .expect(201);

    await request(app.getHttpServer()).get('/visits').set('Authorization', `Bearer ${token}`).expect(200);

    await request(app.getHttpServer())
      .put(`/visits/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' })
      .expect(200);
  });
});
