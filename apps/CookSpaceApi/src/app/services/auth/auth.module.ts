import { Module } from '@nestjs/common';
import { AuthService } from '@apps/CookSpaceApi/src/app/services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@apps/CookSpaceApi/src/app/services/auth/strategies/local.strategy';
import { AuthResolver } from '@apps/CookSpaceApi/src/app/services/auth/auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@apps/CookSpaceApi/src/app/services/auth/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
