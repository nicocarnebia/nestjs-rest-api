import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Address } from './entities/address.entity';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { AppModule } from '../app.module';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [
        AppModule,
        UsersModule,
        SequelizeModule.forFeature([User, Address, Profile]),
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
