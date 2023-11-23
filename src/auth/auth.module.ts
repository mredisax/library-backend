import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
// import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [UserModule, PassportModule,
    JwtModule.register({
      global: true,
      secret: "secret", //TODO: put in .env
      signOptions: { expiresIn: '1h' }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
