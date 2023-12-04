import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    async register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    //EXAMPLE OF SIMPLE PROTECT:
    @UseGuards(JwtAuthGuard)
    @Get('/jwt')
    getProfile(@Request() req) {
        return req.user;
    }
}
