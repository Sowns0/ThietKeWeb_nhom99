import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(username: string, password: string): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { username } });
    if (existing) throw new ConflictException('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async ensureDefaultUser(): Promise<User> {
    const defaultUsers = [
      {
        username: process.env.DEFAULT_USERNAME ?? 'admin',
        password: process.env.DEFAULT_PASSWORD ?? 'admin123',
      },
      {
        username: process.env.STUDENT_USERNAME ?? 'son01',
        password: process.env.STUDENT_PASSWORD ?? '12345678',
      },
    ];

    for (const { username, password } of defaultUsers) {
      const existing = await this.userRepository.findOne({ where: { username } });
      if (existing) {
        continue;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ username, password: hashedPassword });
      await this.userRepository.save(user);
    }

    return this.userRepository.findOne({ where: { username: defaultUsers[0].username } }) as Promise<User>;
  }
}