import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

type OAuthResult = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    provider: string;
    role: string;
    isApproved: boolean;
  };
};

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req: { user: OAuthResult }, @Res() res: Response) {
    return this.redirectToFrontend(req.user, res);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    return;
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Req() req: { user: OAuthResult }, @Res() res: Response) {
    return this.redirectToFrontend(req.user, res);
  }

  private redirectToFrontend(auth: OAuthResult, res: Response) {
    const frontendUrl =
      process.env.FRONTEND_URL ?? process.env.CLIENT_URL ?? 'http://localhost:5173';
    const callbackUrl = new URL('/auth/callback', frontendUrl);

    callbackUrl.searchParams.set('accessToken', auth.accessToken);

    return res.redirect(callbackUrl.toString());
  }
}
