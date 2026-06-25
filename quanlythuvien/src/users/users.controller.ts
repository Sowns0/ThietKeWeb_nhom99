import { Controller, Post, Body, Get, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService, // Inject JwtService vào đây
    ) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const user = await this.usersService.register(registerDto);
        const { password, ...result } = user;
        return { message: 'Đăng ký thành công!', data: result };
    }

    // --- API Đăng nhập cấp mã JWT ---
    @Post('login')
    async login(@Body() loginDto: RegisterDto) {
        const user = await this.usersService.findByUsername(loginDto.username);
        if (!user) {
            throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng!');
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng!');
        }

        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // --- API kiểm tra Authorization định danh tài khoản bằng mã JWT ---
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: any) {
        return {
            message: 'Bạn truy cập thành công vào tuyến đường được bảo mật!',
            user: req.user, // Chứa dữ liệu giải mã từ Token Bearer gửi lên
        };
    }
}