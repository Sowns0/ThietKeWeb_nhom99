import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    register(username: string, password: string): Promise<User>;
    findOne(username: string): Promise<User | null>;
    ensureDefaultUser(): Promise<User>;
}
