import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';

import { Address } from './entities/address.entity';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private usersRepository: typeof User,
    @InjectModel(Address)
    private addressesRepository: typeof Address,
    @InjectModel(Profile)
    private profilesRepository: typeof Profile,
    private sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user: User;
    try {
      await this.sequelize.transaction(async (t) => {
        const userId = await this.usersRepository.sequelize.query(
          'INSERT INTO Users(username, password) VALUES (?, ?);',
          {
            transaction: t,
            type: QueryTypes.INSERT,
            replacements: [createUserDto.username, createUserDto.password],
          },
        );

        user = new User();
        user.id = userId[0];
        user.username = createUserDto.username;

        const addressId = await this.addressesRepository.sequelize.query(
          'INSERT INTO Addresses(cityId, street) VALUES (?,?)',
          {
            transaction: t,
            type: QueryTypes.INSERT,
            replacements: [createUserDto.cityId, createUserDto.address],
          },
        );

        await this.profilesRepository.sequelize.query(
          'INSERT INTO Profiles(userId, addressId, name) VALUES (?,?,?)',
          {
            transaction: t,
            type: QueryTypes.INSERT,
            replacements: [userId[0], addressId[0], createUserDto.name],
          },
        );
      });
    } catch (err) {
      return null;
    }
    return user;
  }

  async findProfile(userId: number, profileId: number): Promise<any> {
    return this.usersRepository.sequelize.query(
      `SELECT 
      prof.id as id, 
      prof.name as name, 
      ad.street as "address.street", 
      ci.name as "address.city", 
      ct.name as "address.country"
      from Profiles prof
      inner join Users us on us.id = prof.userId
      inner join Addresses ad on ad.id = prof.addressId
      inner join Cities ci on ci.id = ad.cityId
      inner join Countries ct on ct.id = ci.countryId
      where us.id = ? and prof.id = ?;`,
      {
        replacements: [userId, profileId],
        nest: true,
        type: QueryTypes.SELECT,
      },
    );
  }

  async findByUsername(username: string): Promise<any> {
    return this.usersRepository.sequelize.query(
      'SELECT id, username, password FROM Users WHERE username = ?;',
      {
        type: QueryTypes.SELECT,
        model: User,
        plain: true,
        mapToModel: true,
        replacements: [username],
      },
    );
  }
}
