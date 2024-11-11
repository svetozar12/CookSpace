import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT, Message } from '@apps/CookSpaceApi/src/graphql';
import { User } from '../../entities/user.entity';

import bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dtos/register.dto';

@Injectable()
export class AuthService {
  private SALT = 10;
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async validateUser(
    email: string,
    pass: string
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['recipes', 'likedRecipes', 'comments'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['recipes', 'likedRecipes', 'comments'],
    });
    console.log(user);
    const { password: _password, ...result } = user;

    return result;
  }

  async login(user: User): Promise<JWT> {
    const payload = { username: user.email, sub: user.id };
    const expiresIn = 30 * 24 * 60 * 60; // 2592000 seconds

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(
      { message: 'Nothing to be seen here :)' },
      {
        expiresIn: expiresIn,
      }
    );
    return {
      accessToken,
      refreshToken,
      __typename: 'JWT',
    };
  }

  async register(input: RegisterDTO): Promise<JWT> {
    let user = await this.userRepository.findOne({
      where: { email: input.email },
    });
    if (user) {
      throw new UnauthorizedException();
    }

    const hashedPassword = await bcrypt.hash(input.password, this.SALT);

    user = await this.userRepository.save({
      email: input.email,
      accountType: 'Local',
      name: input.name,
      password: hashedPassword,
    });

    const expiresIn = 30 * 24 * 60 * 60; // 2592000 seconds

    const accessToken = this.jwtService.sign(user, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(
      { message: 'Nothing to be seen here :)' },
      {
        expiresIn: expiresIn,
      }
    );

    return { accessToken, refreshToken, __typename: 'JWT' };
  }

  async loginWithRefreshToken(
    token: string,
    context: { req: { user: User } }
  ): Promise<JWT> {
    const user = await this.userRepository.findOne({
      where: { id: Number(context.req.user.id) },
    });
    delete user.password;
    if (!user) throw new UnauthorizedException();

    const expiresIn = 30 * 24 * 60 * 60; // 2592000 seconds

    context.req.user = user;
    const accessToken = this.jwtService.sign(
      { email: user.email },
      {
        expiresIn: '1h',
      }
    );
    const refreshToken = this.jwtService.sign(
      { message: 'Nothing to be seen here :)' },
      {
        expiresIn: expiresIn,
      }
    );
    return {
      accessToken,
      refreshToken,
      __typename: 'JWT',
    };
  }

  getProfile(context: { req: { user: User } }): User {
    return { ...context.req.user, __typename: 'User' };
  }

  async deleteProfile(context: { req: { user: User } }): Promise<Message> {
    const userId = context.req.user.id;
    await this.userRepository.delete({
      id: userId,
    });

    return {
      data: 'Successful',
      __typename: 'Message',
    };
  }
}
