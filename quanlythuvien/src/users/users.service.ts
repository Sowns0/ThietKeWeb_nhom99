import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async register(registerDto: RegisterDto): Promise<User> {
        const { username, password } = registerDto;

        // Kiểm tra trùng lặp username
        const isExist = await this.userRepository.findOne({ where: { username } });
        if (isExist) {
            throw new BadRequestException('Tài khoản đã tồn tại trong hệ thống!');
        }

        // + Mã hóa hàm băm password sử dụng bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // + Lưu giữ thông tin vào CSDL
        const newUser = this.userRepository.create({
            username,
            password: hashedPassword,
        });

        return await this.userRepository.save(newUser);
    }

    // Hàm bổ trợ tìm kiếm user phục vụ cho JWT đăng nhập sau này
    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
    }
}