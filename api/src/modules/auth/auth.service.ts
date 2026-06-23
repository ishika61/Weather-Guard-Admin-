import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateOAuthLogin(profile: {
    name: string;
    email: string;
    provider: string;
  }) {
    const user = await this.usersService.findOrCreateOAuthUser(profile);

    return this.login(user);
  }

  login(user: {
    _id: unknown;
    email: string;
    name: string;
    provider: string;
    role: string;
    isApproved: boolean;
  }) {
    const payload = {
      sub: String(user._id),
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        provider: user.provider,
        role: user.role,
        isApproved: user.isApproved,
      },
    };
  }
}
