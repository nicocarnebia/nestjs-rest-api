import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private removePassword(user: User): any {
    const { password, ...result } = user;
    return result;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      return this.removePassword(user);
    }
    return null;
  }

  async login(user: User): Promise<any> {
    const payload = {
      username: user.username,
      sub: user.id,
      name: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
