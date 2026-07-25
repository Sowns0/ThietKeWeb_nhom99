import { Controller, Post, Body, Get, UseGuards, Request, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const user = await this.userService.register(body.username, body.password);
    return { message: 'Registered successfully', userId: user.id, username: user.username };
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(body.username, body.password);
    res.cookie('access_token', result.access_token, { httpOnly: true, maxAge: 3600000 });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return { message: 'Authorized!', user: req.user };
  }
}
