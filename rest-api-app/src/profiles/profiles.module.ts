import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { profilesProviders } from './profiles.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProfilesService, ...profilesProviders],
  exports: [ProfilesService],
})
export class ProfilesModule {}
