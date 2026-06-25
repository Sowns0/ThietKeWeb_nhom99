import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'khoa-bi-mat-jwt-thuvien',
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findByUsername(payload.username);
        if (!user) {
            throw new UnauthorizedException('Token không hợp lệ!');
        }
        return { userId: payload.sub, username: payload.username };
    }
}