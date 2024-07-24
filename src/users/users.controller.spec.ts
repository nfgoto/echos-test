import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // should guards be in auth folder ? -> most likely
import { RolesGuard } from './guards/roles.guard';
import { Role } from './roles/role.enum';
import { JwtService } from '@nestjs/jwt';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let usersService: UsersService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.user = { userId: 'test-user-id', roles: [Role.USER] }; // mock user
          return true;
        },
      })
      .overrideGuard(RolesGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          return req.user.roles.includes(Role.ADMIN); // mock role check
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    usersService = moduleFixture.get<UsersService>(UsersService);

    accessToken = jwtService.sign({ userId: 'test-user-id', roles: [Role.USER] });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET) - should return 401 without JWT token', async () => {
    await request(app.getHttpServer()).get('/users').expect(401);
  });

  it('/users (GET) - should return users with valid JWT token', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/users/:id (GET) - should return a user by id', async () => {
    const user = await usersService.create({
      pseudonyme: 'testuser',
      password: 'password123',
      name: 'Test User',
      address: '123 Main St',
      comment: 'This is a test user',
      role: 'user',
    });

    const response = await request(app.getHttpServer())
      .get(`/users/${user.pseudonyme}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.pseudonyme).toBe(user.pseudonyme);
  });

  it('/users/:id (PATCH) - should update a user by id', async () => {
    const user = await usersService.create({
      pseudonyme: 'testuser',
      password: 'password123',
      name: 'Test User',
      address: '123 Main St',
      comment: 'This is a test user',
      role: 'user',
    });

    const updateDto = { name: 'Updated Name' };

    const response = await request(app.getHttpServer())
      .patch(`/users/${user.pseudonyme}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateDto)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(updateDto.name);
  });

  it('/users/:id (DELETE) - should delete a user by id', async () => {
    const user = await usersService.create({
      pseudonyme: 'testuser',
      password: 'password123',
      name: 'Test User',
      address: '123 Main St',
      comment: 'This is a test user',
      role: 'user',
    });

    await request(app.getHttpServer())
      .delete(`/users/${user.pseudonyme}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const foundUser = await usersService.findOne(user.pseudonyme);
    expect(foundUser).toBeNull();
  });

  it('/users (POST) - should create a new user', async () => {
    const userDto = {
      pseudonyme: 'newuser',
      password: 'password123',
      name: 'New User',
      address: '456 Another St',
      comment: 'This is a new user',
      role: 'user',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userDto)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.pseudonyme).toBe(userDto.pseudonyme);
  });

  // Add more tests for edge cases and additional scenarios as needed
});