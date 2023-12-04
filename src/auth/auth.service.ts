import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserPayloadDto } from 'src/user/dtos/user.dto';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(mail: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(mail);
        console.log(pass, await bcrypt.compare(pass, user.password))
        if (!user && !await bcrypt.compare(pass, user.password)) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email, is_admin:user.is_admin };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async register(userData: CreateUserDto): Promise<any> {
        return await this.userService.register(userData);
    }

    async login(user: UserPayloadDto): Promise<any> {
        const payload = { sub: user.id, email: user.email, is_admin:user.is_admin }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
