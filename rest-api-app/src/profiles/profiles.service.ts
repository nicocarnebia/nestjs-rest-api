import { Injectable, Inject } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { CreateProfileDto } from './dto/create-profile.dto';

import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('PROFILES_REPOSITORY')
    private profilesRepository: typeof Profile,
  ) {}

  async create(createProfile: CreateProfileDto): Promise<Profile> {
    console.log(this.profilesRepository)
    const id = await this.profilesRepository.sequelize.query(
      'INSERT INTO Profiles(userId, addressId, name) VALUES (?,?,?)',
      {
        type: QueryTypes.INSERT,
        replacements: [
          createProfile.userId,
          createProfile.addressId,
          createProfile.name,
        ],
      },
    );
    const profile = new Profile();
    profile.id = id[0];
    return profile;
  }

  async findByUserId(userId: number): Promise<Profile[]> {
    return this.profilesRepository.sequelize.query(
      'SELECT * FROM Profiles WHERE userId = ?;',
      {
        model: Profile,
        plain: true,
        mapToModel: true,
        replacements: [userId],
      },
    );
  }
}
