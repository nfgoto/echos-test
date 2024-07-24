import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './models/user.schema';
import { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserSchema } from './models/user.schema';
import { Connection, connect } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const userDto = {
      pseudonyme: 'testuser',
      password: 'password123',
      name: 'Test User',
      address: '123 Main St',
      comment: 'This is a test user',
      role: 'user',
    };
    const createdUser = await service.create(userDto);
    expect(createdUser).toBeDefined();
    expect(createdUser.pseudonyme).toBe(userDto.pseudonyme);
    expect(createdUser.password).not.toBe(userDto.password); // Assuming password is hashed
  });

  it('should find a user by pseudonyme', async () => {
    const userDto = {
      pseudonyme: 'testuser',
      password: 'password123',
      name: 'Test User',
      address: '123 Main St',
      comment: 'This is a test user',
      role: 'user',
    };
    await service.create(userDto);
    const foundUser = await service.findOne(userDto.pseudonyme);
    expect(foundUser).toBeDefined();
    expect(foundUser.pseudonyme).toBe(userDto.pseudonyme);
  });

  it('should update a user', async () => {
    const userDto = {
      pseudonyme: 'testuser',
      password: 'password123',
      name: 'Test User',
      address: '123 Main St',
      comment: 'This is a test user',
      role: 'user',
    };
    const createdUser = await service.create(userDto);

    const updateDto = {
      name: 'Updated Name',
    };
    const updatedUser = await service.update(createdUser.pseudonyme, updateDto);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(updateDto.name);
  });

  it('should delete a user', async () => {
    const userDto = {
      pseudonyme: 'testuser',
      password: 'password123',
      name: 'Test User',
      address: '123 Main St',
      comment: 'This is a test user',
      role: 'user',
    };
    const createdUser = await service.create(userDto);
    await service.delete(createdUser.pseudonyme);
    const foundUser = await service.findOne(userDto.pseudonyme);
    expect(foundUser).toBeNull();
  });

  it('should not create a user with duplicate pseudonyme', async () => {
    const userDto = {
      pseudonyme: 'testuser',
      password: 'password123',
      name: 'Test User',
      address: '123 Main St',
      comment: 'This is a test user',
      role: 'user',
    };
    await service.create(userDto);
    await expect(service.create(userDto)).rejects.toThrow();
  });

  it('should hash the password before saving', async () => {
    const userDto = {
      pseudonyme: 'testuser',
      password: 'password123',
      name: 'Test User',
      address: '123 Main St',
      comment: 'This is a test user',
      role: 'user',
    };
    const createdUser = await service.create(userDto);
    expect(createdUser.password).not.toBe(userDto.password); // Assuming password is hashed
  });
});