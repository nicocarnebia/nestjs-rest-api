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
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD, //TODO: Use Environment variables!!!
        database: process.env.DATABASE_NAME,
      });
      sequelize.addModels([User, Profile, Address]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
