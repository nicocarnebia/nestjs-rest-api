import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  name: string;
  @IsString()
  password: string;
  @IsString()
  address: string;
  @IsInt()
  cityId: number;
}
