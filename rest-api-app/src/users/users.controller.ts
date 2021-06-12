import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile } from 'src/profiles/entities/profile.entity';
import { AddressesService } from 'src/addresses/addresses.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly addressesService: AddressesService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    //TODO: This must be transactional
    const user: User = await this.usersService.create(createUserDto);

    const address: Address = await this.addressesService.create({
      cityId: createUserDto.cityId,
      street: createUserDto.address,
    });

    await this.profilesService.create({
      addressId: address.id,
      userId: user.id,
      ...createUserDto,
    });

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/profiles/:profileId')
  async findProfile(
    @Param('id') id: number,
    @Param('profileId') profileId: number,
  ) {
    const profile = await this.usersService.findProfile(id, profileId);
    if (!profile || profile.length < 1) {
      throw new BadRequestException();
    }
    return profile[0];
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: User = await this.usersService.findOne(+id);
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }
}
