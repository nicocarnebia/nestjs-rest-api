import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { addressesProviders } from './addresses.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AddressesService, ...addressesProviders],
  exports: [AddressesService],
})
export class AddressesModule {}
