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
    const username = process.env.DEFAULT_USERNAME ?? 'admin';
    const password = process.env.DEFAULT_PASSWORD ?? 'admin123';

    const existing = await this.userRepository.findOne({ where: { username } });
    if (existing) {
      return existing;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword });
    return this.userRepository.save(user);
  }
}