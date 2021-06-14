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
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    const user: User = await this.usersService.create(createUserDto);
    if (!user) {
      throw new BadRequestException();
    }
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
      throw new NotFoundException();
    }
    return profile[0];
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: User = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
