// src/auth/auth.controller.ts
import { Controller, Post, Req, Body, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { Request, Response } from 'express';
import { SessionAuthGuard } from './../guards/session-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() body: any) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user.userId;
    return res.json({ message: 'Login sucess' });
  }

  @UseGuards(SessionAuthGuard)
  @Get('profile')
  async profile(@Req() req: Request) {
    const user = await this.authService.findUserById(req.session.userId as string);
    return user;
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Session close' });
    });
  }
}
