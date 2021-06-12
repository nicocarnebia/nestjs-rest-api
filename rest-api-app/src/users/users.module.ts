import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { DatabaseModule } from '../database/database.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  imports: [DatabaseModule, ProfilesModule, AddressesModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
