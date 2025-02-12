import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async createUser(
    @Body() userData: Prisma.UserCreateInput
  ): Promise<User> {
    const createdUser = await this.userService.createUser(userData);
    return createdUser;
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    const user = await this.userService.user({ id: id })
    return user;
  }

  @Get('users')
  async getAllUser(): Promise<User[] | null> {
    const users = await this.userService.users({});
    return users;
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput
  ): Promise<User> {
    const updatedUser = await this.userService.updateUser({
      where: { id: id },
      data: userData,
    });
    return updatedUser;
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    const deletedUser = await this.userService.deleteUser({ id: id });
    return deletedUser;
  }
}
