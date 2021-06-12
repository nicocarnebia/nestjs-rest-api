import { Injectable, Inject } from '@nestjs/common';
import { QueryTypes } from 'sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const id = await this.usersRepository.sequelize.query(
      'INSERT INTO Users(username, password) VALUES (?, ?);',
      {
        type: QueryTypes.INSERT,
        replacements: [createUserDto.username, createUserDto.password],
      },
    );
    const user = new User();
    user.id = id[0];
    user.username = createUserDto.username;
    return user;
  }

  async findOne(id: number): Promise<User[]> {
    return this.usersRepository.sequelize.query(
      'SELECT id, username FROM Users WHERE id = ?;',
      {
        model: User,
        plain: true,
        mapToModel: true,
        replacements: [id],
      },
    );
  }
}
