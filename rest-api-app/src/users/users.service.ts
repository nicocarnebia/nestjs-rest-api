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

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findOne(id: number): Promise<User[]> {
    //return this.usersRepository.findByPk<User>(id);
    return this.usersRepository.sequelize.query(
      'SELECT * FROM Users WHERE id = ?;',
      {
        model: User,
        plain: true,
        mapToModel: true,
        replacements: [id],
    });
  }
}
