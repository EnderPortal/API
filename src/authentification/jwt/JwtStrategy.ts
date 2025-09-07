import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWT_SECRET'),
        });
    }
    
    /**
     * Returns user information from the JWT for request.user in AuthController
     * 
     * @param payload data
     * @returns User object
     */
    async validate(payload: any) {
        return { id: payload.id, username: payload.username, rankId: payload.rankId};
    }
}