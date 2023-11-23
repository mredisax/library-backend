import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import {Injectable} from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        console.log("PROCESS",process.env.JWT_SECRET)
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:"secret" //TODO: put in .env,
    });
    }

    async validate(payload:any){
        return { userId: payload.sub, email: payload.email, is_admin: payload.is_admin};
    }
}
