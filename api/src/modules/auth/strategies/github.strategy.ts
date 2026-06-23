import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-github2';

import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(

    private readonly authService: AuthService,
    configService: ConfigS
    ervice,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID') ?? '',
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET') ?? '',
      callbackURL:
        configService.get<string>('GITHUB_CALLBACK_URL') ??
        'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      displayName?: string;
      username?: string;
      emails?: { value: string }[];
    },
    done: VerifyCallback,
  ) {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      return done(new Error('GitHub account email is required'), false);
    }

    const user = await this.authService.validateOAuthLogin({
      name: profile.displayName ?? profile.username ?? email,
      email,
      provider: 'github',
    });

    return done(null, user);
  }
}
