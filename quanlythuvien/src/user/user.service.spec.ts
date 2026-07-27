import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserService', () => {
  it('creates default admin and student accounts when absent', async () => {
    const storedUsers: User[] = [];

    const userRepository = {
      findOne: jest.fn(async ({ where: { username } }: { where: { username: string } }) => {
        return storedUsers.find((user) => user.username === username) ?? null;
      }),
      create: jest.fn((data: Partial<User>) => data as User),
      save: jest.fn(async (user: Partial<User>) => {
        storedUsers.push(user as User);
        return user as User;
      }),
    } as any;

    const service = new UserService(userRepository);

    await service.ensureDefaultUser();

    const usernames = storedUsers.map((user) => user.username).sort();
    expect(usernames).toEqual(['admin', 'son01']);
  });
});
