import { Sequelize } from 'sequelize-typescript';
import { Address } from 'src/addresses/entities/address.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { User } from '../users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'pa55w0rd', //TODO: Use Environment variables!!!
        database: 'apiDatabase',
      });
      sequelize.addModels([User, Profile, Address]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
