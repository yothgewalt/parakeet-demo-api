import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('prisma should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('user should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const userData: Prisma.UserCreateInput = {
      email: 'test@example.com',
      name: 'Test User',
      phone: '1234567890',
      address: '123 Test St',
    };

    const createdUser: User = {
      id: '1',
      name: userData.name ?? null,
      email : userData.email,
      phone: userData.phone ?? null,
      address: userData.address ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);

    expect(await userService.createUser(userData)).toEqual(createdUser);
  });

  it('should get a user by id', async () => {
    const userId = '1';
    const user: User = {
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
      phone: '1234567890',
      address: '123 Test St',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

    expect(await userService.user({ id: userId })).toEqual(user);
  });

  it('should get all users', async () => {
    const users: User[] = [
      {
        id: '1',
        email: 'test1@example.com',
        name: 'Test User 1',
        phone: '1234567891',
        address: '123 Test St',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        email: 'test2@example.com',
        name: 'Test User 2',
        phone: '1234567892',
        address: '123 Test St',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        email: 'test3@example.com',
        name: 'Test User 3',
        phone: '1234567893',
        address: '123 Test St',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

    expect(await userService.users({})).toEqual(users);
  });

  it('should update a user', async () => {
      const userId = '1';
      const updateData: Prisma.UserUpdateInput = {
          name: 'Updated User',
          phone: '0987654321'
      };

      const updatedUser: User = {
          id: userId,
          email: 'test@example.com',
          name: typeof updateData.name === 'string' ? updateData.name : updateData.name?.set ?? null,
          phone: typeof updateData.phone === 'string' ? updateData.phone : updateData.phone?.set ?? null,
          address: '123 Test St',
          createdAt: new Date(),
          updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);

      expect(await userService.updateUser({ where: { id: userId }, data: updateData })).toEqual(updatedUser);
  });

  it('should delete a user', async () => {
    const userId = '1';
    const deletedUser: User = {
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
      phone: '1234567890',
      address: '123 Test St',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prismaService.user, 'delete').mockResolvedValue(deletedUser);

    expect(await userService.deleteUser({ id: userId })).toEqual(deletedUser);
  });
});
