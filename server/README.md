# DentalPro Server

NestJS + Prisma + PostgreSQL backend for DentalPro.

## Scripts
- `npm run start:dev` - start development server
- `npm run build` - compile app
- `npm run test` - run unit tests
- `npm run test:e2e` - run end-to-end tests
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate` - run migrations

## Environment
Copy `.env.example` to `.env` and set:
- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
