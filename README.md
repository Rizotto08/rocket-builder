# DentalPro

Cross-platform dental clinic management application with NestJS backend and Expo React Native mobile app.

## Project Structure

```
DentalPro/
├─ mobile/
│  ├─ App.js
│  ├─ package.json
│  └─ src/
│     ├─ api/
│     ├─ context/
│     ├─ navigation/
│     └─ screens/
└─ server/
   ├─ src/
   │  ├─ modules/
   │  │  ├─ auth/
   │  │  ├─ patients/
   │  │  ├─ visits/
   │  │  └─ dashboard/
   │  └─ main.ts
   ├─ prisma/
   │  ├─ schema.prisma
   │  └─ migrations/
   └─ package.json
```

## Backend Setup (`server/`)

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Configure `.env`:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `PORT`
4. Generate Prisma client and run migration:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
5. Start API:
   ```bash
   npm run start:dev
   ```

### Backend API Routes
- `GET /auth/signup`
- `POST /auth/signup`
- `POST /auth/login`
- `GET /patients`
- `POST /patients`
- `GET /patients/:id`
- `PUT /patients/:id`
- `DELETE /patients/:id`
- `GET /visits`
- `POST /visits`
- `GET /visits/:id`
- `PUT /visits/:id`
- `DELETE /visits/:id`
- `GET /dashboard`

## Mobile Setup (`mobile/`)

1. Install dependencies:
   ```bash
   cd mobile
   npm install
   ```
2. Ensure backend is running and update `src/api/client.js` base URL if needed.
3. Start Expo:
   ```bash
   npm run start
   ```
4. Open Android/iOS simulator or Expo Go app.

## Testing

### Backend unit tests
```bash
cd server
npm test
```

### Backend e2e tests
```bash
cd server
npm run test:e2e
```

## Notes
- Authentication uses JWT Bearer tokens.
- Patients and visits endpoints are protected.
- Dashboard returns total patients, upcoming visits today, and revenue today.
